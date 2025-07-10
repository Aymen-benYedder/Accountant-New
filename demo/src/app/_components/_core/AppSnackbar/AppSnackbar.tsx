import React from "react";
import { SnackbarProvider } from "notistack";

const AppSnackbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      maxSnack={3}
    >
      {children}
    </SnackbarProvider>
  );
};

export { AppSnackbar };
