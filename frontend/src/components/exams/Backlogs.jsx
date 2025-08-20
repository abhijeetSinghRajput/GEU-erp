import React, { useState } from "react";
import DataTable from "../table/Table";
import { ChevronDown, ClipboardCheck, InfoIcon, Smile } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

const Backlogs = ({ backlogs }) => {
  backlogs = backlogs.map((log) => ({
    ...log,
    PaperType: log.SubjectCode.startsWith("TMC") ? "Theory" : "Lab",
  }));

  const termType = backlogs[0]?.YS || "Semester";

  const [visibleColumns, setVisibleColumns] = useState({
    SubjectCode: true,
    Subject: true,
    [termType]: true,
    PaperType: true,
  });

  const toggleColumnVisibility = (columnId) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  const columns = [
    { id: "SubjectCode", header: "Subject Code", sortable: true },
    { id: "Subject", header: "Subject Name", sortable: true },
    { id: "PaperType", header: "Paper Type", sortable: false },
    { id: "YearSem", header: [termType], sortable: true },
  ];

  return (
    <Card className="rounded-2xl overflow-hidden">
      <CardHeader className="border bg-muted">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <CardTitle>Backlog Details</CardTitle>
            <CardDescription className="flex gap-2">
              <Badge variant="destructive">{`${backlogs.length} Backlogs`}</Badge>
              that need to be cleared
            </CardDescription>
          </div>
          <div className="flex gap-2 items-center">
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
      </CardHeader>

      <CardContent className="border p-0">
        {backlogs && backlogs.length > 0 ? (
          <div className="space-y-6">
            <DataTable
              data={backlogs}
              columns={columns}
              visibleColumns={visibleColumns}
              numericColumns={["YearSem"]}
            />
          </div>
        ) : (
          <div className="flex h-[60vh] flex-col items-center justify-center py-12">

            <ClipboardCheck className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-1">No Backlogs Found</h3>
            <p className="text-muted-foreground text-center max-w-md">
              You have cleared all your subjects. Great job!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Backlogs;
