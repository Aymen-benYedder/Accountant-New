import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import { Spinner } from "@app/_shared/Spinner";
import React from "react";
import { Navigate } from "react-router-dom";

const withAuth = (Component: React.ComponentType) => {
  return (props: any) => {
    const { isAuthenticated, loading } = useAuth();

    // Don't show wrapped component or layout until auth state is resolved!
    if (loading) {
      // Full-page loading fallback prevents "flash" of content
      return (
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh'}}>
          <Spinner />
        </div>
      );
    }

    if (!isAuthenticated) {
      // To match what you use in login2, best to redirect to /auth/login2:
      return <Navigate to="/auth/login-1" replace />;
    }

    return <Component {...props} />;
  };
};

export default withAuth;
