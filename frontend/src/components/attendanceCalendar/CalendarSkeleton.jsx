import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CalendarSkeleton = () => {
  return (
    <div className="bg-input/30 rounded-md border p-2 space-y-4">
      {/* Calendar Header */}
      <div className="flex justify-between items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>

      {/* Day Names */}
      <div className="mb-2 grid grid-cols-7 gap-2">
        {[...Array(7)].map((_, i) => (
          <Skeleton key={i} className="h-5 w-full" />
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {[...Array(35)].map((_, i) => (
          <Skeleton key={i} className="aspect-square h-9 w-full rounded-md" />
        ))}
      </div>
    </div>
  );
};

export default CalendarSkeleton;
