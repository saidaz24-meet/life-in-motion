/**
 * RecapTimeline - Horizontal timeline band component (Cursor recap style)
 * 
 * Features:
 * - Wide horizontal region (~30-40% viewport height) with many thin vertical bars
 * - Bars are mostly faint (low opacity), with a few highlighted bars for milestones
 * - Current focus bar is brighter and slightly thicker
 * - Above focused bar: small label with date and milestone title
 * - Bottom-left: two small round buttons (prev/next)
 * - Focus bar moves with prev/next, animating smoothly
 * - Keyboard support: left/right arrows change focus
 * - Hover: hovering a bar shows the label and sets focus
 */

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clsx } from "clsx";
import { RECAP_MILESTONES, type RecapMilestone } from "../../content/recapTimeline";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface RecapTimelineProps {
  className?: string;
}

export default function RecapTimeline({ className }: RecapTimelineProps) {
  const prefersReducedMotion = useReducedMotion();
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const milestones = RECAP_MILESTONES;
  const totalMilestones = milestones.length;

  // Generate bars - we'll create more bars than milestones for a dense timeline effect
  // Each milestone gets a milestone bar, plus we add some filler bars between them
  const generateBars = () => {
    const bars: Array<{ milestone: RecapMilestone | null; index: number; isMilestone: boolean }> = [];
    let barIndex = 0;

    milestones.forEach((milestone, milestoneIndex) => {
      // Add some filler bars before the milestone (except for first milestone)
      if (milestoneIndex > 0) {
        const fillerCount = 3; // 3 filler bars between milestones
        for (let i = 0; i < fillerCount; i++) {
          bars.push({ milestone: null, index: barIndex++, isMilestone: false });
        }
      }
      // Add the milestone bar
      bars.push({ milestone, index: barIndex++, isMilestone: true });
    });

    return bars;
  };

  const bars = generateBars();

  // Navigate to previous milestone
  const goToPrevious = () => {
    if (focusedIndex > 0) {
      setFocusedIndex(focusedIndex - 1);
    }
  };

  // Navigate to next milestone
  const goToNext = () => {
    if (focusedIndex < totalMilestones - 1) {
      setFocusedIndex(focusedIndex + 1);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setFocusedIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setFocusedIndex((prev) => Math.min(totalMilestones - 1, prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalMilestones]);

  // Handle bar hover - set focus to the milestone
  const handleBarHover = (bar: { milestone: RecapMilestone | null; index: number; isMilestone: boolean }) => {
    if (bar.milestone) {
      const milestoneIndex = milestones.indexOf(bar.milestone);
      if (milestoneIndex !== -1) {
        setFocusedIndex(milestoneIndex);
        setHoveredIndex(bar.index);
      }
    }
  };

  const handleBarLeave = () => {
    setHoveredIndex(null);
  };

  const focusedMilestone = milestones[focusedIndex];
  const focusedBar = bars.find((bar) => bar.milestone === focusedMilestone);

  return (
    <div className={clsx("relative w-full", className)} ref={containerRef}>
      {/* Timeline band container */}
      <div className="relative w-full" style={{ height: "clamp(200px, 35vh, 400px)" }}>
        {/* Bars container */}
        <div className="absolute inset-0 flex items-end justify-center gap-[2px] px-4">
          {bars.map((bar, index) => {
            const isFocused = bar.milestone === focusedMilestone;
            const isHovered = hoveredIndex === bar.index;
            const isMilestone = bar.isMilestone;

            // Bar height - use intensity for milestone bars, focused is tallest
            let barHeight = "20%";
            if (isMilestone && bar.milestone) {
              const baseHeight = 40 + bar.milestone.intensity * 30; // 40-70% base range
              barHeight = isFocused ? "85%" : `${baseHeight}%`;
            } else {
              barHeight = "20%";
            }

            // Bar opacity and width
            let baseOpacity = 0.15;
            let width = "2px";
            if (isMilestone) {
              baseOpacity = isFocused ? 1 : 0.4;
              width = isFocused ? "3px" : "2px";
            }

            return (
              <motion.div
                key={`bar-${index}`}
                initial={prefersReducedMotion ? undefined : { opacity: 0, scaleY: 0 }}
                animate={prefersReducedMotion ? undefined : { 
                  opacity: baseOpacity, 
                  scaleY: 1,
                }}
                transition={{
                  duration: prefersReducedMotion ? 0 : (isFocused ? 0.5 : 0.4),
                  delay: prefersReducedMotion ? 0 : (isFocused ? 0 : index * 0.015),
                  ease: isFocused ? [0.4, 0, 0.2, 1] : "easeOut",
                }}
                onMouseEnter={() => handleBarHover(bar)}
                onMouseLeave={handleBarLeave}
                className={clsx(
                  "relative cursor-pointer",
                  isFocused && "z-10",
                  isHovered && !isFocused && "z-5"
                )}
                style={{
                  width,
                  height: barHeight,
                  backgroundColor: isFocused
                    ? "rgb(var(--accent))"
                    : isMilestone
                    ? "rgb(var(--fg-0))"
                    : "rgb(var(--fg-1))",
                }}
              >
                {/* Hover tooltip for non-focused bars */}
                {isHovered && !isFocused && bar.milestone && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-md bg-black/80 backdrop-blur-sm border border-white/20 whitespace-nowrap pointer-events-none"
                  >
                    <div className="text-xs text-[rgb(var(--fg-0))] font-medium">
                      {bar.milestone.dateLabel} • {bar.milestone.title}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Focus label above focused bar */}
        {focusedBar && focusedMilestone && (
          <motion.div
            key={`label-${focusedIndex}`}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 6, x: 0 }}
            animate={prefersReducedMotion ? {} : { 
              opacity: 1, 
              y: 0,
              x: `${((bars.findIndex((bar) => bar.milestone === focusedMilestone) / Math.max(1, bars.length - 1)) * 100)}%`,
            }}
            transition={prefersReducedMotion ? {} : { 
              duration: 0.4, 
              ease: [0.4, 0, 0.2, 1],
            }}
            className="absolute top-0 text-center pointer-events-none"
            style={{
              left: prefersReducedMotion ? `${((bars.findIndex((bar) => bar.milestone === focusedMilestone) / Math.max(1, bars.length - 1)) * 100)}%` : "0%",
              transform: "translateX(-50%)",
            }}
          >
            <div className="px-3 py-1.5 rounded-md bg-black/60 backdrop-blur-sm border border-white/10">
              <div className="text-xs text-[rgb(var(--fg-1))] mb-0.5">{focusedMilestone.dateLabel}</div>
              <div className="text-sm font-medium text-[rgb(var(--fg-0))]">{focusedMilestone.title}</div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Navigation buttons - bottom-left (only show if not at edges) */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 z-20">
        {focusedIndex > 0 && (
          <button
            onClick={goToPrevious}
            className={clsx(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ease-out",
              "bg-white/10 hover:bg-white/15 active:bg-white/20",
              "border border-white/20 hover:border-white/30",
              "text-[rgb(var(--fg-0))]",
              "hover:-translate-y-0.5 active:translate-y-0",
              "hover:shadow-[0_2px_8px_rgba(120,220,255,0.1)]",
              "focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-transparent"
            )}
            aria-label="Previous milestone"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
        {focusedIndex < totalMilestones - 1 && (
          <button
            onClick={goToNext}
            className={clsx(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ease-out",
              "bg-white/10 hover:bg-white/15 active:bg-white/20",
              "border border-white/20 hover:border-white/30",
              "text-[rgb(var(--fg-0))]",
              "hover:-translate-y-0.5 active:translate-y-0",
              "hover:shadow-[0_2px_8px_rgba(120,220,255,0.1)]",
              "focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-transparent"
            )}
            aria-label="Next milestone"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

