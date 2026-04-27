/**
 * Auth store — global authentication state managed by Zustand.
 *
 * This is the single source of truth for whether a user is logged in.
 * Components read from this store; the useAuth hook writes to it.
 */

import { create } from "zustand";

export interface AuthUser {
  userId: string;
  email: string;
  role: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  /** True while the initial /auth/me check is in flight */
  isCheckingAuth: boolean;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
  setCheckingAuth: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: localStorage.getItem("ict_admin_logged_in") === "true",
  isCheckingAuth: false,
  setUser: (user) => {
    localStorage.setItem("ict_admin_logged_in", "true");
    set({ user, isAuthenticated: true, isCheckingAuth: false });
  },
  clearUser: () => {
    localStorage.removeItem("ict_admin_logged_in");
    set({ user: null, isAuthenticated: false, isCheckingAuth: false });
  },
  setCheckingAuth: (value) => set({ isCheckingAuth: value }),
}));
