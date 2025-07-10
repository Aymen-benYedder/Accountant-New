// src/app/_components/_core/AuthProvider/AuthProvider.tsx
import { eraseCookie, getCookie, setCookie } from "@jumbo/utilities/cookies";
import React from "react";
import { AuthContext } from "./AuthContext";
import { login as backendLogin } from "@app/_utilities/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(true);

  const login = async ({ email, password }: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await backendLogin({ email, password });
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        const authData = { token: response.token, email, password };
        setCookie("auth-user", encodeURIComponent(JSON.stringify(authData)), 1);
        setIsAuthenticated(true);
        setUser(response.user); // <-- Set user in context for role-based logic
      }
      return response;
    } catch (error) {
      console.error("Login failed", error);
      throw error; // Important for error handling in login forms
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    eraseCookie("auth-user");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  React.useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        // Simulate async token validation (e.g., API call)
        await delay(500); // Add a small delay to mimic real-world behavior
        const token = localStorage.getItem("token") || getCookie("auth-user");
        if (token) {
          setIsAuthenticated(true);

          // 🔥 Robust: hydrate user context on page refresh/load!
          // Try to load user from localStorage/cache, or if not present, from backend
          let storedUser = null;
          try {
            storedUser = localStorage.getItem("user")
              ? JSON.parse(localStorage.getItem("user") as string)
              : null;
          } catch {}
          if (storedUser && storedUser._id) {
            setUser(storedUser);
          } else {
            // Fallback: fetch from backend, adjust endpoint as needed
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
            const resp = await fetch(apiBaseUrl + "/auth/me", {
              headers: { Authorization: "Bearer " + token }
            });
            if (resp.ok) {
              const data = await resp.json();
              setUser(data.user || data); // set user from API response
              localStorage.setItem("user", JSON.stringify(data.user || data));
            } else {
              setUser(null);
              localStorage.removeItem("user");
            }
          }
        }
      } catch (error) {
        console.error("Auth check failed", error);
        setUser(null);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Also update cached user on logout
  React.useEffect(() => {
    if (!isAuthenticated) {
      setUser(null);
      localStorage.removeItem("user");
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}