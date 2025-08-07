import React from "react";
import { Card } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

const TableSkeleton = ({ className }) => {
  return (
    <div
      className={cn(
        "max-w-screen-lg mx-auto px-4 sm:px-6 md:px-4 py-2",
        className
      )}
    >
      <Card className="overflow-hidden">
        <div className="sticky top-0 z-10 bg-muted">
          <div className="p-4 border-b flex justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <Skeleton className="text-xl font-semibold h-7 w-28" />
                <Skeleton className={"h-7 w-16"} />
              </div>
              <Skeleton className={"h-5 w-38"} />
            </div>

            <Skeleton
              variant="outline"
              size="sm"
              className="ml-auto gap-1 bg-input h-8 w-24"
            />
          </div>
        </div>
        <ScrollArea className="w-full whitespace-nowrap">
          <Table>
            <TableBody>
              {[...Array(7)].map((_, idx) => (
                <TableRow key={idx} className={idx === 0 && "bg-muted/30 h-14"}>
                  <TableCell>
                    <Skeleton className={"h-7 w-24"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton className={"h-7 w-24"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton className={"h-7 w-24"} />
                  </TableCell>
                  <TableCell>
                    <Skeleton className={"h-7 w-24"} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>
    </div>
  );
};

export default TableSkeleton;
