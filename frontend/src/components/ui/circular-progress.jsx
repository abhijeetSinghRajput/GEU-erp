import React from "react";
import { motion } from "framer-motion";


const CircularProgress = ({
  size = 85,
  value,
  maxValue = 100,
  label,
  subLabel,
  strokeWidth = 10,
  showPercentage = true,
  animate = true,
}) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / maxValue, 1); // Ensure progress doesn't exceed 1
  const dashOffset = circumference * (1 - progress);

  // Calculate percentage if showPercentage is true
  const percentage = Math.round(progress * 100);

  // Animation variants
  const circleVariants = {
    hidden: { strokeDashoffset: circumference },
    visible: {
      strokeDashoffset: dashOffset,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={animate ? "hidden" : false}
          animate="visible"
          variants={animate ? circleVariants : undefined}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label ? (
          <span className="text-base font-bold">{label}</span>
        ) : showPercentage ? (
          <span className="text-base font-bold">{percentage}%</span>
        ) : null}
        {subLabel && (
          <span className="text-muted-foreground text-xs">{subLabel}</span>
        )}
      </div>
    </div>
  );
};

export default CircularProgress;