import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button"; // Assuming you're using shadcn/ui
import { RefreshCw } from "lucide-react";
import Header from "../Header";

const NoInternet = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br flex flex-col items-center justify-center p-8 text-center"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        }}
      >
        <img
          src="/no-internet.png"
          alt="No internet connection"
          className="w-52 h-52 object-contain mx-auto mb-8"
        />
      </motion.div>

      <div className="max-w-2xl space-y-6">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold"
        >
          Connection Lost
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-center max-w-[400px]"
        >
          Oops! It seems you're not connected to the internet. Please check your
          network connection and try again.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button onClick={handleRetry}>
            <RefreshCw />
            Retry Connection
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NoInternet;
