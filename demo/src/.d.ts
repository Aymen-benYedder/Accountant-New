// src/env.d.ts
export {};

declare global {
  interface Window {
    ENV: {
      VITE_WS_URL?: string;
      VITE_API_URL?: string;
    };
  }
}
