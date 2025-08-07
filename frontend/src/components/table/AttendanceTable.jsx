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
import { ChevronDown, Clipboard, User2 } from "lucide-react";
import { format, isValid, parseISO } from "date-fns";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AttendanceCalendar from "../attendanceCalendar/AttendanceCalendar";
import TableSkeleton from "./TableSkeleton";
import { useAuthStore } from "@/stores/useAuthStore";
import TableError from "./TableError";
import CircularProgress from "../ui/circular-progress";

const AttendanceTable = () => {
  const { attendance, isLoadingSubjects, getAllAttendanceSubjects } =
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
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { authenticated } = useAuthStore();

  useEffect(() => {
    if (authenticated && student?.RegID) {
      console.log("Fetching attendance for RegID:", student.RegID);
      getAllAttendanceSubjects({ RegID: student.RegID });
    }
  }, [student?.RegID]);

  if (isLoadingSubjects) {
    return <TableSkeleton />;
  }

  if (!attendance) {
    return <TableError onReload={()=>{
      getAllAttendanceSubjects({ RegID: student?.RegID });
    }} />;
  }

  const {
    DateFrom = "",
    DateTo = "",
    TotalLecture = 0,
    TotalPresent = 0,
    TotalLeave = 0,
    TotalPercentage = 0,
  } = attendance?.data?.[0] ?? {};

  const hasValidDates =
    isValid(parseISO(DateFrom)) && isValid(parseISO(DateTo));

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

  const handleRowClick = (subject) => {
    setSelectedSubject(subject);
    setIsDialogOpen(true);
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 md:px-4 py-2 mt-6">
      <h2 className="text-3xl font-bold mb-6">Attendance</h2>
      <Card className="overflow-hidden">
        <div className="sticky top-0 z-10 bg-muted">
          <div className="p-4 border-b flex justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
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
            onRowClick={handleRowClick}
          />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>

      {/* Dialog for showing subject details */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedSubject?.Subject || "Subject Details"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            {selectedSubject && (
              <div className="flex justify-between items-center">
                {/* Left side - Subject Code and Faculty */}
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2 items-center">
                    <Clipboard className="text-muted-foreground size-5" />
                    <p className="font-medium">{selectedSubject.SubjectCode}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <User2 className="text-muted-foreground size-5" />
                    <p className="font-medium">{selectedSubject.EMPNAME}</p>
                  </div>
                </div>

                <CircularProgress
                  value={selectedSubject.Percentage}
                  label={`${selectedSubject.Percentage}%`}
                  subLabel={`${selectedSubject.TotalPresent} / ${selectedSubject.TotalLecture}`}
                  size={85}
                  strokeWidth={10}
                />
              </div>
            )}

            {/* Attendance Calendar at the bottom */}
            <AttendanceCalendar
              selectedSubject={selectedSubject}
              data={attendance?.data[0]}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AttendanceTable;
