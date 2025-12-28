import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";
import { clsx } from "clsx";

interface KineticTextProps {
  headline: string;
  beats: string[];
  body: string;
  isActive: boolean;
  year: number;
  tags: string[];
}

const ANIMATION_DURATION = 0.6;
const ANIMATION_DELAY_STAGGER = 0.15;
const BLUR_AMOUNT = 8;

export default function KineticText({
  headline,
  beats,
  body,
  isActive,
  year,
  tags,
}: KineticTextProps) {
  const [visibleBeats, setVisibleBeats] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Reset when scene becomes active
  useEffect(() => {
    if (isActive) {
      setVisibleBeats(0);
      setIsExpanded(false);
      // Auto-reveal first beat after a short delay
      const timer = setTimeout(() => {
        setVisibleBeats(1);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setVisibleBeats(0);
      setIsExpanded(false);
    }
  }, [isActive]);

  const handleNextBeat = useCallback(() => {
    setVisibleBeats((prev) => {
      if (prev < beats.length) {
        return prev + 1;
      }
      return prev;
    });
  }, [beats.length]);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Keyboard support for revealing beats
  useEffect(() => {
    if (!isActive) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (visibleBeats < beats.length && (e.key === " " || e.key === "Enter")) {
        e.preventDefault();
        handleNextBeat();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isActive, visibleBeats, beats.length, handleNextBeat]);

  const canShowNextBeat = visibleBeats < beats.length;
  const allBeatsVisible = visibleBeats >= beats.length;
  const shouldShowExpand = body.length > 0 && allBeatsVisible;

  return (
    <div className="space-y-6">
      {/* Year badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, filter: `blur(${BLUR_AMOUNT}px)` }}
        animate={{
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1 : 0.8,
          filter: isActive ? "blur(0px)" : `blur(${BLUR_AMOUNT}px)`,
        }}
        transition={{
          duration: ANIMATION_DURATION,
          delay: 0.2,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-[rgb(var(--fg-0))]"
      >
        {year}
      </motion.div>

      {/* Headline - very large */}
      <motion.h1
        initial={{ opacity: 0, y: 40, filter: `blur(${BLUR_AMOUNT}px)` }}
        animate={{
          opacity: isActive ? 1 : 0,
          y: isActive ? 0 : 40,
          filter: isActive ? "blur(0px)" : `blur(${BLUR_AMOUNT}px)`,
        }}
        transition={{
          duration: ANIMATION_DURATION,
          delay: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold text-[rgb(var(--fg-0))] leading-[1.1] tracking-tight"
      >
        {headline}
      </motion.h1>

      {/* Beats - revealed staggered */}
      <div className="space-y-3 min-h-[200px]">
        <AnimatePresence mode="popLayout">
          {beats.slice(0, visibleBeats).map((beat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, filter: `blur(${BLUR_AMOUNT}px)` }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{ opacity: 0, y: -20, filter: `blur(${BLUR_AMOUNT}px)` }}
              transition={{
                duration: ANIMATION_DURATION,
                delay: index * ANIMATION_DELAY_STAGGER,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="flex items-start gap-4"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: index * ANIMATION_DELAY_STAGGER + 0.2,
                  type: "spring",
                }}
                className="text-[rgb(var(--accent))] text-2xl mt-1 flex-shrink-0"
              >
                •
              </motion.span>
              <span className="text-xl md:text-2xl text-[rgb(var(--fg-0))] leading-relaxed">
                {beat}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Next beat button */}
        {canShowNextBeat && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={handleNextBeat}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded-md transition-all",
              "bg-white/5 hover:bg-white/10 active:bg-white/15",
              "border border-white/10 hover:border-white/20",
              "text-sm text-[rgb(var(--fg-1))] hover:text-[rgb(var(--fg-0))]",
              "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent",
              "mt-4"
            )}
          >
            <span>Next beat</span>
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        )}
      </div>

      {/* Read full context - expandable */}
      {shouldShowExpand && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="space-y-3"
        >
          <button
            onClick={handleToggleExpand}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded-md transition-all",
              "bg-white/5 hover:bg-white/10 active:bg-white/15",
              "border border-white/10 hover:border-white/20",
              "text-sm text-[rgb(var(--fg-1))] hover:text-[rgb(var(--fg-0))]",
              "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent"
            )}
          >
            <span>Read full context</span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 20, filter: `blur(${BLUR_AMOUNT}px)` }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 20, filter: `blur(${BLUR_AMOUNT}px)` }}
                transition={{
                  duration: ANIMATION_DURATION,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className={clsx(
                  "p-6 rounded-lg",
                  "bg-white/5 border border-white/10",
                  "backdrop-blur-sm"
                )}
              >
                <p className="text-base md:text-lg text-[rgb(var(--fg-0))] leading-relaxed max-w-3xl">
                  {body}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Tags */}
      {allBeatsVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, filter: `blur(${BLUR_AMOUNT}px)` }}
          animate={{
            opacity: isActive && allBeatsVisible ? 1 : 0,
            y: isActive && allBeatsVisible ? 0 : 20,
            filter: isActive && allBeatsVisible ? "blur(0px)" : `blur(${BLUR_AMOUNT}px)`,
          }}
          transition={{
            duration: ANIMATION_DURATION,
            delay: visibleBeats * ANIMATION_DELAY_STAGGER + 0.2,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="flex flex-wrap gap-2 pt-4"
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[rgb(var(--fg-1))]"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      )}
    </div>
  );
}

