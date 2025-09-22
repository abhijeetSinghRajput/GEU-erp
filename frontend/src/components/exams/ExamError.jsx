import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { motion } from "framer-motion";
import { Skeleton } from "../ui/skeleton";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";

const ExamError = ({ heading = "Exam Summary", onReload, description }) => {
  return (
    
    <div className="max-w-screen-lg mx-auto px-2 sm:px-4 md:px-6 py-2 mt-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="space-y-4 w-full relative"
      >
        <div className="absolute z-20 opacity inset-0 bg-background/70 flex items-center justify-center p-4">
          <div className="text-center space-y-4">
            <AlertTriangle className="h-12 w-12 mx-auto text-destructive" />
            <h3 className="text-2xl font-medium text-destructive">{heading}</h3>
            <p className="text-destructive max-w-md">
              {description ||
                "We couldn't load the attendance records. Please check your connection and try again."}
            </p>
            {onReload && (
              <Button onClick={onReload} className="mt-4 gap-2">
                <RefreshCw />
                Retry
              </Button>
            )}
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">{heading}</h2>
        {[...Array(2)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="rounded-3xl bg-destructive/10 border-destructive/30">
              <CardHeader className="pb-0 justify-between items-center flex-row">
                <Skeleton className={"animate-none bg-destructive/30 h-7 w-[150px]"} />
                <Skeleton className="animate-none bg-destructive/30 size-8" />
              </CardHeader>
              <CardContent className="flex p-6 justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className={"animate-none bg-destructive/30 h-7 w-[100px]"} />
                  <Skeleton className={"animate-none bg-destructive/30 h-7 w-[100px]"} />
                </div>

                <div className="size-[85px] rounded-full aspect-square border-8 border-destructive/30 flex items-center justify-center">
                  <div className="space-y-1 w-1/2">
                    <Skeleton className={"animate-none bg-destructive/30 h-6"} />
                    <Skeleton className={"animate-none bg-destructive/30 h-3"} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ExamError;
