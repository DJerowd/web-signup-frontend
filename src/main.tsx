import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Router from "./Router.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { SettingsProvider } from "./contexts/SettingsContext";

import "./Styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SettingsProvider>
          <Router />
          <Toaster
            position="bottom-left"
            toastOptions={{
              style: {
                background: "var(--color-bg-2)",
                color: "var(--color-text)",
                border: "var(--border-width) solid var(--color-border)",
              },
              success: {
                iconTheme: {
                  primary: "var(--color-success)",
                  secondary: "var(--color-bg-2)",
                },
              },
              error: {
                iconTheme: {
                  primary: "var(--color-error)",
                  secondary: "var(--color-bg-2)",
                },
              },
            }}
          />
        </SettingsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
