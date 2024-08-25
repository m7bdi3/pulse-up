"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserAction } from "@/components/main/userAction";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { ModeToggle } from "@/components/darkToggle";
import { Searchbar } from "@/components/searchbar";

export const NavbarActions = () => {
  const { data } = useSession();
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
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:text-foreground"
            >
              <Searchbar />
              <span className="sr-only">Search</span>
            </Link>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="bottom">Search</TooltipContent>
      </Tooltip>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <ModeToggle />
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <UserAction />
      </motion.div>
    </motion.div>
  );
};
