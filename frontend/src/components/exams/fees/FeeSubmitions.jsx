"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { InfoIcon, HomeIcon, FileTextIcon } from "lucide-react";
import { useFeeStore } from "@/stores/useFeeStore";
import DataTable from "./DataTable";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import TableError from "@/components/table/TableError";
import FeeSkeleton from "./FeeSkeleton";

const FeeSubmissions = () => {
  const { getFeeSubmissions, feeSubmitions, loadingFeeSubmitions } = useFeeStore();
  const [visibleColumns, setVisibleColumns] = useState({
    FeeHead: true,
    DueAmount: true,
    ReceivedAmount: true,
    BalanceAmount: true,
    status: true,
  });

  useEffect(()=>{
    getFeeSubmissions();
  }, [])

  if (loadingFeeSubmitions) {
    return (
      <FeeSkeleton header={"Fee Submissions"}/>
    );
  }
  if (!feeSubmitions) {
    return <TableError onReload={getFeeSubmissions}/>;
  }

  // Calculate totals
  const calculateTotals = (data) => {
    return data.reduce(
      (acc, item) => ({
        DueAmount: acc.DueAmount + item.DueAmount,
        ReceivedAmount: acc.ReceivedAmount + item.ReceivedAmount,
        BalanceAmount: acc.BalanceAmount + item.BalanceAmount,
        SCAmount: acc.SCAmount + (item.SCAmount || 0),
        SecurityAdjusted: acc.SecurityAdjusted + (item.SecurityAdjusted || 0),
      }),
      {
        DueAmount: 0,
        ReceivedAmount: 0,
        BalanceAmount: 0,
        SCAmount: 0,
        SecurityAdjusted: 0,
      }
    );
  };

  const courseTotals = calculateTotals(feeSubmitions.headdata);
  const hostelTotals = calculateTotals(feeSubmitions.headdatahostel);
  const hasHostelFees = feeSubmitions.headdatahostel.length > 0;

  // Columns configuration
  const feeColumns = [
    { id: "FeeHead", header: "Fee Head", sortable: false },
    { id: "DueAmount", header: "Due (₹)", sortable: true },
    { id: "ReceivedAmount", header: "Received (₹)", sortable: true },
    { id: "BalanceAmount", header: "Balance (₹)", sortable: true },
    { id: "status", header: "Status", sortable: true },
  ];

  const toggleColumnVisibility = (columnId) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  // Prepare data with status field
  const prepareTableData = (data) => {
    return data.map((item) => ({
      ...item,
      status: item.BalanceAmount > 0 ? "Pending" : "Paid",
    }));
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6">Fee Submissions</h2>

        <Tabs defaultValue="course" className="w-full">
          <TabsList className="grid w-full h-10 grid-cols-2 max-w-xs">
            <TabsTrigger value="course" className="h-full">
              <FileTextIcon className="w-4 h-4 mr-2" />
              Course Fees
            </TabsTrigger>
            <TabsTrigger value="hostel" className="h-full">
              <HomeIcon className="w-4 h-4 mr-2" />
              Hostel Fees
            </TabsTrigger>
          </TabsList>

          <TabsContent value="course">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="rounded-2xl overflow-hidden">
                <CardHeader className="border bg-muted">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Course Fee Details</CardTitle>
                      <CardDescription>
                        {feeSubmitions.headdata[0]?.YS || "Current Year"} Fee
                        Breakdown
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge
                        variant={
                          courseTotals.BalanceAmount > 0
                            ? "destructive"
                            : "success"
                        }
                      >
                        {courseTotals.BalanceAmount > 0 ? "Pending" : "Paid"}
                      </Badge>
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
                          {feeColumns.map((column) => (
                            <DropdownMenuCheckboxItem
                              key={column.id}
                              className="capitalize"
                              checked={visibleColumns[column.id]}
                              onCheckedChange={() =>
                                toggleColumnVisibility(column.id)
                              }
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
                  {feeSubmitions.headdata.length > 0 ? (
                    <div className="space-y-6">
                      <DataTable
                        data={prepareTableData(feeSubmitions.headdata)}
                        columns={feeColumns}
                        visibleColumns={visibleColumns}
                        footerData={{
                          FeeHead: "Total",
                          DueAmount: courseTotals.DueAmount,
                          ReceivedAmount: courseTotals.ReceivedAmount,
                          BalanceAmount: courseTotals.BalanceAmount,
                          status:
                            courseTotals.BalanceAmount > 0 ? "Pending" : "Paid",
                        }}
                        numericColumns={[
                          "DueAmount",
                          "ReceivedAmount",
                          "BalanceAmount",
                        ]}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <InfoIcon className="w-12 h-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-1">
                        No Course Fees Found
                      </h3>
                      <p className="text-muted-foreground text-center max-w-md">
                        There are no course fees associated with your account.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <FeeSummaryCards totals={courseTotals} />
            </motion.div>
          </TabsContent>

          <TabsContent value="hostel">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="rounded-2xl overflow-hidden">
                <CardHeader className="bg-muted">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Hostel Fee Details</CardTitle>
                      <CardDescription>
                        Accommodation and meal charges
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge
                        variant={
                          hostelTotals.BalanceAmount > 0
                            ? "destructive"
                            : "success"
                        }
                      >
                        {hostelTotals.BalanceAmount > 0 ? "Pending" : "Paid"}
                      </Badge>
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
                          {feeColumns.map((column) => (
                            <DropdownMenuCheckboxItem
                              key={column.id}
                              className="capitalize"
                              checked={visibleColumns[column.id]}
                              onCheckedChange={() =>
                                toggleColumnVisibility(column.id)
                              }
                            >
                              {column.header}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {hasHostelFees ? (
                    <div className="space-y-6">
                      <DataTable
                        data={prepareTableData(feeSubmitions.headdatahostel)}
                        columns={feeColumns}
                        visibleColumns={visibleColumns}
                        footerData={{
                          FeeHead: "Total",
                          DueAmount: hostelTotals.DueAmount,
                          ReceivedAmount: hostelTotals.ReceivedAmount,
                          BalanceAmount: hostelTotals.BalanceAmount,
                          status:
                            hostelTotals.BalanceAmount > 0 ? "Pending" : "Paid",
                        }}
                        numericColumns={[
                          "DueAmount",
                          "ReceivedAmount",
                          "BalanceAmount",
                        ]}
                      />
                    </div>
                  ) : (
                    <div className="flex h-[60vh] flex-col items-center justify-center py-12">
                      <HomeIcon className="w-12 h-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-1">
                        No Hostel Fees Found
                      </h3>
                      <p className="text-muted-foreground text-center max-w-md">
                        You don't have any hostel fees in your account records.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <FeeSummaryCards totals={hostelTotals} />
            </motion.div>
          </TabsContent>
        </Tabs>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Payment Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Total Course Fees:
                      </span>
                      <span>₹{courseTotals.DueAmount.toLocaleString()}</span>
                    </div>
                    {courseTotals.totalScholarship > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Scholarship Applied:
                        </span>
                        <span className="text-green-600">
                          -₹{courseTotals.totalScholarship.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {courseTotals.SCAmount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Scholarship Applied:
                        </span>
                        <span className="text-green-600">
                          -₹{courseTotals.SCAmount.toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-medium">
                        <span>Total Amount Paid:</span>
                        <span>
                          ₹{courseTotals.ReceivedAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {hasHostelFees && (
                  <div>
                    <h4 className="font-medium mb-3">Hostel Payment Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Total Hostel Fees:
                        </span>
                        <span>₹{hostelTotals.DueAmount.toLocaleString()}</span>
                      </div>
                      {hostelTotals.SCAmount > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Security Adjusted:
                          </span>
                          <span className="text-green-600">
                            -₹{hostelTotals.SCAmount.toLocaleString()}
                          </span>
                        </div>
                      )}
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-medium">
                          <span>Total Amount Paid:</span>
                          <span>
                            ₹{hostelTotals.ReceivedAmount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {(hasHostelFees || courseTotals.DueAmount > 0) && (
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Grand Total Paid:</span>
                    <span>
                      ₹
                      {(
                        courseTotals.ReceivedAmount +
                        hostelTotals.ReceivedAmount
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

const FeeSummaryCards = ({ totals }) => {
  return (
    <Card className="rounded-2xl mt-6 p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-muted">
        <CardHeader className="p-4">
          <CardDescription>Total Due</CardDescription>
          <CardTitle className="text-2xl">
            ₹{totals.DueAmount.toLocaleString()}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="bg-muted">
        <CardHeader className="p-4">
          <CardDescription>Total Received</CardDescription>
          <CardTitle
            className={`text-2xl ${
              totals.ReceivedAmount === totals.DueAmount
                ? "text-green-600"
                : "text-amber-600"
            }`}
          >
            ₹{totals.ReceivedAmount.toLocaleString()}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="bg-muted">
        <CardHeader className="p-4">
          <CardDescription>Total Balance</CardDescription>
          <CardTitle
            className={`text-2xl ${
              totals.BalanceAmount > 0 ? "text-red-500" : "text-green-600"
            }`}
          >
            ₹{totals.BalanceAmount.toLocaleString()}
          </CardTitle>
        </CardHeader>
      </Card>
    </Card>
  );
};

export default FeeSubmissions;
