import React from "react";
import { Progress } from "../ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircleIcon,
  CheckCircleIcon,
  FileTextIcon,
  WalletIcon,
} from "lucide-react";
import { motion } from "framer-motion";

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
              <CardTitle
                className={`text-2xl font-bold ${
                  isFullyPaid ? "text-emerald-600" : "text-amber-600"
                }`}
              >
                ₹{totals.ReceivedAmount.toLocaleString()}
              </CardTitle>
              <Progress
                value={paymentProgress}
                indicatorClass={`rounded-full ${
                  isFullyPaid ? "bg-emerald-500" : "bg-amber-500"
                }`}
              />
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
              {isFullyPaid ? "Fully Paid" : "Pending Amount"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardTitle
              className={`text-2xl font-bold ${
                isFullyPaid ? "text-emerald-600" : "text-rose-600"
              }`}
            >
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
                <span className="text-muted-foreground">
                  Security adjusted:{" "}
                </span>
                <span className="text-emerald-600">
                  ₹{totals.SecurityAdjusted.toLocaleString()}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default FeeSummaryCards;
