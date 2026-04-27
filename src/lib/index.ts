/**
 * Centralized API layer — re-exports everything components need.
 *
 * Usage in components:
 *   import { useApiQuery, useApiMutation, ApiError } from "@/lib";
 */

// API client & error class
export { ictClient, ApiError } from "./api-client";

// Route definitions
export { API_ROUTES } from "./api-routes";
export type { ApiRoutes, ApiRouteKey } from "./api-routes";

// Hooks
export { useApiQuery } from "./use-api-query";
export { useApiMutation } from "./use-api-mutation";

// Types (for advanced usage)
export type {
  ExtractVariables,
  TemplateVariables,
  HasVariables,
} from "./types";
