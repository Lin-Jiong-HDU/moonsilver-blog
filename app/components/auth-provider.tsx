"use client";

import { createContext, useContext, useMemo, useState } from "react";

type StoredUser = {
  username: string;
  password: string;
  isAdmin: boolean;
};

export type AuthUser = {
  username: string;
  password: string;
  isAdmin: boolean;
};

type AuthContextValue = {
  user: AuthUser | null;
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string) => boolean;
  logout: () => void;
};

const ADMIN_USER = {
  username: "moonsilver",
  password: "msv",
  isAdmin: true,
} satisfies StoredUser;

const USERS_KEY = "moon-auth-users";
const CURRENT_KEY = "moon-auth-current";

const AuthContext = createContext<AuthContextValue | null>(null);

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") {
    return [ADMIN_USER];
  }

  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    if (!raw) {
      window.localStorage.setItem(USERS_KEY, JSON.stringify([ADMIN_USER]));
      return [ADMIN_USER];
    }

    const parsed = JSON.parse(raw) as StoredUser[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      window.localStorage.setItem(USERS_KEY, JSON.stringify([ADMIN_USER]));
      return [ADMIN_USER];
    }

    if (!parsed.some((item) => item.username === ADMIN_USER.username)) {
      parsed.unshift(ADMIN_USER);
      window.localStorage.setItem(USERS_KEY, JSON.stringify(parsed));
    }

    return parsed;
  } catch {
    window.localStorage.setItem(USERS_KEY, JSON.stringify([ADMIN_USER]));
    return [ADMIN_USER];
  }
}

function readCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(CURRENT_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as AuthUser;
    if (!parsed?.username) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readCurrentUser());

  const value = useMemo<AuthContextValue>(() => {
    function persistCurrent(nextUser: AuthUser | null) {
      setUser(nextUser);
      if (typeof window === "undefined") {
        return;
      }

      if (nextUser) {
        window.localStorage.setItem(CURRENT_KEY, JSON.stringify(nextUser));
      } else {
        window.localStorage.removeItem(CURRENT_KEY);
      }
    }

    return {
      user,
      login(username, password) {
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();
        const users = readUsers();
        const matched = users.find(
          (item) => item.username === trimmedUsername && item.password === trimmedPassword,
        );

        if (!matched) {
          return false;
        }

        persistCurrent({
          username: matched.username,
          password: matched.password,
          isAdmin: matched.isAdmin,
        });
        return true;
      },
      register(username, password) {
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        if (!trimmedUsername || !trimmedPassword) {
          return false;
        }

        const users = readUsers();
        if (users.some((item) => item.username === trimmedUsername)) {
          return false;
        }

        const nextUser: StoredUser = {
          username: trimmedUsername,
          password: trimmedPassword,
          isAdmin: false,
        };

        const nextUsers = [...users, nextUser];
        window.localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers));
        persistCurrent({
          username: nextUser.username,
          password: nextUser.password,
          isAdmin: nextUser.isAdmin,
        });
        return true;
      },
      logout() {
        persistCurrent(null);
      },
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
