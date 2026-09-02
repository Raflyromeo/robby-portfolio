"use client";

import * as React from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

const DEFAULT_GREETINGS = [
  { text: "3" },
  { text: "2" },
  { text: "1" },
  { text: "Welcome to my portfolio." },
];

export function ArcRevealHero({
  greetings = DEFAULT_GREETINGS,
  greetingHold = 620,
  revealDuration = 1500,
  className,
  introClassName,
  greetingClassName,
  revealClassName,
  storageKey,
  children,
}) {
  const prefersReducedMotion = useReducedMotion();

  const [phase, setPhase] = React.useState("intro");
  const [index, setIndex] = React.useState(0);

  const progress = useMotionValue(0);
  const arcPath = useTransform(progress, (p) => {
    const edge = 110 - p * 140;
    const control = edge + 25;
    return `M 0 ${edge} Q 50 ${control} 100 ${edge} L 100 110 L 0 110 Z`;
  });

  React.useEffect(() => {
    if (prefersReducedMotion) {
      setPhase("done");
      return;
    }
    if (storageKey && typeof window !== "undefined") {
      try {
        if (window.sessionStorage.getItem(storageKey) === "done") {
          setPhase("done");
        }
      } catch {
      }
    }
  }, [prefersReducedMotion, storageKey]);

  React.useEffect(() => {
    if (phase !== "intro") return;
    const isLast = index >= greetings.length - 1;
    if (isLast) {
      const t = window.setTimeout(() => setPhase("reveal"), greetingHold + 220);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setIndex((i) => i + 1), greetingHold);
    return () => window.clearTimeout(t);
  }, [phase, index, greetingHold, greetings.length]);

  React.useEffect(() => {
    if (phase !== "reveal") return;
    const controls = animate(progress, 1, {
      duration: revealDuration / 1000,
      ease: [0.85, 0, 0.15, 1],
      onComplete: () => {
        if (storageKey && typeof window !== "undefined") {
          try {
            window.sessionStorage.setItem(storageKey, "done");
          } catch {
          }
        }
        setPhase("done");
      },
    });
    return () => controls.stop();
  }, [phase, progress, revealDuration, storageKey]);

  const showOverlay = phase !== "done";
  const current = greetings[Math.min(index, greetings.length - 1)];

  return (
    <section
      aria-label="Hero"
      className={cn(
        "relative isolate min-h-screen w-full overflow-hidden bg-[var(--bg)] text-[var(--text)]",
        className,
      )}
    >
      <div className={cn("relative z-0", revealClassName)}>{children}</div>

      <AnimatePresence>
        {showOverlay && (
          <motion.div
            key="arc-reveal-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
              "absolute inset-x-0 top-0 z-[1000] h-screen overflow-hidden bg-[var(--surface)]",
              introClassName,
            )}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {phase === "intro" && current && (
                  <motion.span
                    key={`${index}-${current.text}`}
                    lang={current.lang}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      "select-none px-6 text-center text-5xl font-semibold tracking-tight text-[var(--text)] sm:text-6xl md:text-7xl",
                      greetingClassName,
                    )}
                  >
                    {current.text}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              <motion.path d={arcPath} style={{ fill: "var(--bg)" }} />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ArcRevealHero;
