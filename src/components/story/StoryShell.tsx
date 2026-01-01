import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { STORY_TIMELINE_SCENES } from "../../content/storyTimeline";
import { clsx } from "clsx";
import CinematicScene from "./CinematicScene";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import SEOHead from "../ui/SEOHead";
import { createNavLogger } from "../../utils/navigation";

interface StoryShellProps {
  onMountChange?: (mounted: boolean) => void;
}

export default function StoryShell({ onMountChange }: StoryShellProps = {}) {
  const navigate = useNavigate();
  const nav = createNavLogger(navigate);
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentScene, setCurrentScene] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isScrollingRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const continueTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    console.log("[StoryShell] MOUNTED");
    onMountChange?.(true);
    return () => {
      console.log("[StoryShell] UNMOUNTED");
      onMountChange?.(false);
      // Cleanup all timeouts
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
      if (continueTimeoutRef.current) {
        clearTimeout(continueTimeoutRef.current);
        continueTimeoutRef.current = null;
      }
      // Reset state refs
      isScrollingRef.current = false;
      // Cleanup any global side effects
      document.body.style.overflow = "";
    };
  }, [onMountChange]);

  // Reset scroll position and state on MOUNT ONLY (not pathname changes)
  useEffect(() => {
    setCurrentScene(0);
    setIsTransitioning(false);
    isScrollingRef.current = false;
    
    const resetScroll = () => {
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    };
    
    requestAnimationFrame(() => {
      requestAnimationFrame(resetScroll);
    });
  }, []);


  const totalScenes = STORY_TIMELINE_SCENES?.length ?? 0;

  // Check for debug query param
  const searchParams = new URLSearchParams(location.search);
  const showDebug = searchParams.get("debug") === "1";


  // Scroll to scene
  const scrollToScene = useCallback((index: number) => {
    if (isScrollingRef.current || index < 0 || index >= totalScenes) return;

    // Cleanup any pending scroll timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }

    isScrollingRef.current = true;
    setCurrentScene(index);

    const container = containerRef.current;
    if (container) {
      const sceneElement = container.children[index] as HTMLElement;
      if (sceneElement) {
        sceneElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }

    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
      scrollTimeoutRef.current = null;
    }, 800);
  }, [totalScenes]);

  const goToNextScene = useCallback(() => {
    const next = currentScene + 1;
    if (next < totalScenes && !isScrollingRef.current) {
      scrollToScene(next);
    }
  }, [currentScene, totalScenes, scrollToScene]);

  const goToPreviousScene = useCallback(() => {
    const next = currentScene - 1;
    if (next >= 0 && !isScrollingRef.current) {
      scrollToScene(next);
    }
  }, [currentScene, scrollToScene]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goToNextScene();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goToPreviousScene();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTransitioning, goToNextScene, goToPreviousScene]);

  // Handle wheel/trackpad scrolling (disabled on mobile for better performance)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect mobile
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
    if (isMobile) return; // Let native scroll handle it on mobile

    let lastScrollTime = 0;

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning || isScrollingRef.current) return;

      const now = Date.now();
      if (now - lastScrollTime < 500) return; // Throttle
      lastScrollTime = now;

      e.preventDefault();

      if (e.deltaY > 0) {
        goToNextScene();
      } else if (e.deltaY < 0) {
        goToPreviousScene();
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [isTransitioning, goToNextScene, goToPreviousScene]);

  const handleSkip = () => {
    nav("/honors", undefined, "StoryShell: user clicked Skip");
  };

  const handleContinue = () => {
    setIsTransitioning(true);
    // Cleanup any pending continue timeout
    if (continueTimeoutRef.current) {
      clearTimeout(continueTimeoutRef.current);
      continueTimeoutRef.current = null;
    }
    // Cinematic transition: fade to black, then navigate to Honors
    continueTimeoutRef.current = setTimeout(() => {
      nav("/honors", undefined, "StoryShell: user clicked Continue after story");
      continueTimeoutRef.current = null;
    }, 1500);
  };

  // Track scroll position for progress
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const sceneHeight = container.clientHeight;
      // Only process if container has valid dimensions
      if (sceneHeight === 0) return;
      
      const sceneIndex = Math.round(scrollTop / sceneHeight);
      const clampedIndex = Math.max(0, Math.min(sceneIndex, totalScenes - 1));
      
      if (clampedIndex !== currentScene && !isScrollingRef.current) {
        setCurrentScene(clampedIndex);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [currentScene, totalScenes]);

  return (
    <>
      <SEOHead title="Story" />
      {/* Debug verification - dev only */}
      {(import.meta.env.DEV || showDebug) && (
        <div className="fixed top-20 right-6 z-50 px-3 py-2 bg-black/80 border border-white/20 rounded text-xs font-mono text-white">
          <div>Route: {location.pathname}</div>
          <div>Scenes: {totalScenes}</div>
        </div>
      )}
      <div className="relative w-full h-[calc(100dvh-57px)] overflow-hidden bg-transparent">
        {/* Skip button - persistent */}
        <motion.button
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={prefersReducedMotion ? {} : { opacity: 1 }}
          transition={prefersReducedMotion ? {} : { delay: 1 }}
        onClick={handleSkip}
        className={clsx(
          "fixed top-[65px] right-24 z-40 px-4 py-2 rounded-md transition-all duration-200 ease-out",
          "hover:-translate-y-0.5 active:translate-y-0",
          "hover:shadow-[0_4px_12px_rgba(120,220,255,0.15)]",
          "bg-white/5 hover:bg-white/10 active:bg-white/15",
          "border border-white/10 hover:border-white/20",
          "text-sm text-[rgb(var(--fg-0))]",
          "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent"
        )}
      >
        Skip story → Honors
      </motion.button>


        {/* Progress indicator - positioned above footer */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={prefersReducedMotion ? {} : { opacity: 1 }}
          transition={prefersReducedMotion ? {} : { delay: 0.8 }}
        className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-md glass border border-white/10"
      >
        <span className="text-xs text-[rgb(var(--fg-1))] tracking-wide">
          Scene {currentScene + 1} / {totalScenes}
        </span>
      </motion.div>

        {/* Scroll container */}
        <div
          ref={containerRef}
          className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
          style={{ 
            scrollBehavior: prefersReducedMotion ? "auto" : "smooth",
            WebkitOverflowScrolling: "touch" // Better mobile scrolling
          }}
          onScroll={() => {
            // Sync scroll to parent container for header backdrop effect
            const scrollContainer = document.querySelector('[data-scroll-container]') as HTMLElement;
            if (scrollContainer) {
              const syntheticEvent = new Event('scroll', { bubbles: true, cancelable: false });
              scrollContainer.dispatchEvent(syntheticEvent);
            }
          }}
        >
        {STORY_TIMELINE_SCENES.map((scene, index) => (
          <CinematicScene
            key={scene.id}
            scene={scene}
            index={index}
            isLast={index === totalScenes - 1}
            isActive={index === currentScene}
            onContinue={handleContinue}
          />
        ))}
      </div>

        {/* Cinematic transition overlay */}
        <AnimatePresence>
          {isTransitioning && (
            <>
              <motion.div
                initial={prefersReducedMotion ? undefined : { opacity: 0 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                transition={prefersReducedMotion ? {} : { duration: 1.5, ease: "easeInOut" }}
                className="fixed inset-0 z-[100] bg-black"
              />
              {/* Optional: Add text overlay during transition */}
              <motion.div
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                transition={prefersReducedMotion ? {} : { duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none"
              >
                <p className="text-2xl md:text-3xl font-semibold text-[rgb(var(--fg-0))]">
                  Entering Site Mode...
                </p>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}


