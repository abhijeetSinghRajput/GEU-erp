import { Badge } from "@/components/ui/badge";
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
import { ChevronDown, HomeIcon } from "lucide-react";
import React from "react";
import DataTable from "../table/DataTable";

const HostelFee = ({
  data,
  totals,
  columns,
  visibleColumns,
  hasHostelFees = false,
}) => {
  return (
    <Card className="rounded-2xl overflow-hidden">
      <CardHeader className="bg-muted">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Hostel Fee Details</CardTitle>
            <CardDescription>Accommodation and meal charges</CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge
              variant={totals.BalanceAmount > 0 ? "destructive" : "success"}
            >
              {totals.BalanceAmount > 0 ? "Pending" : "Paid"}
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
      <CardContent className="p-0">
        {hasHostelFees ? (
          <div className="space-y-6">
            <DataTable
              data={data}
              columns={columns}
              visibleColumns={visibleColumns}
              footerData={{
                FeeHead: "Total",
                DueAmount: totals.DueAmount,
                ReceivedAmount: totals.ReceivedAmount,
                BalanceAmount: totals.BalanceAmount,
                status: totals.BalanceAmount > 0 ? "Pending" : "Paid",
              }}
              numericColumns={["DueAmount", "ReceivedAmount", "BalanceAmount"]}
              statusConfig={{
                accessor: "status",
                validator: (row) => {
                  return row.BalanceAmount > 0
                    ? { value: "Pending", variant: "destructive" }
                    : { value: "Paid", variant: "success" };
                },
              }}
            />
          </div>
        ) : (
          <div className="flex h-[60vh] flex-col items-center justify-center py-12">
            <HomeIcon className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-1">No Hostel Fees Found</h3>
            <p className="text-muted-foreground text-center max-w-md">
              You don't have any hostel fees in your account records.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HostelFee;
