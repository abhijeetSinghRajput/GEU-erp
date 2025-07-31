"use client";

import React, { useEffect, useState } from "react";
import DataTable from "./dataTable";
import { useStudentStore } from "@/stores/useStudentStore";
import { useAttendanceStore } from "@/stores/useAttendanceStore";
import { Card } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown, Loader2 } from "lucide-react";
import { format, isValid, parseISO } from "date-fns";
import { Badge } from "../ui/badge";

const AttandanceTable = () => {
  const { attendance, getAttendance, isLoadingAttendance } =
    useAttendanceStore();
  const { student } = useStudentStore();
  const [visibleColumns, setVisibleColumns] = useState({
    Subject: true,
    SubjectCode: false,
    EMPNAME: false,
    TotalLecture: true,
    TotalPresent: true,
    TotalLeave: true,
    Percentage: true,
  });

  useEffect(() => {
    if (student?.RegID) {
      getAttendance({ RegID: student.RegID });
    }
  }, [student?.RegID]);

  if (isLoadingAttendance) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  const {
    DateFrom = "",
    DateTo = "",
    TotalLecture = 0,
    TotalPresent = 0,
    TotalLeave = 0,
    TotalPercentage = 0,
  } = attendance?.data?.[0] ?? {};

  const hasValidDates = isValid(parseISO(DateFrom)) && isValid(parseISO(DateTo));

  const columns = [
    { id: "Subject", header: "Subject", sortable: false },
    { id: "SubjectCode", header: "Subject Code", sortable: false },
    { id: "EMPNAME", header: "Faculty", sortable: false },
    { id: "TotalLecture", header: "Lectures", sortable: true },
    { id: "TotalPresent", header: "Present", sortable: true },
    { id: "TotalLeave", header: "Leave", sortable: true },
    { id: "Percentage", header: "Percentage", sortable: true },
  ];

  const toggleColumnVisibility = (columnId) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 md:px-4 py-2">
      <Card className="overflow-hidden">
          <div className="sticky top-0 z-10 bg-muted">
            <div className="p-4 border-b flex justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold">Attendance</h2>
                  <Badge className={"font-bold text-sm"}>
                    {TotalPercentage}%
                  </Badge>
                </div>
                {hasValidDates && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {format(parseISO(DateFrom), "d MMMM yyyy")} -{" "}
                    {format(parseISO(DateTo), "d MMMM yyyy")}
                  </p>
                )}
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto gap-1 bg-input"
                  >
                    <span>Columns</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[150px]">
                  {columns.map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={visibleColumns[column.id]}
                      onCheckedChange={() => toggleColumnVisibility(column.id)}
                    >
                      {column.header}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        <ScrollArea className="w-full whitespace-nowrap">

          <DataTable
            data={attendance?.state || []}
            columns={columns}
            visibleColumns={visibleColumns}
            footerData={{
              TotalLecture,
              TotalPresent,
              TotalLeave,
              TotalPercentage,
            }}
          />
          
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>
    </div>
  );
};

export default AttandanceTable;