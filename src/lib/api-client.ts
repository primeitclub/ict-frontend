/**
 * Centralized API client using native `fetch`.
 *
 * All HTTP calls in the app go through this module so that
 * auth headers, base URL, and error formatting live in one place.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";

// ─── Error Class ──────────────────────────────────────────────────────────────

export class ApiError extends Error {
  public status: number;
  public data?: unknown;

  constructor(
    message: string,
    status: number,
    data?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// ─── Internal Helpers ─────────────────────────────────────────────────────────

function getAuthHeaders(body?: unknown): Record<string, string> {
  const headers: Record<string, string> = {};
  
  // Only set application/json if we aren't sending FormData
  // Browser automatically sets Content-Type for FormData with the correct boundary
  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  
  return headers;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorData: unknown;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: response.statusText };
    }

    const message =
      (errorData as { message?: string })?.message ??
      `Request failed with status ${response.status}`;

    throw new ApiError(message, response.status, errorData);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

/**
 * Base request function with built-in refresh token logic.
 */
async function request<T>(
  url: string,
  options: RequestInit = {},
  isRetry = false
): Promise<T> {
  const fullUrl = `${API_BASE_URL}${url}`;
  
  const response = await fetch(fullUrl, {
    ...options,
    headers: {
      ...getAuthHeaders(options.body),
      ...options.headers,
    },
    credentials: "include", // Essential for httpOnly cookies
  });

  // Handle 401 Unauthorized - Attempt token refresh
  if (response.status === 401 && !isRetry) {
    try {
      const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
      });

      if (refreshResponse.ok) {
        // Refresh successful! Retry the original request exactly once.
        return request<T>(url, options, true);
      }
    } catch (error) {
      console.error("Token refresh failed", error);
    }

    // If refresh failed or errored, the user's session is dead.
    // Dispatch a custom event so the UI can respond (e.g., redirect to login).
    window.dispatchEvent(new CustomEvent("ict-auth-failure"));
    throw new ApiError("Session expired", 401);
  }

  return handleResponse<T>(response);
}

// ─── Public API ───────────────────────────────────────────────────────────────

export const ictClient = {
  async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const queryString = params
      ? "?" + new URLSearchParams(
          Object.entries(params)
            .filter(([, v]) => v !== undefined && v !== null)
            .map(([k, v]) => [k, String(v)]),
        ).toString()
      : "";

    return request<T>(`${url}${queryString}`, { method: "GET" });
  },

  async post<T>(url: string, body?: unknown): Promise<T> {
    return request<T>(url, {
      method: "POST",
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    });
  },

  async put<T>(url: string, body?: unknown): Promise<T> {
    return request<T>(url, {
      method: "PUT",
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    });
  },

  async patch<T>(url: string, body?: unknown): Promise<T> {
    return request<T>(url, {
      method: "PATCH",
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    });
  },

  async delete<T>(url: string): Promise<T> {
    return request<T>(url, { method: "DELETE" });
  },
};