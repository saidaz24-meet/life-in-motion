import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface MobileScrollAffordanceProps {
  scrollElRef: React.RefObject<HTMLDivElement | null>;
  activeSceneIndex: number;
  totalScenes?: number; // Optional - kept for future use
}

/**
 * Deterministic mobile scroll affordance for Story page
 * - Persistent bottom fade + chevron visible when there's more content below
 * - "Swipe up" label shows until user reaches next scene (activeSceneIndex >= 1)
 * - Listens to actual story scroll container, not window
 */
export default function MobileScrollAffordance({ 
  scrollElRef, 
  activeSceneIndex, 
  totalScenes: _totalScenes 
}: MobileScrollAffordanceProps) {
  const [hasMoreContentBelow, setHasMoreContentBelow] = useState(true);
  const [showSwipeUpLabel, setShowSwipeUpLabel] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  // Listen to scroll container to determine if at bottom
  useEffect(() => {
    const scrollEl = scrollElRef.current;
    if (!scrollEl) return;

    const checkScrollPosition = () => {
      // Calculate if we're near the bottom (within 40px threshold)
      const scrollTop = scrollEl.scrollTop;
      const clientHeight = scrollEl.clientHeight;
      const scrollHeight = scrollEl.scrollHeight;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 40;

      setHasMoreContentBelow(!atBottom);
    };

    // Check initial position
    checkScrollPosition();

    // Listen to scroll events on the actual story scroll container
    scrollEl.addEventListener("scroll", checkScrollPosition, { passive: true });
    scrollEl.addEventListener("resize", checkScrollPosition, { passive: true });

    return () => {
      scrollEl.removeEventListener("scroll", checkScrollPosition);
      scrollEl.removeEventListener("resize", checkScrollPosition);
    };
  }, [scrollElRef]);

  // Hide "Swipe up" label when user reaches next scene (activeSceneIndex >= 1)
  useEffect(() => {
    if (activeSceneIndex >= 1) {
      setShowSwipeUpLabel(false);
    }
  }, [activeSceneIndex]);

  // Render on all screen sizes (mobile and desktop)
  return (
    <div 
      className="fixed inset-x-0 bottom-0 pointer-events-none z-[9999]"
      style={{
        // Position at actual bottom (0) - content extends into safe area
        bottom: '0',
        // Dev-only red outline for visibility debugging (remove after verified)
        outline: import.meta.env.DEV ? '1px solid rgba(255,0,0,0.6)' : 'none',
      }}
    >
      {/* Persistent bottom fade gradient - visible when hasMoreContentBelow */}
      {/* Gradient extends upward from bottom, accounting for safe area */}
      {hasMoreContentBelow && (
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: '120px',
            background: `
              linear-gradient(to top,
                rgba(0, 0, 0, 0.55) 0%,
                rgba(0, 0, 0, 0.2) 40%,
                rgba(0, 0, 0, 0.1) 70%,
                transparent 100%
              )
            `,
            // Extend gradient into safe area so it fills bottom completely
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          }}
          aria-hidden="true"
        />
      )}

      {/* Chevron indicator - always visible when hasMoreContentBelow */}
      {/* Positioned above safe area so it's visible */}
      {hasMoreContentBelow && (
        <motion.div
          initial={false}
          animate={prefersReducedMotion ? {} : {
            y: [0, -8, 0],
          }}
          transition={prefersReducedMotion ? {} : {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            bottom: 'calc(env(safe-area-inset-bottom, 0px) + 14px)',
          }}
          aria-hidden="true"
        >
          <ChevronDown 
            className="w-5 h-5 text-[rgb(var(--fg-0))] opacity-80"
            strokeWidth={2.5}
          />
        </motion.div>
      )}

      {/* "Swipe up" text label - shows until next scene reached */}
      {/* Positioned above safe area so it's visible */}
      {showSwipeUpLabel && hasMoreContentBelow && (
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
          transition={prefersReducedMotion ? {} : { duration: 0.4 }}
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            bottom: 'calc(env(safe-area-inset-bottom, 0px) + 42px)',
          }}
          aria-hidden="true"
        >
          <span className="text-xs text-[rgb(var(--fg-1))] opacity-90 font-medium tracking-wide">
            Swipe up
          </span>
        </motion.div>
      )}
    </div>
  );
}

