import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { InfoIcon, CreditCardIcon, HomeIcon, FileTextIcon, IndianRupee } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const feeSubmitions = {
  headdata: [
    {
      FeeHeadID: 95,
      LID: 56275,
      IsSeparate: true,
      IsFine: true,
      IsHostel: 0,
      IsRegistration: false,
      IsTuitionFee: false,
      IsSociety: false,
      FeeHead: "PREVIOUS MAIN FEE FINE",
      DueAmount: 1800,
      ReceivedAmount: 1800,
      RefundAmount: 0,
      BalanceAmount: 0,
      DepositAmount: 0,
      PreExcess: 0,
      SCAmount: 0,
      NetDues: 1800,
      YearSem: 2,
      FeeHeadPriority: 0,
      FeeSYID: 28,
      YS: "2nd yr",
      ExcessFeeAmount: 0,
      BookID: 10,
      SecurityAdjusted: 3000,
      FineAmount: 0,
    },
    {
      FeeHeadID: 5,
      LID: 56210,
      IsSeparate: false,
      IsFine: false,
      IsHostel: 0,
      IsRegistration: false,
      IsTuitionFee: false,
      IsSociety: false,
      FeeHead: "Examination Fee",
      DueAmount: 9000,
      ReceivedAmount: 9000,
      RefundAmount: 0,
      BalanceAmount: 0,
      DepositAmount: 0,
      PreExcess: 0,
      SCAmount: 0,
      NetDues: 9000,
      YearSem: 2,
      FeeHeadPriority: 5,
      FeeSYID: 28,
      YS: "2nd yr",
      ExcessFeeAmount: 0,
      BookID: 10,
      SecurityAdjusted: 3000,
      FineAmount: 0,
    },
    {
      FeeHeadID: 6,
      LID: 56213,
      IsSeparate: false,
      IsFine: false,
      IsHostel: 0,
      IsRegistration: false,
      IsTuitionFee: false,
      IsSociety: false,
      FeeHead: "Library Fee",
      DueAmount: 5000,
      ReceivedAmount: 5000,
      RefundAmount: 0,
      BalanceAmount: 0,
      DepositAmount: 0,
      PreExcess: 0,
      SCAmount: 0,
      NetDues: 5000,
      YearSem: 2,
      FeeHeadPriority: 6,
      FeeSYID: 28,
      YS: "2nd yr",
      ExcessFeeAmount: 0,
      BookID: 10,
      SecurityAdjusted: 3000,
      FineAmount: 0,
    },
    {
      FeeHeadID: 7,
      LID: 56212,
      IsSeparate: false,
      IsFine: false,
      IsHostel: 0,
      IsRegistration: false,
      IsTuitionFee: false,
      IsSociety: false,
      FeeHead: "Insurance Cover",
      DueAmount: 1000,
      ReceivedAmount: 1000,
      RefundAmount: 0,
      BalanceAmount: 0,
      DepositAmount: 0,
      PreExcess: 0,
      SCAmount: 0,
      NetDues: 1000,
      YearSem: 2,
      FeeHeadPriority: 7,
      FeeSYID: 28,
      YS: "2nd yr",
      ExcessFeeAmount: 0,
      BookID: 10,
      SecurityAdjusted: 3000,
      FineAmount: 0,
    },
    {
      FeeHeadID: 8,
      LID: 56219,
      IsSeparate: false,
      IsFine: false,
      IsHostel: 0,
      IsRegistration: false,
      IsTuitionFee: false,
      IsSociety: false,
      FeeHead: "Student Welfare Fee",
      DueAmount: 1500,
      ReceivedAmount: 1500,
      RefundAmount: 0,
      BalanceAmount: 0,
      DepositAmount: 0,
      PreExcess: 0,
      SCAmount: 0,
      NetDues: 1500,
      YearSem: 2,
      FeeHeadPriority: 8,
      FeeSYID: 28,
      YS: "2nd yr",
      ExcessFeeAmount: 0,
      BookID: 10,
      SecurityAdjusted: 3000,
      FineAmount: 0,
    },
    {
      FeeHeadID: 9,
      LID: 56218,
      IsSeparate: false,
      IsFine: false,
      IsHostel: 0,
      IsRegistration: false,
      IsTuitionFee: false,
      IsSociety: false,
      FeeHead: "Sport Fee",
      DueAmount: 1000,
      ReceivedAmount: 1000,
      RefundAmount: 0,
      BalanceAmount: 0,
      DepositAmount: 0,
      PreExcess: 0,
      SCAmount: 0,
      NetDues: 1000,
      YearSem: 2,
      FeeHeadPriority: 9,
      FeeSYID: 28,
      YS: "2nd yr",
      ExcessFeeAmount: 0,
      BookID: 10,
      SecurityAdjusted: 3000,
      FineAmount: 0,
    },
    {
      FeeHeadID: 10,
      LID: 56215,
      IsSeparate: false,
      IsFine: false,
      IsHostel: 0,
      IsRegistration: false,
      IsTuitionFee: false,
      IsSociety: false,
      FeeHead: "Online",
      DueAmount: 1000,
      ReceivedAmount: 1000,
      RefundAmount: 0,
      BalanceAmount: 0,
      DepositAmount: 0,
      PreExcess: 0,
      SCAmount: 0,
      NetDues: 1000,
      YearSem: 2,
      FeeHeadPriority: 10,
      FeeSYID: 28,
      YS: "2nd yr",
      ExcessFeeAmount: 0,
      BookID: 10,
      SecurityAdjusted: 3000,
      FineAmount: 0,
    },
    {
      FeeHeadID: 11,
      LID: 56221,
      IsSeparate: false,
      IsFine: false,
      IsHostel: 0,
      IsRegistration: false,
      IsTuitionFee: false,
      IsSociety: false,
      FeeHead: "Transport Fee",
      DueAmount: 3300,
      ReceivedAmount: 3300,
      RefundAmount: 0,
      BalanceAmount: 0,
      DepositAmount: 0,
      PreExcess: 0,
      SCAmount: 0,
      NetDues: 3300,
      YearSem: 2,
      FeeHeadPriority: 11,
      FeeSYID: 28,
      YS: "2nd yr",
      ExcessFeeAmount: 0,
      BookID: 10,
      SecurityAdjusted: 3000,
      FineAmount: 0,
    },
    {
      FeeHeadID: 12,
      LID: 56216,
      IsSeparate: false,
      IsFine: false,
      IsHostel: 0,
      IsRegistration: false,
      IsTuitionFee: false,
      IsSociety: false,
      FeeHead: "PDP",
      DueAmount: 2600,
      ReceivedAmount: 2600,
      RefundAmount: 0,
      BalanceAmount: 0,
      DepositAmount: 0,
      PreExcess: 0,
      SCAmount: 0,
      NetDues: 2600,
      YearSem: 2,
      FeeHeadPriority: 12,
      FeeSYID: 28,
      YS: "2nd yr",
      ExcessFeeAmount: 0,
      BookID: 10,
      SecurityAdjusted: 3000,
      FineAmount: 0,
    },
    {
      FeeHeadID: 15,
      LID: 56208,
      IsSeparate: false,
      IsFine: false,
      IsHostel: 0,
      IsRegistration: false,
      IsTuitionFee: false,
      IsSociety: false,
      FeeHead: "Degree Fee",
      DueAmount: 1500,
      ReceivedAmount: 1500,
      RefundAmount: 0,
      BalanceAmount: 0,
      DepositAmount: 0,
      PreExcess: 0,
      SCAmount: 0,
      NetDues: 1500,
      YearSem: 2,
      FeeHeadPriority: 15,
      FeeSYID: 28,
      YS: "2nd yr",
      ExcessFeeAmount: 0,
      BookID: 10,
      SecurityAdjusted: 3000,
      FineAmount: 0,
    },
    {
      FeeHeadID: 18,
      LID: 56214,
      IsSeparate: false,
      IsFine: false,
      IsHostel: 0,
      IsRegistration: false,
      IsTuitionFee: false,
      IsSociety: false,
      FeeHead: "Memoriable Charges",
      DueAmount: 1500,
      ReceivedAmount: 1500,
      RefundAmount: 0,
      BalanceAmount: 0,
      DepositAmount: 0,
      PreExcess: 0,
      SCAmount: 0,
      NetDues: 1500,
      YearSem: 2,
      FeeHeadPriority: 18,
      FeeSYID: 28,
      YS: "2nd yr",
      ExcessFeeAmount: 0,
      BookID: 10,
      SecurityAdjusted: 3000,
      FineAmount: 0,
    },
    {
      FeeHeadID: 16,
      LID: 56206,
      IsSeparate: false,
      IsFine: false,
      IsHostel: 0,
      IsRegistration: false,
      IsTuitionFee: false,
      IsSociety: false,
      FeeHead: "Alumni Fee",
      DueAmount: 3000,
      ReceivedAmount: 3000,
      RefundAmount: 0,
      BalanceAmount: 0,
      DepositAmount: 0,
      PreExcess: 0,
      SCAmount: 0,
      NetDues: 3000,
      YearSem: 2,
      FeeHeadPriority: 100,
      FeeSYID: 28,
      YS: "2nd yr",
      ExcessFeeAmount: 0,
      BookID: 10,
      SecurityAdjusted: 3000,
      FineAmount: 0,
    },
    {
      FeeHeadID: 1,
      LID: 56223,
      IsSeparate: false,
      IsFine: false,
      IsHostel: 0,
      IsRegistration: false,
      IsTuitionFee: true,
      IsSociety: false,
      FeeHead: "Tution Fee",
      DueAmount: 168000,
      ReceivedAmount: 134900,
      RefundAmount: 0,
      BalanceAmount: 0,
      DepositAmount: 0,
      PreExcess: 0,
      SCAmount: 33100,
      NetDues: 134900,
      YearSem: 2,
      FeeHeadPriority: 156,
      FeeSYID: 28,
      YS: "2nd yr",
      ExcessFeeAmount: 0,
      BookID: 10,
      SecurityAdjusted: 3000,
      FineAmount: 0,
    },
  ],
  headdatahostel: [],
  totaldue: "0",
  totalreceive: "0",
  totalbalance: "0",
  adjust: "0",
  excessfee: "0",
  scholarshipSem: 0,
};


