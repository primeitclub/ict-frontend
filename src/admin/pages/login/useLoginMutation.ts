import { apiClient, useAppMutation } from "../../../lib";
import type { ApiResponse } from "../../../lib";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useLoginMutation() {
  return useAppMutation<ApiResponse<LoginResponse>, LoginPayload>({
    mutationFn: (payload) => apiClient.post<LoginResponse>("/api/auth/login", payload),
    successMessage: "Welcome back! Redirecting...",
  });
}
