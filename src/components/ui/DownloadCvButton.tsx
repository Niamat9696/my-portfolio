"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Download } from "lucide-react";
import { Button, type ButtonVariant } from "@/components/ui/Button";
import { CV_FILENAME, CV_PATH } from "@/constants/site";
import { withBasePath } from "@/lib/base-path";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface DownloadCvButtonProps {
  label: string;
  startedLabel: string;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
}

const FEEDBACK_MS = 2200;

/**
 * Download CV button with a light sweep on hover, a nudging download arrow,
 * and a brief "downloading" check state after it's clicked.
 */
export function DownloadCvButton({
  label,
  startedLabel,
  variant = "primary",
  className = "",
  onClick,
}: DownloadCvButtonProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const timeout = window.setTimeout(() => setStarted(false), FEEDBACK_MS);
    return () => window.clearTimeout(timeout);
  }, [started]);

  const swap = prefersReducedMotion
    ? { initial: false as const, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 8, scale: 0.8 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -8, scale: 0.8 },
      };

  return (
    <Button
      href={withBasePath(CV_PATH)}
      download={CV_FILENAME}
      variant={variant}
      className={`btn-shine group ${className}`}
      aria-live="polite"
      onClick={() => {
        setStarted(true);
        onClick?.();
      }}
    >
      <span className="relative grid h-4 w-4 place-items-center overflow-hidden" aria-hidden="true">
        <AnimatePresence mode="popLayout" initial={false}>
          {started ? (
            <motion.span key="done" {...swap} transition={{ duration: 0.25, ease: "easeOut" }}>
              <Check className="h-4 w-4 text-white" />
            </motion.span>
          ) : (
            <motion.span key="idle" {...swap} transition={{ duration: 0.25, ease: "easeOut" }}>
              <Download className="animate-nudge-on-hover h-4 w-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span>{started ? startedLabel : label}</span>
    </Button>
  );
}
