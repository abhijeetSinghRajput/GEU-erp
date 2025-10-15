"use client";

import { cn, formatRelativeDate } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { useNoticeStore } from "@/stores/useNoticeStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import CircularSkeleton from "./CircularSkeleton";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Search, X } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import CircularError from "./CircularError";
import { Skeleton } from "../ui/skeleton";

const icons = {
  "Information Cell": { icon: "🗞️", color: "#1e86ff" },
  "Fee Cell": { icon: "💸", color: "#00c9a7" },
  "Examination Cell": { icon: "🎓", color: "#f9a825" },
};

// Helper function to parse date from DD/MM/YYYY format
const parseDate = (dateString) => {
  if (!dateString) return new Date(0);
  const [day, month, year] = dateString.split("/");
  return new Date(year, month - 1, day);
};

const CircularDetailsDrawer = () => {
  const { isLoadingCircularDetails, allCirculars, getAllCirculars } =
    useNoticeStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Automatically cycle through circulars
  useEffect(() => {
    if (allCirculars.length <= 3) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allCirculars.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [allCirculars.length]);

  const visibleCirculars = useMemo(() => {
    if (allCirculars.length <= 3) return allCirculars;

    const items = [];
    for (let i = 0; i < 3; i++) {
      const circular = allCirculars[(currentIndex + i) % allCirculars.length];
      if (circular) items.push(circular);
    }
    return items;
  }, [currentIndex, allCirculars]);

  const filteredAndSortedCirculars = useMemo(() => {
    let result = [...allCirculars];

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((circular) => {
        const subject = circular.Subject?.toLowerCase() || "";
        const notice = circular.Notice?.toLowerCase() || "";
        const employeeName = circular.EmployeeName?.toLowerCase().trim() || "";
        
        return (
          subject.includes(term) ||
          notice.includes(term) ||
          employeeName.includes(term)
        );
      });
    }

    // Sort
    switch (sortOption) {
      case "newest":
        result.sort((a, b) => {
          const dateA = parseDate(a.DateFrom);
          const dateB = parseDate(b.DateFrom);
          return dateB.getTime() - dateA.getTime();
        });
        break;
      case "oldest":
        result.sort((a, b) => {
          const dateA = parseDate(a.DateFrom);
          const dateB = parseDate(b.DateFrom);
          return dateA.getTime() - dateB.getTime();
        });
        break;
      case "department":
        result.sort((a, b) => {
          const deptA = (a.ByDepartment || "").trim();
          const deptB = (b.ByDepartment || "").trim();
          return deptA.localeCompare(deptB);
        });
        break;
    }

    return result;
  }, [allCirculars, searchTerm, sortOption]);

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <Button variant="secondary">View All Notices</Button>
      </DrawerTrigger>
      <DrawerContent className="h-[90vh]">
        <ScrollArea>
          <div className="max-w-screen-lg mx-auto px-2 sm:px-4 md:px-6 py-2">
            <DrawerHeader>
              <DrawerTitle className="text-2xl">
                All Notices & Circulars
              </DrawerTitle>
            </DrawerHeader>

            <div className="flex flex-col sm:flex-row gap-4 mb-6 sticky p-4 top-0 bg-background z-10">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notices..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                    onClick={() => setSearchTerm("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Select
                value={sortOption}
                onValueChange={(value) => setSortOption(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="department">By Department</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {isLoadingCircularDetails ? (
                <div className="space-y-4">
                  {[...Array(12)].map((_, idx) => (
                    <Card key={idx} className="w-full rounded-3xl shadow-lg">
                      <CardHeader className="flex pb-4 gap-2 flex-row items-start">
                        <Skeleton className="aspect-square size-14 rounded-2xl"></Skeleton>
                        <div className="space-y-1 w-full">
                          <Skeleton className="h-7 max-w-[280px]" />
                          <Skeleton className={"h-5 max-w-[150px]"} />
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-1">
                        <Skeleton className={"h-5 w-full"} />
                        <Skeleton className={"h-5 max-w-28"} />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : !allCirculars.length ? (
                <CircularError onReload={getAllCirculars} />
              ) : filteredAndSortedCirculars.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No notices found matching your criteria
                </div>
              ) : (
                filteredAndSortedCirculars.map((circular) => (
                  <motion.div
                    key={circular.CirID}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="w-full rounded-3xl">
                      <CardHeader className="flex pb-4 gap-2 flex-row items-start">
                        <div
                          className="aspect-square size-12 rounded-xl text-2xl flex items-center justify-center"
                          style={{
                            background:
                              icons[circular.ByDepartment]?.color || "#ffb800",
                          }}
                        >
                          {icons[circular.ByDepartment]?.icon || "📢"}
                        </div>
                        <div className="space-y-1 flex-1">
                          <CardTitle className="line-clamp-2">
                            {circular.Subject}
                          </CardTitle>
                          <div className="text-sm flex gap-2 flex-wrap text-muted-foreground">
                            <span>{formatRelativeDate(circular.DateFrom)}</span>
                            <Badge variant="secondary">
                              {circular.EmployeeName?.trim()}
                            </Badge>
                            {circular.DateTo && (
                              <Badge
                                variant="border"
                                className={"text-foreground"}
                              >
                                Valid until: {circular.DateTo}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div
                          className="prose prose-sm max-w-none text-muted-foreground"
                          dangerouslySetInnerHTML={{
                            __html: (() => {
                              try {
                                const decoded = decodeURIComponent(
                                  circular.Notice
                                );
                                return decoded.replace(/\n/g, "<br />");
                              } catch {
                                return circular.Notice.replace(/\n/g, "<br />");
                              }
                            })(),
                          }}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default CircularDetailsDrawer;