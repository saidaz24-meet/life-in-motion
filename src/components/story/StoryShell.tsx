import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { STORY_TIMELINE_SCENES } from "../../content/storyTimeline";
import { clsx } from "clsx";
import CinematicScene from "./CinematicScene";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import SEOHead from "../ui/SEOHead";
import { createNavLogger } from "../../utils/navigation";
import PageFooter from "../layout/PageFooter";
import MobileScrollAffordance from "./MobileScrollAffordance";
import { useSound } from "../../app/providers/SoundProvider";

interface StoryShellProps {
  onMountChange?: (mounted: boolean) => void;
}

export default function StoryShell({ onMountChange }: StoryShellProps = {}) {
  const navigate = useNavigate();
  const nav = createNavLogger(navigate);
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentScene, setCurrentScene] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const continueTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { play } = useSound();
  const previousSceneRef = useRef(0);

  useEffect(() => {
    console.log("[StoryShell] MOUNTED");
    onMountChange?.(true);
    
    return () => {
      console.log("[StoryShell] UNMOUNTED");
      onMountChange?.(false);
      // Cleanup all timeouts
      if (continueTimeoutRef.current) {
        clearTimeout(continueTimeoutRef.current);
        continueTimeoutRef.current = null;
      }
      // StoryShell uses its own internal scroll container, no body overflow changes needed
    };
  }, [onMountChange]);

  // Reset scroll position and state on MOUNT ONLY (not pathname changes)
  useEffect(() => {
    setCurrentScene(0);
    setIsTransitioning(false);
    sceneRefs.current = [];
  }, []);

  const totalScenes = STORY_TIMELINE_SCENES?.length ?? 0;

  // Check for debug query param
  const searchParams = new URLSearchParams(location.search);
  const showDebug = searchParams.get("debug") === "1";

  // Simple scroll to scene for keyboard navigation
  const scrollToScene = useCallback((index: number) => {
    if (index < 0 || index >= totalScenes) return;
    const target = sceneRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [totalScenes]);

  const goToNextScene = useCallback(() => {
    const next = currentScene + 1;
    if (next < totalScenes) {
      scrollToScene(next);
    }
  }, [currentScene, totalScenes, scrollToScene]);

  const goToPreviousScene = useCallback(() => {
    const next = currentScene - 1;
    if (next >= 0) {
      scrollToScene(next);
    }
  }, [currentScene, scrollToScene]);

  // Trigger ready state after layout settles
  useEffect(() => {
    // Use setTimeout + double RAF to ensure browser has finished route transition
    // and containerRef has non-zero height before any story logic runs
    setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsReady(true);
        });
      });
    }, 100);
  }, []);

  // For story route, StoryShell creates its own nested scroll container
  // The containerRef points to the inner scroll div (set via ref attribute below)
  // This allows snap scrolling independent of the main scroll container

  // Initialize scroll position AFTER isReady is true
  useEffect(() => {
    if (!isReady) return;

    const container = containerRef.current;
    if (!container) return;

    // Ensure container has valid dimensions
    const rect = container.getBoundingClientRect();
    if (rect.height === 0) return;

    // Explicitly set scroll to top - CSS snap will handle the rest
    container.scrollTop = 0;
  }, [isReady]);

  // Handle keyboard navigation - simple scrollIntoView
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

  // Sync state with IntersectionObserver - ensures text renders immediately when scene enters viewport
  useEffect(() => {
    if (!isReady) return;

    const container = containerRef.current;
    if (!container) return;

    let observer: IntersectionObserver | null = null;
    let rafId: number | null = null;

    // Wait a frame for DOM to settle, then observe all scenes
    rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                const target = entry.target as HTMLDivElement;
                const index = parseInt(target.getAttribute('data-scene-index') || '-1', 10);
                if (index !== -1) {
                  // Use functional update to prevent duplicate state updates
                  setCurrentScene((prev) => {
                    if (prev !== index) {
                      console.log('[StoryShell] Scene changed:', index, 'intersectionRatio:', entry.intersectionRatio);
                      return index;
                    }
                    return prev;
                  });
                }
              }
            });
          },
          {
            root: container,
            threshold: 0.5, // 50% visible - single value to reduce events
          }
        );

        // Observe all scene elements
        sceneRefs.current.forEach((sceneEl) => {
          if (sceneEl && observer) {
            observer.observe(sceneEl);
          }
        });

        // Set initial scene if first scene is visible
        if (sceneRefs.current[0]) {
          const firstRect = sceneRefs.current[0].getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          if (firstRect.top <= containerRect.top + containerRect.height * 0.4) {
            setCurrentScene(0);
          }
        }
      });
    });

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (observer) {
        observer.disconnect();
      }
    };
  }, [isReady, totalScenes]); // Removed currentScene from deps to prevent re-initialization loops

  // Play transition sound when scene changes
  useEffect(() => {
    if (previousSceneRef.current !== currentScene && currentScene > 0) {
      play("transition");
    }
    previousSceneRef.current = currentScene;
  }, [currentScene, play]);

  // Get first image for preloading (LCP optimization)
  const firstImage = STORY_TIMELINE_SCENES[0]?.mediaRef;

  return (
    <>
      <SEOHead title="Story" preloadImage={firstImage} />
      {/* Debug verification - dev only */}
      {(import.meta.env.DEV || showDebug) && (
        <div className="fixed top-20 right-6 z-50 px-3 py-2 bg-black/80 border border-white/20 rounded text-xs font-mono text-white">
          <div>Route: {location.pathname}</div>
          <div>Scenes: {totalScenes}</div>
        </div>
      )}
      <div className="relative w-full h-full overflow-hidden">
        {/* Scroll container - uses main scroll container via parent */}
        {/* Mobile: Use 100dvh to fill entire viewport including system bars, Desktop: h-full */}
        <div
          ref={containerRef}
          className="overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-hide md:h-full h-[100dvh]"
          style={{ 
            WebkitOverflowScrolling: "touch", // Better mobile scrolling
          }}
        >
          {isReady && STORY_TIMELINE_SCENES.map((scene, index) => (
            <div
              key={scene.id}
              ref={(el) => {
                sceneRefs.current[index] = el;
              }}
              data-scene-index={index}
              className="snap-start snap-always w-full md:h-full h-[100dvh]"
            >
              <CinematicScene
                scene={scene}
                index={index}
                isLast={index === totalScenes - 1}
                isActive={index === currentScene}
                onContinue={handleContinue}
              />
            </div>
          ))}
          {/* Footer at the end of story */}
          {isReady && (
            <div className="snap-start snap-always w-full">
              {/* End cap spacer */}
              <div className="h-8 flex-shrink-0" aria-hidden="true" />
              <PageFooter />
            </div>
          )}
        </div>

        {/* Skip button - persistent, high z-index to stay above scenes */}
        {/* Mobile: Hidden (moved to hamburger menu), Desktop: Visible */}
        {isReady && (
          <motion.button
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={prefersReducedMotion ? {} : { opacity: 1 }}
            transition={prefersReducedMotion ? {} : { delay: 0.5 }}
            onClick={handleSkip}
            className={clsx(
              "hidden md:flex fixed top-[65px] right-24 z-[50] px-4 py-2 rounded-md transition-all duration-200 ease-out",
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
        )}

        {/* Mobile scroll affordance - deterministic, always visible when content below */}
        {isReady && (
          <MobileScrollAffordance 
            scrollElRef={containerRef}
            activeSceneIndex={currentScene}
            totalScenes={totalScenes}
          />
        )}


        {/* Cinematic transition overlay */}
        {isReady && (
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
        )}
      </div>
    </>
  );
}


