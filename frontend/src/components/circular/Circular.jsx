"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { useNoticeStore } from "@/stores/useNoticeStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parse } from "date-fns";
import { Badge } from "../ui/badge";

const icons = {
  "Information Cell": { icon: "🗞️", color: "#1e86ff" },
  "Fee Cell": { icon: "💸", color: "#00c9a7" },
};

const formatDate = (dateString) => {
  try {
    // Parse the date string in dd/MM/yyyy format
    const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
    return format(parsedDate, "MMM dd, yyyy");
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString; // Return the original string if formatting fails
  }
};

const Circular = () => {
  const { circulars, isLoadingCirculars, getCirculars } = useNoticeStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getCirculars();
  }, []);

  // Automatically cycle through circulars
  useEffect(() => {
    if (circulars.length <= 3) return; // Don't animate if we don't have enough items

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % circulars.length);
    }, 5000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [circulars.length]);

  // Get the current 3 cards to display
  const visibleCirculars = useMemo(() => {
    if (circulars.length <= 3) return circulars;

    const items = [];
    for (let i = 0; i < 3; i++) {
      const circular = circulars[(currentIndex + i) % circulars.length];
      if (circular) items.push(circular);
    }
    return items;
  }, [currentIndex, circulars]);

  if (isLoadingCirculars) {
    return <div>Loading circulars...</div>;
  }

  if (!circulars || circulars.length === 0) {
    return <div>No circulars available</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto p-6">
        <div>
            <h2 className="text-xl font-semibold">Notices </h2>
        </div>
      <div className="relative min-h-[500px] h-full w-full overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <AnimatePresence mode="popLayout">
            {visibleCirculars.map((circular, index) => (
              <motion.div
                key={circular.CirID || index}
                layout
                initial={{
                  opacity: 0,
                  y: 50,
                  scale: 0.9,
                  filter: "blur(2px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: {
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: -50,
                  scale: 0.9,
                  filter: "blur(2px)",
                  transition: {
                    duration: 0.3,
                  },
                }}
                className={cn(
                  "w-full",
                  index === 0
                    ? "z-30"
                    : index === 1
                    ? "z-20 opacity-90"
                    : "z-10 opacity-70"
                )}
                style={{
                  transformOrigin: "top center",
                }}
              >
                <Card className="w-full rounded-3xl shadow-lg">
                  <CardHeader className="flex pb-4 gap-2 flex-row items-start">
                    <div
                      className="aspect-square size-14 rounded-2xl text-3xl flex items-center justify-center"
                      style={{
                        background:
                          icons[circular.ByDepartment]?.color || "#ffb800",
                      }}
                    >
                      {icons[circular.ByDepartment]?.icon || "📢"}
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="line-clamp-2 text-lg">
                        {circular.Subject}
                      </CardTitle>
                      <div className="text-sm flex gap-2 text-muted-foreground">
                        {formatDate(circular.DateFrom)}
                        <Badge variant="secondary">{circular.ByDepartment}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="line-clamp-3 text-sm text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: circular.Notice }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Circular;
