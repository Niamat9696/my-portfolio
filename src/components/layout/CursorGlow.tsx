"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label";
const FINE_POINTER = "(hover: hover) and (pointer: fine)";

function subscribeFinePointer(callback: () => void) {
  const query = window.matchMedia(FINE_POINTER);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

/**
 * A soft gradient light that follows the pointer. The system cursor stays as
 * is (spec §27); this only adds a large, faint spotlight behind the content
 * and a small halo that brightens over interactive elements.
 * Mouse/trackpad only, and disabled for prefers-reduced-motion.
 */
export function CursorGlow() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const finePointer = useSyncExternalStore(
    subscribeFinePointer,
    () => window.matchMedia(FINE_POINTER).matches,
    () => false,
  );
  const spotlightRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  const enabled = finePointer && !prefersReducedMotion;

  useEffect(() => {
    if (!enabled) return;
    const spotlight = spotlightRef.current;
    const halo = haloRef.current;
    if (!spotlight || !halo) return;

    let frame = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;
    let haloX = targetX;
    let haloY = targetY;
    let spotX = targetX;
    let spotY = targetY;
    let overInteractive = false;
    let haloScale = 1;

    const render = () => {
      // Eased follow: the halo trails slightly, the spotlight drifts behind it.
      haloX += (targetX - haloX) * 0.35;
      haloY += (targetY - haloY) * 0.35;
      spotX += (targetX - spotX) * 0.12;
      spotY += (targetY - spotY) * 0.12;
      haloScale += ((overInteractive ? 1.8 : 1) - haloScale) * 0.2;
      halo.style.transform = `translate3d(${haloX}px, ${haloY}px, 0) translate(-50%, -50%) scale(${haloScale})`;
      spotlight.style.transform = `translate3d(${spotX}px, ${spotY}px, 0) translate(-50%, -50%)`;

      const settled =
        Math.abs(targetX - spotX) < 0.5 &&
        Math.abs(targetY - spotY) < 0.5 &&
        Math.abs((overInteractive ? 1.8 : 1) - haloScale) < 0.01;
      frame = settled ? 0 : requestAnimationFrame(render);
    };

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      targetX = event.clientX;
      targetY = event.clientY;
      overInteractive = event.target instanceof Element && event.target.closest(INTERACTIVE) !== null;
      halo.style.opacity = overInteractive ? "1" : "0.7";
      spotlight.style.opacity = "1";
      if (!frame) frame = requestAnimationFrame(render);
    };

    const handleLeave = () => {
      halo.style.opacity = "0";
      spotlight.style.opacity = "0";
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handleLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-60 overflow-hidden">
      <div
        ref={spotlightRef}
        className="absolute left-0 top-0 h-[560px] w-[560px] rounded-full opacity-0 mix-blend-screen transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle, rgb(59 130 246 / 0.14) 0%, rgb(124 58 237 / 0.08) 35%, transparent 68%)",
        }}
      />
      <div
        ref={haloRef}
        className="absolute left-0 top-0 h-10 w-10 rounded-full opacity-0 mix-blend-screen transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle, rgb(34 211 238 / 0.45) 0%, rgb(59 130 246 / 0.22) 45%, transparent 72%)",
        }}
      />
    </div>
  );
}
