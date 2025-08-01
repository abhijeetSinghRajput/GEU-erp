"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
import { ChevronDown, ArrowUp, ArrowDown } from "lucide-react";

const DataTable = ({ data, columns, visibleColumns, footerData, onRowClick }) => {
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });



  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      if (sortConfig.key === 'Percentage') {
        const aValue = parseFloat(a[sortConfig.key]);
        const bValue = parseFloat(b[sortConfig.key]);
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      }
      
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const getSortIcon = (columnId) => {
    if (sortConfig.key !== columnId) return null;
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="ml-2 h-3 w-3" />
    ) : (
      <ArrowDown className="ml-2 h-3 w-3" />
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="relative w-full overflow-x-auto">
        <Table className="border-collapse w-full">
          <TableHeader className="bg-muted/50 sticky top-0 z-10">
            <TableRow className="hover:bg-transparent">
              {columns.map((column) => (
                <AnimatePresence key={column.id}>
                  {visibleColumns[column.id] && (
                    <motion.th
                      key={column.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className={`px-4 py-3 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0`}
                    >
                      {column.sortable ? (
                        <Button
                          variant="ghost"
                          onClick={() => requestSort(column.id)}
                          className="p-1.5 gap-0.5 h-auto w-full justify-start font-medium hover:bg-muted"
                        >
                          {column.header}
                          {getSortIcon(column.id)}
                        </Button>
                      ) : (
                        column.header
                      )}
                    </motion.th>
                  )}
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
                onClick={()=>onRowClick(item)}
              >
                {columns.map((column) => (
                  <AnimatePresence key={column.id}>
                    {visibleColumns[column.id] && (
                      <motion.td
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className={`px-4 py-3 align-middle [&:has([role=checkbox])]:pr-0`}
                      >
                        {column.id === 'Percentage' 
                          ? `${item[column.id]}%` 
                          : item[column.id]}
                      </motion.td>
                    )}
                  </AnimatePresence>
                ))}
              </motion.tr>
            ))}
          </TableBody>
          
          <TableFooter className="bg-muted/50 sticky bottom-0">
            <TableRow>
              {columns.map((column) => {
                if (!visibleColumns[column.id]) return null;
                
                if (['TotalLecture', 'TotalPresent', 'TotalLeave', 'Percentage'].includes(column.id)) {
                  return (
                    <TableCell 
                      key={column.id} 
                      className="px-4 py-3 font-medium"
                    >
                      {column.id === 'Percentage'
                        ? `${footerData.TotalPercentage}%`
                        : footerData[column.id]}
                    </TableCell>
                  );
                }
                
                return (
                  <TableCell 
                    key={column.id} 
                    className="px-4 py-3"
                  >
                    {column.id === 'Subject' ? 'Total' : ''}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </motion.div>
  );
};

export default DataTable;