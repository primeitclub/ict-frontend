/**
 * Centralized mutation hook — for POST, PUT, PATCH, DELETE requests.
 *
 * Pairs with `useApiQuery` to cover all API interactions.
 *
 * @example
 * // Create an event
 * const { execute, isLoading } = useApiMutation("events")<Event, CreateEventPayload>({
 *   method: "POST",
 *   onSuccess: () => toast.success("Event created!"),
 * });
 * await execute({ title: "ICT Meetup 2026", date: "2026-05-01" });
 *
 * // Update a specific event
 * const { execute } = useApiMutation("eventDetail")<Event, UpdateEventPayload>({
 *   method: "PUT",
 *   pathParams: { eventId: "42" },
 * });
 *
 * // Delete
 * const { execute } = useApiMutation("eventDetail")<void, never>({
 *   method: "DELETE",
 *   pathParams: { eventId: "42" },
 * });
 */

import { useState, useCallback, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ictClient, ApiError } from "./api-client";
import { API_ROUTES, type ApiRoutes, type ApiRouteKey } from "./api-routes";
import type { HasVariables, TemplateVariables } from "./types";

// ─── Internal Helpers ─────────────────────────────────────────────────────────

function interpolatePath(
  template: string,
  params?: Record<string, string>,
): string {
  if (!params) return template;
  let result = template;
  for (const [key, value] of Object.entries(params)) {
    result = result.replaceAll(`\${${key}}`, value);
  }
  return result;
}

// ─── Types ────────────────────────────────────────────────────────────────────

type HttpMutationMethod = "POST" | "PUT" | "PATCH" | "DELETE";

type PathParamsArg<K extends ApiRouteKey> =
  HasVariables<ApiRoutes[K]> extends true
    ? { pathParams: TemplateVariables<ApiRoutes[K]> }
    : { pathParams?: never };

interface UseApiMutationArgs<T, K extends ApiRouteKey> extends PathParamsArg<K> {
  method?: HttpMutationMethod;
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
  /** Route keys to invalidate after a successful mutation (triggers refetch). */
  invalidateRoutes?: ApiRouteKey[];
}

interface UseApiMutationResult<T, TPayload> {
  execute: (payload?: TPayload) => Promise<T>;
  data: T | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: ApiError | null;
  reset: () => void;
}

// ─── Overloaded Return Type ───────────────────────────────────────────────────

type UseApiMutationFn<K extends ApiRouteKey> =
  HasVariables<ApiRoutes[K]> extends true
    ? <T, TPayload = unknown>(
        args: UseApiMutationArgs<T, K>,
      ) => UseApiMutationResult<T, TPayload>
    : <T, TPayload = unknown>(
        args?: UseApiMutationArgs<T, K>,
      ) => UseApiMutationResult<T, TPayload>;

// ─── The Hook ─────────────────────────────────────────────────────────────────

export function useApiMutation<K extends ApiRouteKey>(
  route: K,
): UseApiMutationFn<K> {
  function useInternalMutation<T, TPayload = unknown>(
    args?: UseApiMutationArgs<T, K>,
  ): UseApiMutationResult<T, TPayload> {
    const {
      pathParams,
      method = "POST",
      onSuccess,
      onError,
      invalidateRoutes,
    } = (args ?? {}) as UseApiMutationArgs<T, K> & {
      pathParams?: Record<string, string>;
    };

    const queryClient = useQueryClient();
    const [data, setData] = useState<T | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);

    const pathTemplate = API_ROUTES[route];

    const url = useMemo(
      () => interpolatePath(pathTemplate, pathParams),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [pathTemplate, JSON.stringify(pathParams)],
    );

    const execute = useCallback(
      async (payload?: TPayload): Promise<T> => {
        setIsLoading(true);
        setIsError(false);
        setError(null);

        try {
          let result: T;

          switch (method) {
            case "POST":
              result = await ictClient.post<T>(url, payload);
              break;
            case "PUT":
              result = await ictClient.put<T>(url, payload);
              break;
            case "PATCH":
              result = await ictClient.patch<T>(url, payload);
              break;
            case "DELETE":
              result = await ictClient.delete<T>(url);
              break;
          }

          setData(result);
          setIsSuccess(true);
          onSuccess?.(result);

          // Invalidate related queries so they refetch with fresh data
          if (invalidateRoutes?.length) {
            for (const routeKey of invalidateRoutes) {
              await queryClient.invalidateQueries({
                queryKey: [API_ROUTES[routeKey]],
              });
            }
          }

          return result;
        } catch (err) {
          const apiError =
            err instanceof ApiError
              ? err
              : new ApiError("Unexpected error occurred", 0, err);

          setIsError(true);
          setError(apiError);
          onError?.(apiError);
          throw apiError;
        } finally {
          setIsLoading(false);
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [url, method],
    );

    const reset = useCallback(() => {
      setData(undefined);
      setIsLoading(false);
      setIsSuccess(false);
      setIsError(false);
      setError(null);
    }, []);

    return { execute, data, isLoading, isSuccess, isError, error, reset };
  }

  return useInternalMutation as UseApiMutationFn<K>;
}
