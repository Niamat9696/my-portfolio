"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const CLICKABLE = "a, button, [role='button']";
const SPARK_COLORS = ["#22d3ee", "#60a5fa", "#3b82f6", "#ec4899", "#f472b6"];
const SPARK_COUNT = 8;

/**
 * Press feedback for every link and button: a gradient ring ripples out from
 * the click point and a few sparks scatter. Uses the Web Animations API on
 * transform/opacity only, and removes its nodes when done. Works for taps
 * too; disabled for prefers-reduced-motion.
 */
export function ClickEffects() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const layer = layerRef.current;
    if (!layer) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      if (!(event.target instanceof Element) || !event.target.closest(CLICKABLE)) return;

      const { clientX: x, clientY: y } = event;

      const ring = document.createElement("span");
      ring.className = "click-ring";
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;
      layer.appendChild(ring);
      ring
        .animate(
          [
            { transform: "translate(-50%, -50%) scale(0.2)", opacity: 0.9 },
            { transform: "translate(-50%, -50%) scale(1)", opacity: 0 },
          ],
          { duration: 550, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
        )
        .finished.finally(() => ring.remove());

      for (let index = 0; index < SPARK_COUNT; index += 1) {
        const spark = document.createElement("span");
        spark.className = "click-spark";
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;
        spark.style.color = SPARK_COLORS[index % SPARK_COLORS.length];
        layer.appendChild(spark);

        const angle = (index / SPARK_COUNT) * Math.PI * 2 + Math.random() * 0.4;
        const distance = 26 + Math.random() * 18;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        spark
          .animate(
            [
              { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
              { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0)`, opacity: 0 },
            ],
            { duration: 520 + Math.random() * 160, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
          )
          .finished.finally(() => spark.remove());
      }
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [prefersReducedMotion]);

  return <div ref={layerRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-70 overflow-hidden" />;
}
