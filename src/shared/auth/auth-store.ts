import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LoginResponse } from "./auth.types";

interface AuthState {
  loginResponse: LoginResponse | null;
  setLoginResponse: (response: LoginResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      loginResponse: null,
      setLoginResponse: (loginResponse) => set({ loginResponse }),
      logout: () => set({ loginResponse: null }),
    }),
    {
      name: "creariif-auth",
      partialize: (state) => ({ loginResponse: state.loginResponse }),
    },
  ),
);

export const selectAuthUser = (state: AuthState) => state.loginResponse?.user ?? null;

export const selectAuthToken = (state: AuthState) =>
  state.loginResponse?.token.access_token ?? null;

export const selectIsAuthenticated = (state: AuthState) =>
  Boolean(state.loginResponse?.token.access_token);
