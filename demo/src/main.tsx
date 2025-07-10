import React from "react";
import ReactDOM from "react-dom/client";
import App from "@app/App";
import "./i18n";
import "@app/_styles/style.css";
import "@assets/fonts/noir-pro/styles.css";
//---
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WebSocketProvider } from "./contexts/WebSocketContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WebSocketProvider>
        <App />
      </WebSocketProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
