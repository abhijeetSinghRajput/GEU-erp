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

const ExamSummary = () => {
  const {
    getExamSummary,
    examSummary,
    loadingExamSummary,
    loadingDetail,
    getExamDetails,
  } = useExamStore();

  useEffect(() => {
    getExamSummary();
  }, []);

  if (loadingExamSummary) {
    return <ExamSkeleton />;
  }

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center gap-2 py-2"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Exam Summary</h2>

        {Array.isArray(examSummary) && examSummary[0]?.CGPA && (
          <div className="font-semibold">CGPA {examSummary[0].CGPA}</div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="space-y-4"
      >
        {examSummary.map((exam, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="rounded-3xl">
              <CardHeader className="pb-0 justify-between items-center flex-row">
                <div className="flex gap-2 items-center">
                  <CardTitle className="text-lg">
                    Year/Sem {exam.YearSem}
                  </CardTitle>
                  <Badge
                    variant={exam.Result === "Pass" ? "default" : "destructive"}
                  >
                    {exam.Result}
                  </Badge>
                </div>
                <TooltipWrapper content="Download Marksheet">
                  <Button
                    className="size-8 p-0"
                    onClick={() => getExamDetails(exam.YearSem)}
                  >
                    {loadingDetail === exam.YearSem ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Download />
                    )}
                  </Button>
                </TooltipWrapper>
              </CardHeader>
              <CardContent className="flex p-6 justify-between items-start">
                <div>
                  {/* Exam Details */}
                  <div className="">
                    <div className="flex gap-2 items-center">
                      <p className="text-muted-foreground">Subjects</p>
                      <p className="font-medium text-xl ">
                        {exam.TotalSubject}
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <p className="text-muted-foreground">Backlogs</p>
                      <p className="font-medium text-xl ">{exam.TotalBack}</p>
                    </div>
                  </div>
                </div>

                <CircularProgress
                  value={exam.percnt}
                  maxValue={10}
                  label={exam.percnt}
                  subLabel={exam.Marks}
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ExamSummary;
