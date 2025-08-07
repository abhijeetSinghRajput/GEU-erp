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
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const TableError = ({
  variant = "destructive",
  heading = "Data Loading Failed",
  description,
  onReload,
}) => {
  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 md:px-4 py-2">
      <Card className="overflow-hidden relative">
        <div className="absolute z-20 inset-0 bg-background/70 flex items-center justify-center p-4">
          <div className="text-center space-y-4">
            <AlertTriangle className="h-12 w-12 mx-auto text-destructive" />
            <h3 className="text-2xl font-medium text-destructive">
              {heading}
            </h3>
            <p className="text-destructive max-w-md">
              {description || "We couldn't load the attendance records. Please check your connection and try again."}
            </p>
            {onReload && (
              <Button
                onClick={onReload}
                className="mt-4 gap-2"
              >
                <RefreshCw />
                Retry
              </Button>
            )}
          </div>
        </div>

        <div
          className={cn(
            "sticky top-0 z-10",
            variant === "destructive" ? "bg-destructive/10" : "bg-muted"
          )}
        >
          <div className="p-4 border-b flex justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <Skeleton
                  className={cn(
                    "animate-none text-xl font-semibold h-7 w-28",
                    variant === "destructive" && "bg-destructive/30"
                  )}
                />
                <Skeleton
                  className={cn(
                    "animate-none h-7 w-16",
                    variant === "destructive" && "bg-destructive/30"
                  )}
                />
              </div>
              <Skeleton
                className={cn(
                  "animate-none h-5 w-38",
                  variant === "destructive" && "bg-destructive/30"
                )}
              />
            </div>

            <Skeleton
              variant="outline"
              size="sm"
              className={cn(
                "animate-none ml-auto gap-1 bg-input h-8 w-24",
                variant === "destructive" && "bg-destructive/30"
              )}
            />
          </div>
        </div>

        <Table>
          <TableBody>
            {[...Array(7)].map((_, idx) => (
              <TableRow key={idx} className={idx === 0 && "bg-muted/30 h-14"}>
                <TableCell>
                  <Skeleton
                    className={cn(
                      variant === "destructive" &&
                        "animate-none bg-destructive/30",
                      "h-7 min-w-24"
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Skeleton
                    className={cn(
                      variant === "destructive" &&
                        "animate-none bg-destructive/30",
                      "h-7 min-w-24"
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Skeleton
                    className={cn(
                      variant === "destructive" &&
                        "animate-none bg-destructive/30",
                      "h-7 min-w-24"
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Skeleton
                    className={cn(
                      variant === "destructive" &&
                        "animate-none bg-destructive/30",
                      "h-7 min-w-24"
                    )}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default TableError;
