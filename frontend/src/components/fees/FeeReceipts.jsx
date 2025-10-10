import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, InfoIcon, Download, Loader2 } from "lucide-react";
import React, { useState } from "react";
import DataTable from "../table/Table";
import TooltipWrapper from "../TooltipWrapper";
import { useFeeStore } from "@/stores/useFeeStore";
import TableError from "../table/TableError";
import FeeSkeleton from "./FeeSkeleton";
import { motion } from "framer-motion";
import { Ring } from "ldrs/react";

const FeeReceipts = ({ data }) => {
  const {
    downloadReceipt,
    getFeeReceipts,
    downloadingReceipt,
    loadingFeeReceipts,
    errors,
  } = useFeeStore();

  // Process data to fill empty remarks
  const [visibleColumns, setVisibleColumns] = useState({
    Actions: true,
    CombineReceiptNo: true,
    formattedDate: true,
    paymentType: true,
    formattedAmount: true,
    Remarks: false,
    TotalAmount: true,
  });

  if (loadingFeeReceipts ) {
    return <FeeSkeleton className={"mt-0"} />;
  }

  if (errors.getFeeReceipts || !Array.isArray(data)) {
    return (
      <TableError
        className={"px-0 sm:px-0 md:px-0"}
        description={errors.getFeeReceipts}
        onReload={getFeeReceipts}
      />
    );
  }

  const toggleColumnVisibility = (columnId) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  const processedData = data.map((receipt) => ({
    ...receipt,
    Remarks: receipt.Remarks || receipt["Receive/Payment"] || "fee paid",
    paymentType: getPaymentType(receipt),
    formattedDate: formatDate(receipt.ReceiptDate),
  }));

  const columns = [
    { id: "CombineReceiptNo", header: "Receipt No", sortable: true },
    { id: "formattedDate", header: "Date", sortable: true },
    { id: "paymentType", header: "Type", sortable: true },
    { id: "TotalAmount", header: "Amount", sortable: true, prefix: "₹" },
    { id: "Remarks", header: "Description", sortable: false },
    {
      id: "Actions",
      header: "Actions",
      sortable: false,
      cell: (row) => (
        <TooltipWrapper content="Download Receipt">
          <Button
            variant="ghost"
            className="size-8"
            disabled={downloadingReceipt === row.CombineReceiptNo}
            onClick={() =>
              downloadReceipt(
                row.ReceiptModeID,
                row.BookID,
                row.CombineReceiptNo
              )
            }
          >
            {downloadingReceipt === row.CombineReceiptNo ? (
              <Ring
                size={20}
                speed={1.5}
                stroke={2}
                color="hsl(var(--primary))"
              />
            ) : (
              <Download />
            )}
          </Button>
        </TooltipWrapper>
      ),
    },
  ];

  // Helper functions
  function getPaymentType(receipt) {
    if (receipt.OTAmount > 0) return "Online Transfer";
    if (receipt.DDAmount > 0) return "Demand Draft";
    if (receipt.POAmount > 0) return "Pay Order";
    if (receipt["POSM Amount"] > 0) return "Card Payment";
    return receipt["Receive/Payment"] || "Adjustment";
  }

  function formatDate(dateString) {
    if (!dateString) return "N/A";
    const parts = dateString.split("/");
    if (parts.length === 3) {
      return `${parts[0]}/${parts[1]}/${parts[2].slice(-2)}`; // DD/MM/YY format
    }
    return dateString;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="rounded-2xl overflow-hidden">
        <CardHeader className="border bg-muted">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                Fee Receipts
              </CardTitle>
              <CardDescription>
                Payment history and transaction records
              </CardDescription>
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
                {columns
                  .filter((col) => col.id !== "actions")
                  .map((column) => (
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
        </CardHeader>

        <CardContent className="border p-0">
          {processedData.length > 0 ? (
            <div className="space-y-6">
              <DataTable
                data={processedData}
                columns={columns}
                visibleColumns={visibleColumns}
                footerData={{
                  CombineReceiptNo: "Total",
                  TotalAmount: processedData.reduce(
                    (sum, receipt) => sum + receipt.TotalAmount,
                    0
                  ),
                }}
                numericColumns={["TotalAmount"]}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <InfoIcon className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-1">No Receipts Found</h3>
              <p className="text-muted-foreground text-center max-w-md">
                There are no payment receipts associated with your account.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeeReceipts;
