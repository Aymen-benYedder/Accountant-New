// src/app/_components/_core/AuthProvider/AuthProvider.tsx
import { eraseCookie, getCookie, setCookie } from "@jumbo/utilities/cookies";
import React from "react";
import { AuthContext } from "./AuthContext";
import { login as backendLogin } from "@app/_utilities/auth";

// Helper function to get the full URL for profile pictures
const getFullProfilePicUrl = (profilePicPath: string | undefined) => {
  if (!profilePicPath) return undefined;
  // Check if it's already a full URL (e.g., starts with http/https)
  if (profilePicPath.startsWith('http://') || profilePicPath.startsWith('https://')) {
    return profilePicPath;
  }
  // Prepend VITE_API_BASE_URL for relative paths like /uploads/...
  let apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  // Remove '/api' from the base URL if it exists, as static files are served from root
  if (apiBaseUrl.endsWith('/api')) {
    apiBaseUrl = apiBaseUrl.slice(0, -4); // Remove '/api'
  }
  // Ensure there's no double slash if apiBaseUrl already ends with a slash
  const baseUrl = apiBaseUrl.endsWith('/') ? apiBaseUrl.slice(0, -1) : apiBaseUrl;
  const finalUrl = `${baseUrl}${profilePicPath}`;
  console.log('Constructed profile pic URL:', finalUrl); // Add this line for debugging
  return finalUrl;
};

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
        // Ensure profile_pic is a full URL when setting user
        setUser({ ...response.user, profile_pic: getFullProfilePicUrl(response.user?.profile_pic) });
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
     console.log("AuthProvider: checkAuth started");
     setLoading(true);
     try {
       // Simulate async token validation (e.g., API call)
        await delay(500); // Add a small delay to mimic real-world behavior
        const token = localStorage.getItem("token") || getCookie("auth-user");
        console.log("AuthProvider: Token check", { token: !!token, tokenPreview: token ? token.substring(0, 20) + "..." : null });
        if (token) {
         console.log("AuthProvider: Token found", token.substring(0, 20) + "...");
         setIsAuthenticated(true);

         // 🔥 Robust: hydrate user context on page refresh/load!
         // Try to load user from localStorage/cache, or if not present, from backend
          let storedUser = null;
          try {
            const storedUserString = localStorage.getItem("user");
            console.log("AuthProvider: localStorage user string", storedUserString ? storedUserString.substring(0, 100) + "..." : null);
            storedUser = storedUserString
              ? JSON.parse(storedUserString)
              : null;
            console.log("AuthProvider: localStorage user data", storedUser);
          } catch (parseError) {
            console.error("AuthProvider: Failed to parse localStorage user data", parseError);
          }
          if (storedUser && storedUser._id) {
            // Ensure profile_pic is a full URL when setting user from localStorage
            setUser({ ...storedUser, profile_pic: getFullProfilePicUrl(storedUser.profile_pic) });
          } else {
            // Fallback: fetch from backend, adjust endpoint as needed
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
            const resp = await fetch(apiBaseUrl + "/auth/me", {
              headers: { Authorization: "Bearer " + token }
            });
            if (resp.ok) {
              const data = await resp.json();
              // Handle both old and new response structures
              const userData = data.user || data;
              const userWithFullProfilePic = { ...userData, profile_pic: getFullProfilePicUrl(userData?.profile_pic) };
              console.log("AuthProvider: User fetched from backend", userWithFullProfilePic);
              setUser(userWithFullProfilePic);
              localStorage.setItem("user", JSON.stringify(userWithFullProfilePic));
            } else {
             console.log("AuthProvider: Failed to fetch user from backend", resp.status, resp.statusText);
             // Instead of setting user to null, try to use localStorage data if available
             if (storedUser) {
               console.log("AuthProvider: Using localStorage user data as fallback");
               setUser({ ...storedUser, profile_pic: getFullProfilePicUrl(storedUser.profile_pic) });
             } else {
               setUser(null);
               localStorage.removeItem("user");
             }
            }
          }
        }
      } catch (error) {
        console.error("Auth check failed", error);
        // Try to use localStorage data as a last resort
        try {
          const storedUser = localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user") as string)
            : null;
          if (storedUser && storedUser._id) {
            console.log("AuthProvider: Using localStorage user data as emergency fallback");
            setUser({ ...storedUser, profile_pic: getFullProfilePicUrl(storedUser.profile_pic) });
          } else {
            setUser(null);
            localStorage.removeItem("user");
          }
        } catch (parseError) {
          console.error("AuthProvider: Failed to parse localStorage user data", parseError);
          setUser(null);
          localStorage.removeItem("user");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Also update cached user on logout
  React.useEffect(() => {
   if (!isAuthenticated) {
     console.log("AuthProvider: User logged out, clearing user data");
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