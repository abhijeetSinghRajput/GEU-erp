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
import { HomeIcon, FileTextIcon, WalletIcon, AlertCircleIcon, CheckCircleIcon } from "lucide-react";
import { useFeeStore } from "@/stores/useFeeStore";

import TableError from "@/components/table/TableError";
import FeeSkeleton from "./FeeSkeleton";
import CourseFee from "./CourseFee";
import HostelFee from "./HostelFee";
import FeeReceipts from "./FeeReceipts";
import FeeError from "./FeeError";
import { Progress } from "../ui/progress";

const FeeSubmissions = () => {
  const {
    getFeeSubmissions,
    feeSubmissions,
    loadingFeeSubmissions,
    getFeeReceipts,
    feeReceipts,
    errors,
  } = useFeeStore();

  useEffect(() => {
    getFeeSubmissions();
    getFeeReceipts();
  }, []);

  if (loadingFeeSubmissions) {
    return <FeeSkeleton header={"Fee Submissions"} />;
  }

  if (errors.getFeeSubmissions || !feeSubmissions) {
    return (
      <FeeError
        description={errors.getFeeSubmissions}
        onReload={getFeeSubmissions}
      />
    );
  }

  // Calculate totals
  const calculateTotals = (data) => {
    if (!Array.isArray(data)) return;

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

  const courseTotals = calculateTotals(feeSubmissions.headdata);
  const hostelTotals = calculateTotals(feeSubmissions.headdatahostel);
  const hasHostelFees = feeSubmissions.headdatahostel.length > 0;

  // Columns configuration
  const feeColumns = [
    { id: "FeeHead", header: "Fee Head", sortable: false },
    { id: "DueAmount", header: "Due", sortable: true, prefix: "₹" },
    { id: "ReceivedAmount", header: "Received", sortable: true, prefix: "₹" },
    { id: "BalanceAmount", header: "Balance", sortable: true, prefix: "₹" },
    { id: "status", header: "Status", sortable: true },
  ];

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
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Fee Submissions</h2>

        <Tabs defaultValue="course" className="w-full">
          <TabsList className="grid w-full h-10 grid-cols-3 max-w-xs">
            <TabsTrigger value="course" className="h-full">
              <FileTextIcon className="w-4 h-4 mr-2" />
              Course Fees
            </TabsTrigger>
            <TabsTrigger value="hostel" className="h-full">
              <HomeIcon className="w-4 h-4 mr-2" />
              Hostel Fees
            </TabsTrigger>
            <TabsTrigger value="receipts" className="h-full">
              <WalletIcon className="w-4 h-4 mr-2" />
              Receipts Fees
            </TabsTrigger>
          </TabsList>

          <TabsContent value="course">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <CourseFee
                data={prepareTableData(feeSubmissions.headdata)}
                totals={courseTotals}
                columns={feeColumns}
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
                data={prepareTableData(feeSubmissions.headdata)}
                totals={hostelTotals}
                columns={feeColumns}
                hasHostelFees={hasHostelFees}
              />

              {hasHostelFees && <FeeSummaryCards totals={hostelTotals} />}
            </motion.div>
          </TabsContent>

          <TabsContent value="receipts">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <FeeReceipts data={feeReceipts} />
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
              <div className="flex  gap-6">
                <div className="flex-1">
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
                  <div className="flex-1">
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
              {(hasHostelFees) && (
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
  const paymentProgress = (totals.ReceivedAmount / totals.DueAmount) * 100;
  const isFullyPaid = totals.BalanceAmount <= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {/* Total Fees Card */}
      <motion.div 
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="h-full border border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/10">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 text-blue-600 dark:text-blue-300">
              <FileTextIcon className="w-4 h-4" />
              Total Fees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <CardTitle className="text-2xl font-bold">
                ₹{totals.DueAmount.toLocaleString()}
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                {totals.SCAmount > 0 && (
                  <span className="text-green-600 line-through">
                    ₹{(totals.DueAmount + totals.SCAmount).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Paid Fees Card */}
      <motion.div 
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="h-full border border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-900/10">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 text-emerald-600 dark:text-emerald-300">
              <WalletIcon className="w-4 h-4" />
              Paid Amount
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <CardTitle className={`text-2xl font-bold ${isFullyPaid ? 'text-emerald-600' : 'text-amber-600'}`}>
                ₹{totals.ReceivedAmount.toLocaleString()}
              </CardTitle>
              <Progress value={paymentProgress} indicatorClass={`rounded-full ${isFullyPaid ? 'bg-emerald-500' : 'bg-amber-500'}`}/>
              <p className="text-sm text-muted-foreground">
                {paymentProgress.toFixed(0)}% of total fees paid
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Balance Card */}
      <motion.div 
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="h-full border border-rose-100 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-900/10">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 text-rose-600 dark:text-rose-300">
              <AlertCircleIcon className="w-4 h-4" />
              {isFullyPaid ? 'Fully Paid' : 'Pending Amount'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardTitle className={`text-2xl font-bold ${isFullyPaid ? 'text-emerald-600' : 'text-rose-600'}`}>
              {isFullyPaid ? (
                <span className="flex items-center gap-1">
                  <CheckCircleIcon className="w-5 h-5" />
                  ₹0
                </span>
              ) : (
                `₹${totals.BalanceAmount.toLocaleString()}`
              )}
            </CardTitle>
            {totals.SecurityAdjusted > 0 && (
              <div className="mt-2 text-sm">
                <span className="text-muted-foreground">Security adjusted: </span>
                <span className="text-emerald-600">₹{totals.SecurityAdjusted.toLocaleString()}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default FeeSubmissions;
