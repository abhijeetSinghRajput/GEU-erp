"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";

const DataTable2 = ({
  data = [],
  columns = [],
  visibleColumns = {},
  footerData = null,
  onRowClick = () => {},
  isLoading = false,
  emptyState = null,
  sortable = true,
  selectable = false,
  onSelectionChange = () => {},
  defaultSort = null,
  rowClassName = '',
  headerClassName = '',
  cellClassName = '',
  footerClassName = '',
  stickyHeader = true,
  stickyFooter = true,
  pagination = null,
  onSortChange = () => {},
  customRenderers = {},
}) => {
  const [sortConfig, setSortConfig] = useState(
    defaultSort || { key: null, direction: 'asc' }
  );
  const [selectedRows, setSelectedRows] = useState([]);

  // Handle row selection
  const toggleRowSelection = (rowId, rowData) => {
    let newSelectedRows;
    if (selectedRows.includes(rowId)) {
      newSelectedRows = selectedRows.filter(id => id !== rowId);
    } else {
      newSelectedRows = [...selectedRows, rowId];
    }
    setSelectedRows(newSelectedRows);
    onSelectionChange(newSelectedRows, data.filter(row => newSelectedRows.includes(row.id)));
  };

  // Handle sorting
  const requestSort = (key) => {
    if (!sortable) return;
    
    let direction = 'asc';
    if (sortConfig.key === key) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }
    
    const newSortConfig = { key, direction };
    setSortConfig(newSortConfig);
    onSortChange(newSortConfig);
  };

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      // Handle numeric sorting
      if (!isNaN(a[sortConfig.key])) {
        const aValue = parseFloat(a[sortConfig.key]);
        const bValue = parseFloat(b[sortConfig.key]);
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      }
      
      // Handle string sorting
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Get sort icon for column
  const getSortIcon = (columnId) => {
    if (!sortable || sortConfig.key !== columnId) return null;
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="ml-2 h-3 w-3" />
    ) : (
      <ChevronDown className="ml-2 h-3 w-3" />
    );
  };

  // Custom cell renderer
  const renderCellContent = (row, column) => {
    if (customRenderers[column.id]) {
      return customRenderers[column.id](row);
    }
    
    if (column.render) {
      return column.render(row);
    }
    
    if (column.format) {
      return column.format(row[column.id]);
    }
    
    return row[column.id];
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
          <TableHeader className={`${stickyHeader ? 'sticky top-0 z-10' : ''} ${headerClassName}`}>
            <TableRow className="hover:bg-transparent">
              {/* Selection checkbox column */}
              {selectable && (
                <TableHead className="w-[40px]">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === data.length && data.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          const allIds = data.map(row => row.id);
                          setSelectedRows(allIds);
                          onSelectionChange(allIds, data);
                        } else {
                          setSelectedRows([]);
                          onSelectionChange([], []);
                        }
                      }}
                    />
                  </div>
                </TableHead>
              )}
              
              {/* Data columns */}
              {columns.map((column) => (
                <AnimatePresence key={column.id}>
                  {visibleColumns[column.id] !== false && (
                    <motion.th
                      key={column.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className={`px-4 py-3 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${column.headerClassName || ''}`}
                    >
                      {column.sortable !== false && sortable ? (
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
          
          {/* Loading state */}
          {isLoading && (
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length + (selectable ? 1 : 0)} className="h-24 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading data...
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          
          {/* Empty state */}
          {!isLoading && sortedData.length === 0 && (
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length + (selectable ? 1 : 0)} className="h-24 text-center">
                  {emptyState || 'No data available'}
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          
          {/* Data rows */}
          {!isLoading && sortedData.length > 0 && (
            <TableBody>
              {sortedData.map((item, rowIndex) => (
                <motion.tr
                  key={item.id || rowIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: rowIndex * 0.05 }}
                  className={`border-t hover:bg-muted/50 ${onRowClick ? 'cursor-pointer' : ''} ${rowClassName}`}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {/* Selection checkbox */}
                  {selectable && (
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(item.id)}
                          onChange={() => toggleRowSelection(item.id, item)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </TableCell>
                  )}
                  
                  {/* Data cells */}
                  {columns.map((column) => (
                    <AnimatePresence key={column.id}>
                      {visibleColumns[column.id] !== false && (
                        <motion.td
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          className={`px-4 py-3 align-middle [&:has([role=checkbox])]:pr-0 ${cellClassName} ${column.cellClassName || ''}`}
                        >
                          {renderCellContent(item, column)}
                        </motion.td>
                      )}
                    </AnimatePresence>
                  ))}
                </motion.tr>
              ))}
            </TableBody>
          )}
          
          {/* Footer */}
          {(footerData || pagination) && (
            <TableFooter className={`${stickyFooter ? 'sticky bottom-0' : ''} ${footerClassName}`}>
              <TableRow>
                {/* Selection summary */}
                {selectable && (
                  <TableCell className="px-4 py-3">
                    {selectedRows.length > 0 && `${selectedRows.length} selected`}
                  </TableCell>
                )}
                
                {/* Footer content */}
                {columns.map((column) => {
                  if (visibleColumns[column.id] === false) return null;
                  
                  if (footerData && footerData[column.id] !== undefined) {
                    return (
                      <TableCell 
                        key={column.id} 
                        className={`px-4 py-3 font-medium ${column.footerClassName || ''}`}
                      >
                        {column.footerRender 
                          ? column.footerRender(footerData) 
                          : footerData[column.id]}
                      </TableCell>
                    );
                  }
                  
                  return (
                    <TableCell 
                      key={column.id} 
                      className="px-4 py-3"
                    >
                      {column.id === columns[0].id ? 'Total' : ''}
                    </TableCell>
                  );
                })}
              </TableRow>
              
              {/* Pagination row */}
              {pagination && (
                <TableRow>
                  <TableCell colSpan={columns.length + (selectable ? 1 : 0)}>
                    {pagination}
                  </TableCell>
                </TableRow>
              )}
            </TableFooter>
          )}
        </Table>
      </div>
    </motion.div>
  );
};

export default DataTable2;