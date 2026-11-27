"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserSession } from "@/lib/types";
import {
  activateUserProgress,
  deactivateUserProgress,
} from "@/lib/progress";

interface AuthContextValue {
  user: UserSession | null;
  loading: boolean;
  refreshUser: (options?: { mergeGuest?: boolean }) => Promise<UserSession | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  refreshUser: async () => null,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(
    async (options?: { mergeGuest?: boolean }): Promise<UserSession | null> => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!res.ok) {
          setUser(null);
          deactivateUserProgress();
          return null;
        }
        const data = await res.json();
        const nextUser: UserSession | null = data?.user ?? null;
        setUser(nextUser);

        if (nextUser) {
          await activateUserProgress(nextUser, {
            mergeGuest: options?.mergeGuest,
          });
        } else {
          deactivateUserProgress();
        }
        return nextUser;
      } catch {
        setUser(null);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
      deactivateUserProgress();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
