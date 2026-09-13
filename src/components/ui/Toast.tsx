"use client";

import { AnimatePresence, motion } from "motion/react";

interface ToastProps {
  message: string;
  visible: boolean;
}

/** A small, accessible toast used for transient feedback (e.g. "Email copied"). */
export function Toast({ message, visible }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
    >
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground shadow-lg"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
