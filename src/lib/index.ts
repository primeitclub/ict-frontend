/**
 * Public API for the lib module.
 * Import everything from "@/lib" across the app.
 */

export { apiClient } from "./api-client";
export type { ApiResponse, ApiError, HttpMethod } from "./api-client";

export { useAppMutation } from "./mutations";
export { useAppQuery } from "./queries";
