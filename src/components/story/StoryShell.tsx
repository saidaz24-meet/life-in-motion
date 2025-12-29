import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { STORY_SCENES, type StoryScene } from "../../content/timeline";
import { clsx } from "clsx";
import KineticText from "./KineticText";
import StorySceneWrapper from "./StoryScene";
import { useReducedMotion, getReducedMotionProps } from "../../hooks/useReducedMotion";
import SEOHead from "../ui/SEOHead";

interface StoryShellProps {
  onMountChange?: (mounted: boolean) => void;
}

export default function StoryShell({ onMountChange }: StoryShellProps = {}) {
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentScene, setCurrentScene] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isScrollingRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    console.log("[StoryShell] MOUNTED");
    onMountChange?.(true);
    return () => {
      console.log("[StoryShell] UNMOUNTED");
      onMountChange?.(false);
      // Cleanup any global side effects
      document.body.style.overflow = "";
    };
  }, [onMountChange]);

  // Reset scroll position and state when Story page mounts/navigates to
  useEffect(() => {
    // Only reset if we're actually on the Story route
    if ((location.pathname === "/" || location.pathname === "/story") && containerRef.current) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = 0;
          setCurrentScene(0);
          setIsTransitioning(false);
        }
      });
    }
  }, [location.pathname]);

  const totalScenes = STORY_SCENES?.length ?? 0;
  const isLastScene = totalScenes > 0 && currentScene === totalScenes - 1;

  // Render error fallback if timeline data is missing
  if (!STORY_SCENES || totalScenes === 0) {
    console.error("[StoryShell] Timeline data missing or empty", {
      STORY_SCENES,
      totalScenes,
      location: location.pathname,
    });
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-black text-white p-6">
        <div className="max-w-2xl text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-400">Timeline data missing</h1>
          <div className="text-sm text-gray-400 font-mono space-y-2">
            <div>STORY_SCENES: {STORY_SCENES ? "defined" : "undefined"}</div>
            <div>totalScenes: {totalScenes}</div>
            <div>location: {location.pathname}</div>
            {import.meta.env.DEV && (
              <div className="mt-4 p-4 bg-black/50 rounded border border-red-500/50">
                Check console for more details
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Scroll to scene
  const scrollToScene = useCallback((index: number) => {
    if (isScrollingRef.current || index < 0 || index >= totalScenes) return;

    isScrollingRef.current = true;
    setCurrentScene(index);

    const container = containerRef.current;
    if (container) {
      const sceneElement = container.children[index] as HTMLElement;
      if (sceneElement) {
        sceneElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }

    setTimeout(() => {
      isScrollingRef.current = false;
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
    navigate("/honors");
  };

  const handleUnleash = () => {
    setIsTransitioning(true);
    // Cinematic transition animation - fade to black then navigate
    setTimeout(() => {
      navigate("/honors");
    }, 1200);
  };

  // Track scroll position for progress
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const sceneHeight = container.clientHeight;
      const sceneIndex = Math.round(scrollTop / sceneHeight);
      const clampedIndex = Math.max(0, Math.min(sceneIndex, totalScenes - 1));
      
      if (clampedIndex !== currentScene && !isScrollingRef.current) {
        setCurrentScene(clampedIndex);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [currentScene, totalScenes]);

  const reducedMotionProps = getReducedMotionProps(prefersReducedMotion);

  return (
    <>
      <SEOHead title="Story" />
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
        {STORY_SCENES.map((scene, index) => (
          <StorySceneComponent
            key={scene.id}
            scene={scene}
            index={index}
            isLast={index === totalScenes - 1}
            isActive={index === currentScene}
            onUnleash={handleUnleash}
            isTransitioning={isTransitioning}
          />
        ))}
      </div>

        {/* Transition overlay */}
        <AnimatePresence>
          {isTransitioning && (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={prefersReducedMotion ? {} : { opacity: 1 }}
              exit={prefersReducedMotion ? false : { opacity: 0 }}
              transition={prefersReducedMotion ? {} : { duration: 1.2, ease: "easeInOut" }}
              className="fixed inset-0 z-[100] bg-black"
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

interface StorySceneComponentProps {
  scene: StoryScene;
  index: number;
  isLast: boolean;
  isActive: boolean;
  onUnleash: () => void;
  isTransitioning: boolean;
}

function StorySceneComponent({
  scene,
  index,
  isLast,
  isActive,
  onUnleash,
  isTransitioning,
}: StorySceneComponentProps) {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotionProps = getReducedMotionProps(prefersReducedMotion);

  return (
    <StorySceneWrapper scene={scene} index={index} isActive={isActive}>
      <div className="max-w-5xl mx-auto px-6 w-full">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          animate={prefersReducedMotion ? {} : { 
            opacity: isActive ? 1 : 0.3,
            y: isActive ? 0 : 30,
          }}
          transition={prefersReducedMotion ? {} : { duration: 0.8, delay: 0.2 }}
          className={clsx(
            "glass rounded-lg border border-white/10 p-8 md:p-12 lg:p-16",
            "backdrop-blur-xl"
          )}
        >
          <KineticText
            headline={scene.headline}
            beats={scene.beats}
            body={scene.body}
            isActive={isActive}
            year={scene.year}
            tags={scene.tags}
          />

          {/* Final scene CTA */}
          {isLast && (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
              animate={prefersReducedMotion ? {} : { 
                opacity: isActive ? 1 : 0,
                y: isActive ? 0 : 30,
              }}
              transition={prefersReducedMotion ? {} : { duration: 0.8, delay: 1 }}
              className="mt-12"
            >
              <button
                onClick={onUnleash}
                disabled={isTransitioning}
                aria-label="Navigate to Honors page"
                className={clsx(
                  "group relative px-8 py-4 rounded-lg transition-all duration-200 ease-out",
                  "bg-[rgb(var(--accent))]/20 hover:bg-[rgb(var(--accent))]/30 active:bg-[rgb(var(--accent))]/25",
                  "border border-[rgb(var(--accent))]/40 hover:border-[rgb(var(--accent))]/60",
                  "text-lg font-semibold text-[rgb(var(--fg-0))]",
                  "hover:-translate-y-1 active:translate-y-0",
                  "hover:shadow-[0_6px_20px_rgba(120,220,255,0.3)]",
                  "focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/40 focus:ring-offset-2 focus:ring-offset-transparent",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                <span className="flex items-center gap-3">
                  Unleash the site
                  <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </span>
              </button>
            </motion.div>
          )}

          {/* Scroll indicator (not on last scene) */}
          {!isLast && !prefersReducedMotion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isActive ? 1 : 0,
              }}
              transition={{ duration: 0.6, delay: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-[rgb(var(--fg-1))]"
              >
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </StorySceneWrapper>
  );
}

