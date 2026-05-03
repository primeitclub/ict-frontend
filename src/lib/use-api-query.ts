/**
 * Centralized query hook — the main hook for all GET requests.
 * @example
 * // Simple — no path params
 * const { data, isLoading } = useApiQuery("events")<Event[]>();
 *
 * // With path params — TypeScript enforces { eventId: string }
 * const { data } = useApiQuery("eventDetail")<Event>({
 *   pathParams: { eventId: "42" },
 * });
 *
 * // With query params (filters, pagination, etc.)
 * const { data } = useApiQuery("events")<Event[]>({
 *   queryParams: { page: 1, limit: 10 },
 * });
 *
 * // Conditionally enabled
 * const { data } = useApiQuery("eventDetail")<Event>({
 *   pathParams: { eventId },
 *   enabled: !!eventId,
 * });
 */

import { useMemo } from "react";
import {
  useQuery,
  type UseQueryOptions,
  type QueryKey,
} from "@tanstack/react-query";
import { ictClient, ApiError } from "./api-client";
import { API_ROUTES, type ApiRoutes, type ApiRouteKey } from "./api-routes";
import type { HasVariables, TemplateVariables } from "./types";

// ─── Internal Helpers ─────────────────────────────────────────────────────────

/** Replaces `${variable}` placeholders in a path string with actual values. */
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

/** Builds a stable React Query cache key from route path + params + query. */
function buildQueryKey(
  path: string,
  pathParams?: Record<string, string>,
  queryParams?: Record<string, unknown>,
): QueryKey {
  const key: unknown[] = [path];
  if (pathParams && Object.keys(pathParams).length) key.push(pathParams);
  if (queryParams && Object.keys(queryParams).length) key.push(queryParams);
  return key;
}

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * If the route has `${variables}`, require pathParams.
 * Otherwise, don't allow pathParams at all.
 */
type PathParamsArg<K extends ApiRouteKey> =
  HasVariables<ApiRoutes[K]> extends true
    ? { pathParams: TemplateVariables<ApiRoutes[K]> }
    : { pathParams?: never };

/** Arguments accepted by useApiQuery. */
type UseApiQueryArgs<T, K extends ApiRouteKey> = PathParamsArg<K> & {
  queryParams?: Record<string, unknown>;
  enabled?: boolean;
  config?: Omit<UseQueryOptions<T, ApiError>, "queryKey" | "queryFn">;
};

/** What useApiQuery returns — a consistent shape for all components. */
interface UseApiQueryResult<T> {
  data: T | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: ApiError | null;
  refetch: () => void;
}

// ─── Overloaded Return Type ───────────────────────────────────────────────────

/**
 * If the route has path variables → params are REQUIRED.
 * If it doesn't → params are OPTIONAL (you can call with no args).
 */
type UseApiQueryFn<K extends ApiRouteKey> =
  HasVariables<ApiRoutes[K]> extends true
    ? <T>(args: UseApiQueryArgs<T, K>) => UseApiQueryResult<T>
    : {
        <T>(args?: UseApiQueryArgs<T, K>): UseApiQueryResult<T>;
        <T>(): UseApiQueryResult<T>;
      };

// ─── The Hook ─────────────────────────────────────────────────────────────────

/**
 * Centralized query hook.
 *
 * @param route - A key from API_ROUTES (e.g. "events", "eventDetail")
 * @returns A generic function that accepts query args and returns query result
 */
export function useApiQuery<K extends ApiRouteKey>(
  route: K,
): UseApiQueryFn<K> {
  function useInternalQuery<T>(
    args?: UseApiQueryArgs<T, K>,
  ): UseApiQueryResult<T> {
    const { pathParams, queryParams, enabled, config } =
      (args ?? {}) as UseApiQueryArgs<T, K> & { pathParams?: Record<string, string> };

    const pathTemplate = API_ROUTES[route];

    // Memoize the interpolated URL so it doesn't cause unnecessary re-renders
    const pathParamsKey = JSON.stringify(pathParams);
    const url = useMemo(
      () => interpolatePath(pathTemplate, pathParams),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [pathTemplate, pathParamsKey],
    );

    const queryKey = buildQueryKey(pathTemplate, pathParams as Record<string, string>, queryParams);

    const { data, isLoading, isFetching, isSuccess, isError, error, refetch } =
      useQuery<T, ApiError>({
        queryKey,
        queryFn: () => ictClient.get<T>(url, queryParams),
        enabled,
        ...config,
      });

    return {
      data,
      isLoading,
      isFetching,
      isSuccess,
      isError,
      error: error ?? null,
      refetch,
    };
  }

  return useInternalQuery as UseApiQueryFn<K>;
}

