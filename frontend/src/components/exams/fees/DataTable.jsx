// components/DataTable.jsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import TooltipWrapper from "@/components/TooltipWrapper";

const DataTable = ({
  data = [],
  columns = [],
  visibleColumns = {},
  footerData = {},
  onRowClick,
  statusConfig = {
    accessor: "status",
    positiveValue: "Paid",
    negativeValue: "Pending",
    positiveVariant: "success",
    negativeVariant: "destructive",
  },
  numericColumns = [],
}) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  // Apply column visibility
  const filteredColumns = columns.filter(
    (column) => visibleColumns[column.id] !== false
  );

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      // Handle numeric columns
      if (numericColumns.includes(sortConfig.key)) {
        const aValue = parseFloat(a[sortConfig.key]);
        const bValue = parseFloat(b[sortConfig.key]);
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      }

      // Handle string columns
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig, numericColumns]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key) {
      direction = sortConfig.direction === "asc" ? "desc" : "asc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnId) => {
    if (sortConfig.key !== columnId) return null;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="ml-2 h-3 w-3" />
    ) : (
      <ChevronDown className="ml-2 h-3 w-3" />
    );
  };

  const renderCellContent = (row, column) => {
    // Handle status badge rendering
    if (column.id === statusConfig.accessor) {
      const isPositive = row.BalanceAmount === 0 || row.Percentage >= 75;
      return (
        <Badge
          variant={
            isPositive
              ? statusConfig.positiveVariant
              : statusConfig.negativeVariant
          }
        >
          {isPositive ? statusConfig.positiveValue : statusConfig.negativeValue}
        </Badge>
      );
    }

    // Handle numeric formatting
    if (
      numericColumns.includes(column.id) &&
      typeof row[column.id] === "number"
    ) {
      const prefix = column.id.includes("Amount") ? "₹" : "";
      const suffix = column.id === "Percentage" ? "%" : "";
      return `${prefix}${row[column.id].toLocaleString()}${suffix}`;
    }

    return row[column.id];
  };

  console.log(numericColumns);
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-h-[60vh]"
      >
        <Table className="border-collapse w-full">
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow className="hover:bg-transparent">
              {filteredColumns.map((column) => (
                <AnimatePresence key={column.id}>
                  <motion.th
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className={`text-left align-middle font-medium text-muted-foreground p-0`}
                  >
                    {column.sortable ? (
                      <TooltipWrapper content={"Sort Data"}>
                        <Button
                          variant="ghost"
                          onClick={() => requestSort(column.id)}
                          className={cn(
                            "px-4 py-3 gap-0.5 h-auto w-full rounded-none justify-start font-medium hover:bg-muted",
                            numericColumns.includes(column.id) &&
                              "text-right justify-end"
                          )}
                        >
                          {column.header}
                          {getSortIcon(column.id)}
                        </Button>
                      </TooltipWrapper>
                    ) : (
                      <div className="px-4 py-3">{column.header}</div>
                    )}
                  </motion.th>
                </AnimatePresence>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {sortedData.map((item, rowIndex) => (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: rowIndex * 0.05 }}
                className="border-t hover:bg-muted/50 cursor-pointer"
                onClick={() => onRowClick?.(item)}
              >
                {filteredColumns.map((column) => (
                  <motion.td
                    key={column.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`px-4 py-3 align-middle [&:has([role=checkbox])]:pr-0 ${
                      numericColumns.includes(column.id) ? "text-right" : ""
                    }`}
                  >
                    {renderCellContent(item, column)}
                  </motion.td>
                ))}
              </motion.tr>
            ))}
          </TableBody>

          {footerData && (
            <TableFooter className="bg-muted sticky bottom-0">
              <TableRow>
                {filteredColumns.map((column) => {
                  const footerValue = footerData[column.id];
                  if (footerValue === undefined) return null;

                  return (
                    <TableCell
                      key={column.id}
                      className={cn(
                        "px-4 py-3",
                        numericColumns.includes(column.id) &&
                          "text-right font-medium"
                      )}
                    >
                      {numericColumns.includes(column.id) &&
                      column.id.includes("Amount")
                        ? `₹${footerValue.toLocaleString()}`
                        : footerValue}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </motion.div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default DataTable;
