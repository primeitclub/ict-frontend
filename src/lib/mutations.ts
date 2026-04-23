/**
 * Centralized React Query mutation hook.
 *
 * Every mutation in the app should use `useAppMutation` so that
 * toast feedback, error handling, and invalidation are consistent.
 */

import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import type { ApiError } from "./api-client";

// ─── Types ───────────────────────────────────────────────────────────────────

interface UseAppMutationOptions<TData, TVariables>
  extends Omit<UseMutationOptions<TData, ApiError, TVariables>, "mutationFn"> {
  /** The async function that performs the actual API call */
  mutationFn: (variables: TVariables) => Promise<TData>;

  /** Toast message shown on success. Set to `false` to disable. */
  successMessage?: string | false;

  /** Toast message shown on error. Set to `false` to disable (uses server msg). */
  errorMessage?: string | false;

  /**
   * Query keys to invalidate after a successful mutation.
   * Accepts an array of query keys – each key is itself an array.
   *
   * @example invalidateKeys: [["users"], ["users", "stats"]]
   */
  invalidateKeys?: string[][];
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useAppMutation<TData = unknown, TVariables = void>(
  options: UseAppMutationOptions<TData, TVariables>,
) {
  const queryClient = useQueryClient();

  const {
    mutationFn,
    successMessage,
    errorMessage,
    invalidateKeys,
    onSuccess,
    onError,
    ...rest
  } = options;

  return useMutation<TData, ApiError, TVariables>({
    mutationFn,

    onSuccess: async (data, variables, context) => {
      // Show success toast
      if (successMessage !== false) {
        toast.success(successMessage ?? "Operation completed successfully");
      }

      // Invalidate related queries so lists / details stay fresh
      if (invalidateKeys?.length) {
        await Promise.all(
          invalidateKeys.map((key) =>
            queryClient.invalidateQueries({ queryKey: key }),
          ),
        );
      }

      // Forward to caller's onSuccess if provided
      onSuccess?.(data, variables, context);
    },

    onError: (error, variables, context) => {
      // Show error toast
      if (errorMessage !== false) {
        toast.error(errorMessage ?? error.message ?? "Something went wrong");
      }

      // Forward to caller's onError if provided
      onError?.(error, variables, context);
    },

    ...rest,
  });
}
