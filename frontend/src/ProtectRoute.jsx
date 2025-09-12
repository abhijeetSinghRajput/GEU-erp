import React, { useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigate, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "sonner";
import { useAuthStore } from "./stores/useAuthStore";
import useOnlineStatus from "./hooks/useOnlineStatus";
import NoInternet from "./components/emptyState.jsx/NoInternet";

import ProtectedRoute from "./ProtectRoute";

// pages
import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ForgotIdPage from "./pages/ForgotIdPage";
import PrivacyPolicyPage from "./pages/policy/PrivacyPolicyPage";
import DocsPage from "./pages/docs/DocsPage";


const App = () => {
  const { checkAuth } = useAuthStore();
  const { isOnline, isOffline } = useOnlineStatus();

  useEffect(() => {
    if (isOnline) {
      checkAuth();
    }
  }, [isOnline]);

  if (isOffline) {
    return <NoInternet />;
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/forgot-id" element={<ForgotIdPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/docs" element={<DocsPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all → redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </TooltipProvider>
      <Toaster expand={true} richColors />
    </ThemeProvider>
  );
};

export default App;
