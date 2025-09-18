import React, { useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Loader } from "lucide-react";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "sonner";
import { useAuthStore } from "./stores/useAuthStore";
import useOnlineStatus from "./hooks/useOnlineStatus";
import NoInternet from "./components/emptyState.jsx/NoInternet";
import { LoginPage } from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ForgotIdPage from "./pages/ForgotIdPage";
import PrivacyPolicyPage from "./pages/policy/PrivacyPolicyPage";
import DocsPage from "./pages/docs/DocsPage";
import "ldrs/react/Ring.css";
import "ldrs/react/Infinity.css"
import { Infinity, Mirage, Ring } from "ldrs/react";

const App = () => {
  const { checkingAuth, authenticated, checkAuth } = useAuthStore();
  const { isOnline, isOffline } = useOnlineStatus();

  useEffect(() => {
    if (isOnline) {
      checkAuth();
    }
  }, []);

  if (isOffline) {
    return <NoInternet />;
  }

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Infinity
          size={40}
          speed={1.5}
          stroke={3}
          color="hsl(var(--foreground))"
        />
      </div>
    );
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Routes>
          <Route
            path="/login"
            element={
              !authenticated ? <LoginPage /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/"
            element={
              authenticated ? <HomePage /> : <Navigate to="/login" replace />
            }
          />

          {/* public route  */}
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/forgot-id" element={<ForgotIdPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/docs" element={<DocsPage />} />
        </Routes>
      </TooltipProvider>
      <Toaster expand={true} richColors />
    </ThemeProvider>
  );
};

export default App;
