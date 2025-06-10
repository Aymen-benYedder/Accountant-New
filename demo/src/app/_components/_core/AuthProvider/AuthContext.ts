import React from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: ({ email, password }: { email: string; password: string }) => void;
  logout: () => void;
  user?: any; // add user property for logged-in user context
}

export const AuthContext = React.createContext<AuthContextType | null>(null);

// Simple useAuth() hook for convenient usage
export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
