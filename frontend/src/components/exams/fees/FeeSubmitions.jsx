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
import CourseFee from "./CourseFee";
import HostelFee from "./HostelFee";

const FeeSubmissions = () => {
  const { getFeeSubmissions, feeSubmitions, loadingFeeSubmitions } =
    useFeeStore();
  const [visibleColumns, setVisibleColumns] = useState({
    FeeHead: true,
    DueAmount: true,
    ReceivedAmount: true,
    BalanceAmount: true,
    status: true,
  });

  useEffect(() => {
    getFeeSubmissions();
  }, []);

  if (loadingFeeSubmitions) {
    return <FeeSkeleton header={"Fee Submissions"} />;
  }
  if (!feeSubmitions) {
    return <TableError onReload={getFeeSubmissions} />;
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
    { id: "DueAmount", header: "Due", sortable: true, prefix: "₹" },
    {
      id: "ReceivedAmount",
      header: "Received",
      sortable: true,
      prefix: "₹",
    },
    { id: "BalanceAmount", header: "Balance", sortable: true, prefix: "₹" },
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
    <div className="max-w-screen-lg mx-auto px-2 sm:px-4 md:px-6 py-2">
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
              <CourseFee
                data={prepareTableData(feeSubmitions.headdata)}
                totals={courseTotals}
                columns={feeColumns}
                visibleColumns={visibleColumns}
              />

              <FeeSummaryCards totals={courseTotals} />
            </motion.div>
          </TabsContent>

          <TabsContent value="hostel">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <HostelFee
                data={prepareTableData(feeSubmitions.headdata)}
                totals={courseTotals}
                columns={feeColumns}
                visibleColumns={visibleColumns}
                hasHostelFees={hasHostelFees}
              />

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
