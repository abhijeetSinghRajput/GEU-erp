import React, { useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useStudentStore } from "./stores/useStudentStore";
import { Loader } from "lucide-react";
import AttendancePage from "./pages/AttendancePage";
import { useAttendanceStore } from "./stores/useAttendanceStore";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "sonner";

const App = () => {
  const { isFetchingProfile, fetchProfile, student } = useStudentStore();
  const { getAllAttendanceSubjects } = useAttendanceStore();

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (student?.RegID) {
      getAllAttendanceSubjects({ RegID: student.RegID });
    }
  }, [student?.RegID]);

  if (isFetchingProfile || !student) {
    return (
      <div className="w-full h-svh flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/attendance/:SubjectID" element={<AttendancePage />} />
        </Routes>
      </TooltipProvider>
      <Toaster/>
    </ThemeProvider>
  );
};

export default App;
