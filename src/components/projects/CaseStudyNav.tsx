"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface CaseStudyNavProps {
  label: string;
  heading: string;
  sections: { id: string; label: string }[];
}

/** Viewport line (from the top) a section must cross to become active. */
const ACTIVATION_RATIO = 0.35;

/**
 * Sticky "On this page" navigation for case studies. Tracks the section in
 * view, highlights it with gradient text and a sliding gradient rail
 * indicator, and gives every item a hover state.
 */
export function CaseStudyNav({ label, heading, sections }: CaseStudyNavProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState(sections[0]?.id ?? null);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActiveId(elements[elements.length - 1].id);
        return;
      }
      const line = window.innerHeight * ACTIVATION_RATIO;
      let current = elements[0].id;
      for (const element of elements) {
        if (element.getBoundingClientRect().top <= line) current = element.id;
      }
      setActiveId(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sections]);

  return (
    <nav aria-label={label} className="sticky top-28">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-secondary/60">
        {heading}
      </p>
      <ol className="relative mt-5 space-y-1 border-l border-white/10">
        {sections.map((section, index) => {
          const isActive = section.id === activeId;
          return (
            <li key={section.id} className="relative">
              {isActive && (
                <motion.span
                  layoutId="case-study-nav-indicator"
                  aria-hidden="true"
                  className="absolute -left-px inset-y-1 w-0.5 rounded-full bg-gradient-logo-dot shadow-[0_0_10px_rgba(236,72,153,0.55),0_0_14px_rgba(34,211,238,0.45)]"
                  transition={
                    prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }
                  }
                />
              )}
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "location" : undefined}
                onClick={() => setActiveId(section.id)}
                className={`group relative ml-2 flex items-center gap-3 rounded-lg py-2 pl-3 pr-2 text-sm transition-all duration-200 hover:translate-x-1 hover:bg-white/[0.035] hover:text-foreground ${
                  isActive
                    ? "bg-white/[0.045] font-medium text-foreground"
                    : "text-foreground-secondary"
                }`}
              >
                {/* Faint gradient rail segment on hover for inactive items. */}
                {!isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -left-[9px] inset-y-2 w-px origin-center scale-y-0 bg-gradient-logo-dot opacity-70 transition-transform duration-200 group-hover:scale-y-100"
                  />
                )}
                <span
                  className={`font-mono text-[9px] transition-colors duration-200 ${
                    isActive
                      ? "text-gradient-logo"
                      : "text-foreground-secondary/45 group-hover:text-foreground-secondary"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={isActive ? "text-gradient-logo" : undefined}>{section.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
