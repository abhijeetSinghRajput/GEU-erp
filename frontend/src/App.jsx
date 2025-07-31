import React, { useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useStudentStore } from "./stores/useStudentStore";
import { Loader } from "lucide-react";

const App = () => {
  const {isFetchingProfile, fetchProfile, student} = useStudentStore();
  useEffect(()=>{
    fetchProfile()
  }, []);

  if(isFetchingProfile || !student){
    return <div className="w-full h-svh flex items-center justify-center">
      <Loader className="animate-spin"/>
    </div>
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
