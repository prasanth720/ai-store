import { create } from "zustand";

interface User {
  id: string;
  name: string;
}

interface UserState {
  user: User | null;
  token: string | null;
  login: (name: string) => Promise<boolean>;
  logout: () => void;
  loadUser: () => void;
}

export const useUserStore = create<UserState>((set: (arg0: { user: any; token: any; }) => void) => ({
  user: null,
  token: null,

  login: async (name: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        set({
          user: data.user,
          token: data.token,
        });

        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({ user: null, token: null });
  },

  loadUser: () => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      set({
        token,
        user: JSON.parse(user),
      });
    }
  },
}));