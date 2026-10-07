import { createContext, useContext, type ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { User } from "../types";

interface AuthValue {
  currentUser: string | null;
  register: (username: string, password: string) => string | null;
  login: (username: string, password: string) => string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useLocalStorage<User[]>("jv-users", []);
  const [currentUser, setCurrentUser] = useLocalStorage<string | null>("jv-current", null);

  // Each function returns an error message, or null when it succeeds.
  const register = (username: string, password: string) => {
    if (!username.trim() || !password) return "Enter both a username and a password.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (users.some((u) => u.username === username.trim()))
      return "That username is taken. Try another.";
    setUsers([...users, { username: username.trim(), password }]);
    setCurrentUser(username.trim());
    return null;
  };

  const login = (username: string, password: string) => {
    if (!username.trim() || !password) return "Enter both a username and a password.";
    const match = users.find((u) => u.username === username.trim() && u.password === password);
    if (!match) return "Username or password is incorrect.";
    setCurrentUser(match.username);
    return null;
  };

  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}