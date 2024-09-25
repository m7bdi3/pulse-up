"use client";
import React, { useEffect, useState } from "react";
import { UserAction } from "@/components/main/userAction";
import { motion } from "framer-motion";
import { ModeToggle } from "@/components/darkToggle";

export const NavbarActions = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      className="ml-auto flex items-center gap-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <ModeToggle />
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <UserAction />
      </motion.div>
    </motion.div>
  );
};
