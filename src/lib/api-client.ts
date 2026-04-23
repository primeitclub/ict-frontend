/**
 * Centralized API client built on top of the native fetch API.
 * All HTTP calls in the application should go through this client
 * to keep headers, base URL, and error handling consistent.
 */

const BASE_URL = "http://localhost:4000";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestConfig {
  /** URL path appended to the BASE_URL (e.g. "/api/auth/login") */
  url: string;
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  /** Query parameters to be appended to the URL */
  params?: Record<string, string>;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildUrl(path: string, params?: Record<string, string>): string {
  const url = new URL(path, BASE_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  return url.toString();
}

function getDefaultHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // Attach auth token from localStorage when available
  const token = localStorage.getItem("auth_token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

// ─── Core request function ───────────────────────────────────────────────────

async function request<TResponse>(
  config: RequestConfig,
): Promise<ApiResponse<TResponse>> {
  const { url, method = "GET", body, headers = {}, params } = config;

  const response = await fetch(buildUrl(url, params), {
    method,
    headers: { ...getDefaultHeaders(), ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });

  // Try to parse JSON regardless of status so we can surface server messages
  let parsed: unknown;
  try {
    parsed = await response.json();
  } catch {
    parsed = null;
  }

  if (!response.ok) {
    const error: ApiError = {
      message:
        (parsed as Record<string, unknown>)?.message as string ??
        `Request failed with status ${response.status}`,
      status: response.status,
      errors: (parsed as Record<string, unknown>)?.errors as
        | Record<string, string[]>
        | undefined,
    };
    throw error;
  }

  return {
    data: (parsed as Record<string, unknown>)?.data as TResponse ?? parsed as TResponse,
    message: (parsed as Record<string, unknown>)?.message as string | undefined,
    status: response.status,
  };
}

// ─── Public convenience methods ──────────────────────────────────────────────

export const apiClient = {
  get<T>(url: string, params?: Record<string, string>) {
    return request<T>({ url, method: "GET", params });
  },

  post<T>(url: string, body?: unknown) {
    return request<T>({ url, method: "POST", body });
  },

  put<T>(url: string, body?: unknown) {
    return request<T>({ url, method: "PUT", body });
  },

  patch<T>(url: string, body?: unknown) {
    return request<T>({ url, method: "PATCH", body });
  },

  delete<T>(url: string) {
    return request<T>({ url, method: "DELETE" });
  },
} as const;