const FeeSubmissions = () => {
  // Calculate totals from the provided data structure
  const courseTotalDue = feeSubmitions.headdata.reduce((sum, item) => sum + item.DueAmount, 0);
  const courseTotalReceived = feeSubmitions.headdata.reduce((sum, item) => sum + item.ReceivedAmount, 0);
  const courseTotalBalance = feeSubmitions.headdata.reduce((sum, item) => sum + item.BalanceAmount, 0);
  const totalScholarship = feeSubmitions.headdata.reduce((sum, item) => sum + (item.SCAmount || 0), 0);
  const totalSecurityAdjusted = feeSubmitions.headdata.reduce((sum, item) => sum + (item.SecurityAdjusted || 0), 0);

  const hasHostelFees = feeSubmitions.headdatahostel.length > 0;

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Fee Submissions</h1>
        <p className="text-muted-foreground mb-6">
          View and manage your course and hostel fee payments
        </p>

        <Tabs defaultValue="course" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-xs">
            <TabsTrigger value="course">
              <FileTextIcon className="w-4 h-4 mr-2" />
              Course Fees
            </TabsTrigger>
            <TabsTrigger value="hostel">
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
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Course Fee Details</CardTitle>
                      <CardDescription>
                        {feeSubmitions.headdata[0]?.YS || 'Current Year'} Fee Breakdown
                      </CardDescription>
                    </div>
                    <Badge variant={courseTotalBalance > 0 ? "destructive" : "success"}>
                      {courseTotalBalance > 0 ? "Pending" : "Paid"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {feeSubmitions.headdata.length > 0 ? (
                    <div className="space-y-6">
                      <ScrollArea className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Fee Head</TableHead>
                              <TableHead className="text-right">Due (₹)</TableHead>
                              <TableHead className="text-right">Received (₹)</TableHead>
                              <TableHead className="text-right">Balance (₹)</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {feeSubmitions.headdata.map((fee) => (
                              <TableRow key={`${fee.FeeHeadID}-${fee.LID}`}>
                                <TableCell className="font-medium">{fee.FeeHead}</TableCell>
                                <TableCell className="text-right">{fee.DueAmount.toLocaleString()}</TableCell>
                                <TableCell className="text-right">{fee.ReceivedAmount.toLocaleString()}</TableCell>
                                <TableCell className="text-right">{fee.BalanceAmount.toLocaleString()}</TableCell>
                                <TableCell>
                                  <Badge variant={fee.BalanceAmount > 0 ? "destructive" : "success"}>
                                    {fee.BalanceAmount > 0 ? "Pending" : "Paid"}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardDescription>Total Due</CardDescription>
                            <CardTitle className="text-2xl">
                              ₹{courseTotalDue.toLocaleString()}
                            </CardTitle>
                          </CardHeader>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardDescription>Total Received</CardDescription>
                            <CardTitle className={`text-2xl ${courseTotalReceived === courseTotalDue ? 'text-green-600' : 'text-amber-600'}`}>
                              ₹{courseTotalReceived.toLocaleString()}
                            </CardTitle>
                          </CardHeader>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardDescription>Total Balance</CardDescription>
                            <CardTitle className={`text-2xl ${courseTotalBalance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                              ₹{courseTotalBalance.toLocaleString()}
                            </CardTitle>
                          </CardHeader>
                        </Card>
                      </div>
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
            </motion.div>
          </TabsContent>

          <TabsContent value="hostel">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Hostel Fee Details</CardTitle>
                  <CardDescription>
                    Accommodation and meal charges
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {hasHostelFees ? (
                    <div className="space-y-6">
                      {/* Hostel fee table would render here if data existed */}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
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
                      <span className="text-muted-foreground">Total Course Fees:</span>
                      <span>₹{courseTotalDue.toLocaleString()}</span>
                    </div>
                    {totalScholarship > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Scholarship Applied:</span>
                        <span className="text-green-600">-₹{totalScholarship.toLocaleString()}</span>
                      </div>
                    )}
                    {totalSecurityAdjusted > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Security Adjusted:</span>
                        <span className="text-green-600">-₹{totalSecurityAdjusted.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-medium">
                        <span>Total Amount Paid:</span>
                        <span>₹{courseTotalReceived.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeeSubmissions;
