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
import { ChevronDown } from "lucide-react";

const AttandanceTable = () => {
  const { attendance, getAttendance, isLoadingAttendance } = useAttendanceStore();
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

  const columns = [
    { id: 'Subject', header: 'Subject', sortable: false },
    { id: 'SubjectCode', header: 'Subject Code', sortable: false },
    { id: 'EMPNAME', header: 'Faculty', sortable: false },
    { id: 'TotalLecture', header: 'Lectures', sortable: true },
    { id: 'TotalPresent', header: 'Present', sortable: true },
    { id: 'TotalLeave', header: 'Leave', sortable: true },
    { id: 'Percentage', header: 'Percentage', sortable: true },
  ];
  useEffect(() => {
    if (student?.RegID) {
      getAttendance({ RegID: student.RegID });
    }
  }, [student?.RegID]);

  const toggleColumnVisibility = (columnId) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnId]: !prev[columnId]
    }));
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <ScrollArea className="w-full mx-auto whitespace-nowrap">
          <div className="p-4 w-full flex gap-2 justify-between items-center rounded-t-lg absolute top-0 left-0">
              <h3 className="text-2xl font-medium">Attendance</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-input/30 ml-auto">
                    <ChevronDown className="mr-2 h-4 w-4" />
                    Columns
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
          <div className="mt-14">
            <DataTable 
              data={attendance?.state || []} 
              columns={columns} 
              visibleColumns={visibleColumns} 
            />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>
    </div>
  );
};

export default AttandanceTable;
