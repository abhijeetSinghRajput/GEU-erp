import { useExamStore } from "@/stores/useExamStore";
import { Download, Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import CircularProgress from "../ui/circular-progress";
import { Button } from "../ui/button";
import TooltipWrapper from "../TooltipWrapper";
import ExamSkeleton from "./ExamSkeleton";
import ExamError from "./ExamError";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Result from "./Result";
import Backlogs from "./Backlogs";

const ExamSummary = () => {
  const {
    getExamSummary,
    getBacklogs,
    examSummary,
    backlogs,
    loadingExamSummary,
    errors,
  } = useExamStore();

  useEffect(() => {
    getExamSummary();
    getBacklogs();
  }, []);

  if (loadingExamSummary) {
    return <ExamSkeleton />;
  }

  if (errors.getExamSummary || !Array.isArray(examSummary)) {
    return (
      <ExamError
        description={errors.getExamSummary}
        onReload={getExamSummary}
      />
    );
  }
  
  return (
    <div className="max-w-screen-lg mx-auto px-2 sm:px-4 md:px-6 py-2">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center gap-2 py-2"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb">Exam Summary</h2>

        {Array.isArray(examSummary) && examSummary[0]?.CGPA && (
          <div className="font-semibold">CGPA {examSummary[0].CGPA}</div>
        )}
      </motion.div>
        <Tabs defaultValue="results">
          <TabsList>
            <TabsTrigger value="results">Result</TabsTrigger>
            <TabsTrigger value="backlogs">Backlogs</TabsTrigger>
          </TabsList>
          <TabsContent value="results">
            <Result examSummary={examSummary}/>
          </TabsContent>
          <TabsContent value="backlogs">
            <Backlogs backlogs={backlogs}/>
          </TabsContent>
        </Tabs>
      
    </div>
  );
};

export default ExamSummary;
