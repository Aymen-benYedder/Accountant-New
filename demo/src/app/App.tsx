// src/app/App.tsx
import React from "react";
import {
  JumboDialog,
  JumboDialogProvider,
  JumboTheme,
} from "@jumbo/components";
import JumboRTL from "@jumbo/components/JumboRTL/JumboRTL";
import { CssBaseline } from "@mui/material";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { AppProvider } from "./_components";
import { AppSnackbar } from "./_components/_core";
import { AuthProvider } from "./_components/_core/AuthProvider";
import { WebSocketProvider } from "@contexts/WebSocketContext";
import { CONFIG } from "./_config";
import { router } from "./_routes";
import { Spinner } from "./_shared/Spinner";
console.log('API_BASE_URL =', import.meta.env.VITE_API_BASE_URL);

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <JumboTheme init={CONFIG.THEME}>
          <CssBaseline />
          <Suspense fallback={<Spinner />}>
            <JumboRTL>
              <JumboDialogProvider>
                <JumboDialog />
                <AppSnackbar>
                  <WebSocketProvider>
                    <RouterProvider router={router} />
                  </WebSocketProvider>
                </AppSnackbar>
              </JumboDialogProvider>
            </JumboRTL>
          </Suspense>
        </JumboTheme>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;