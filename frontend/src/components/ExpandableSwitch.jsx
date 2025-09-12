"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GraduationCap, TreePine } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "../stores/useAuthStore";
import { useCookieStore } from "../stores/useCookieStore";

const campuss = [
  { name: "Deemed", value: "deemed", icon: GraduationCap },
  { name: "Hill", value: "hill", icon: TreePine },
];

const ExpandableSwitch = () => {
  const { getCaptcha } = useAuthStore();
 const { campus: activeCampus, setcampus } = useCookieStore();

  // Call captcha only when user switches (not on first render)
  useEffect(() => {
    getCaptcha();
  }, [activeCampus]);

  return (
    <div className="w-full max-w-md">
      <div className="flex gap-2 rounded-xl p-1 border bg-muted/50">
        {campuss.map(({ icon: Icon, name, value }) => {
          const isActive = activeCampus === value;
          return (
            <motion.div
              key={value}
              layout
              className={cn(
                "flex h-8 items-center bg-muted justify-center overflow-hidden rounded-md cursor-pointer transition-colors",
                isActive ? "flex-1" : "flex-none"
              )}
              onClick={() => setcampus(value)}
              initial={false}
              animate={{ width: isActive ? 120 : 36 }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <motion.div
                className="flex h-8 w-full items-center gap-2 px-2"
                animate={{ filter: "blur(0px)" }}
                exit={{ filter: "blur(2px)" }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <Icon className="aspect-square size-4 flex-shrink-0" />
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.span
                      className="font-medium whitespace-nowrap"
                      initial={{ opacity: 0, scaleX: 0.8 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      style={{ originX: 0 }}
                    >
                      {name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpandableSwitch;
