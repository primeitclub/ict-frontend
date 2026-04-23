/**
 * Centralized React Query query hook.
 *
 * Every data-fetching query in the app should use `useAppQuery` so that
 * error handling, loading states, and caching are consistent.
 */

import {
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import type { ApiError } from "./api-client";

// ─── Types ───────────────────────────────────────────────────────────────────

interface UseAppQueryOptions<TData>
  extends Omit<UseQueryOptions<TData, ApiError>, "queryFn"> {
  /** The async function that performs the actual API call */
  queryFn: () => Promise<TData>;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useAppQuery<TData = unknown>(
  options: UseAppQueryOptions<TData>,
) {
  return useQuery<TData, ApiError>({
    ...options,
  });
}
