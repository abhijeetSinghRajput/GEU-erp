import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

const CircularSkeleton = ({ className }) => {
  return (
    <div
      className={cn(
        "max-w-screen-lg mx-auto px-2 sm:px-4 md:px-6 py-2",
        className
      )}
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">Notices</h2>

      <div className="space-y-4">
        {[...Array(3)].map((_, idx) => (
          <Card key={idx} className="w-full rounded-3xl shadow-lg">
            <CardHeader className="flex pb-4 gap-2 flex-row items-start">
              <Skeleton className="aspect-square size-14 rounded-2xl"></Skeleton>
              <div className="space-y-1 w-full">
                <Skeleton className="h-7 max-w-[280px]" />
                <Skeleton className={"h-5 max-w-[150px]"} />
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <Skeleton className={"h-5 w-full"} />
              <Skeleton className={"h-5 max-w-28"} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CircularSkeleton;
