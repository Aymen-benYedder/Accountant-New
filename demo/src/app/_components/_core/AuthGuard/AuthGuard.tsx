// src/app/_components/_core/AuthGuard/AuthGuard.tsx
import { useEffect, useState } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthProvider/hooks';
import { Spinner } from "@app/_shared/Spinner";

export const AuthGuard = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Ensure auth check is complete and user state is confirmed
    if (!loading) {
      setAuthChecked(true);
    }
  }, [loading]);

  if (loading || !authChecked) {
    // Show spinner while checking auth state
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh' 
      }}>
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Declaratively redirect if unauthenticated
    return <Navigate to="/auth/login-1" replace state={{ from: location }} />;
  }

  // Render protected content if authenticated
  return <Outlet />;
};