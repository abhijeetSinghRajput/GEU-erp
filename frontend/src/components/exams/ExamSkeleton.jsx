import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { motion } from "framer-motion";
import { Skeleton } from "../ui/skeleton";


const ExamSkeleton = ({heading = "Exam Summary"}) => {
  return (
    <div className="max-w-screen-lg mx-auto px-2 sm:px-4 md:px-6 py-2">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="space-y-4 w-full"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">{heading}</h2>

        {[...Array(2)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="rounded-3xl">
              <CardHeader className="pb-0 justify-between items-center flex-row">
                <Skeleton className={"h-7 w-[150px]"} />
                <Skeleton className="size-8" />
              </CardHeader>
              <CardContent className="flex p-6 justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className={"h-7 w-[100px]"} />
                  <Skeleton className={"h-7 w-[100px]"} />
                </div>

                <div className="size-[85px] rounded-full aspect-square border-8 flex items-center justify-center border-muted">
                  <div className="space-y-1 w-1/2">
                    <Skeleton className={"h-6"} />
                    <Skeleton className={"h-3"} />
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

export default ExamSkeleton;
