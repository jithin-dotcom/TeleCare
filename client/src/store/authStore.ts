

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Role = "user" | "doctor" | "admin";

type User = {
  _id: string;
  name: string;
  email: string;
  role: Role;
};

type AuthData = {
  user: User | null;
  accessToken: string | null;
};

type AuthState = AuthData & {
  role: Role | null;
  setAuth: (data: AuthData) => void;
  logout: () => void;
  hasHydrated: boolean;
  setHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      role: null,
      setAuth: (data) =>
        set({
          user: data.user,
          accessToken: data.accessToken,
          role: data.user?.role ?? null,
        }),
      logout: () => {
        set({ user: null, accessToken: null, role: null });
        localStorage.removeItem("auth-storage");
      },
      hasHydrated: false,
      setHydrated: (value: boolean) => set({ hasHydrated: value }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        role: state.role,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
