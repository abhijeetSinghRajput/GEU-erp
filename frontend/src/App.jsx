import React, { useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Loader } from "lucide-react";
import AttendancePage from "./pages/AttendancePage";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "sonner";
import { useAuthStore } from "./stores/useAuthStore";
import useOnlineStatus from "./hooks/useOnlineStatus";
import NoInternet from "./components/emptyState.jsx/NoInternet";
import { LoginPage } from "./pages/LoginPage";
import { useExamStore } from "./stores/useExamStore";

const App = () => {
  const { checkingAuth, authenticated, checkAuth } = useAuthStore();
  const {isOnline, isOffline} = useOnlineStatus();

  useEffect(() => {
    if(isOnline) {
      checkAuth();
    }
  }, []);

  if(isOffline){
    return <NoInternet/>
  }

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Routes>
          <Route path="/login" element={!authenticated ? <LoginPage /> : <Navigate to="/" replace />} />
          {/* <Route path="/" element={<HomePage/>}/> */}
          <Route 
            path="/" 
            element={authenticated ? <HomePage /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/attendance/:SubjectID" 
            element={authenticated ? <AttendancePage /> : <Navigate to="/login" replace />} 
          />
        </Routes>
      </TooltipProvider>
      <Toaster />
    </ThemeProvider>
  );
};

export default App;