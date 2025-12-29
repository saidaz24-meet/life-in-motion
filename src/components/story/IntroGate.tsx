import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { INTRO_GATE } from "../../content/intro";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { clsx } from "clsx";

interface IntroGateProps {
  onComplete: () => void;
  onSkip: () => void;
}

export default function IntroGate({ onComplete, onSkip }: IntroGateProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Focus button for accessibility on mount
  useEffect(() => {
    setTimeout(() => {
      buttonRef.current?.focus();
    }, 100);
  }, []);

  // Handle ESC key to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onSkip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSkip]);

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { opacity: 0 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1 }}
      exit={prefersReducedMotion ? undefined : { opacity: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: "easeOut",
      }}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-[rgb(var(--bg-0))]"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome"
    >
          {/* Subtle noise overlay for texture */}
          <div className="absolute inset-0 noise-overlay opacity-[0.02]" aria-hidden="true" />


          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.95, y: 20 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.8,
              ease: [0.4, 0, 0.2, 1],
              delay: prefersReducedMotion ? 0 : 0.2,
            }}
            className="text-center px-6 max-w-2xl relative z-10"
          >
            <motion.h1
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.6,
                delay: prefersReducedMotion ? 0 : 0.4,
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[rgb(var(--fg-0))] mb-4"
            >
              {INTRO_GATE.title}
            </motion.h1>

            <motion.p
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.6,
                delay: prefersReducedMotion ? 0 : 0.5,
              }}
              className="text-lg md:text-xl text-[rgb(var(--fg-1))] mb-10"
            >
              {INTRO_GATE.subtitle}
            </motion.p>

            <motion.button
              ref={buttonRef}
              initial={prefersReducedMotion ? undefined : { opacity: 0 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.6,
                delay: prefersReducedMotion ? 0 : 0.6,
              }}
              onClick={onComplete}
              onKeyDown={(e) => {
                // Handle Enter and Space
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onComplete();
                }
              }}
              className={clsx(
                "px-6 py-3 rounded-md transition-all duration-200 ease-out",
                "bg-white/5 hover:bg-white/10 active:bg-white/15",
                "border border-white/10 hover:border-white/20",
                "text-[rgb(var(--fg-0))]",
                "hover:-translate-y-0.5 active:translate-y-0",
                "hover:shadow-[0_4px_12px_rgba(120,220,255,0.15)]",
                "focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-[rgb(var(--bg-0))]",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              aria-label="Continue to story"
            >
              {INTRO_GATE.continueButton}
            </motion.button>

            {/* Keyboard hint for accessibility */}
            <motion.p
              initial={prefersReducedMotion ? undefined : { opacity: 0 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.6,
                delay: prefersReducedMotion ? 0 : 0.8,
              }}
              className="mt-6 text-xs text-[rgb(var(--fg-1))] opacity-60"
            >
              Press <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[rgb(var(--fg-1))]">ESC</kbd> to skip
            </motion.p>
          </motion.div>
        </motion.div>
  );
}

