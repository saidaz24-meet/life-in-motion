import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, ChevronDown } from "lucide-react";
import { STORY_SCENES, type StoryScene } from "../../content/timeline";
import { clsx } from "clsx";
import KineticText from "./KineticText";
import StorySceneWrapper from "./StoryScene";
import { useReducedMotion, getReducedMotionProps } from "../../hooks/useReducedMotion";
import SEOHead from "../ui/SEOHead";

export default function StoryShell() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentScene, setCurrentScene] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isScrollingRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  const totalScenes = STORY_SCENES.length;
  const isLastScene = currentScene === totalScenes - 1;

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
      <div className="relative w-full h-screen overflow-hidden">
        {/* Skip button - persistent */}
        <motion.button
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={prefersReducedMotion ? {} : { opacity: 1 }}
          transition={prefersReducedMotion ? {} : { delay: 1 }}
        onClick={handleSkip}
        className={clsx(
          "fixed top-6 right-24 z-50 px-4 py-2 rounded-md transition-all",
          "bg-white/5 hover:bg-white/10 active:bg-white/15",
          "border border-white/10 hover:border-white/20",
          "text-sm text-[rgb(var(--fg-0))]",
          "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent"
        )}
      >
        Skip story → Honors
      </motion.button>

        {/* Sound toggle - persistent */}
        <motion.button
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={prefersReducedMotion ? {} : { opacity: 1 }}
          transition={prefersReducedMotion ? {} : { delay: 1.2 }}
        onClick={() => setSoundEnabled(!soundEnabled)}
        className={clsx(
          "fixed top-6 right-6 z-50 p-2 rounded-md transition-all",
          "bg-white/5 hover:bg-white/10 active:bg-white/15",
          "border border-white/10 hover:border-white/20",
          "text-[rgb(var(--fg-0))]",
          "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent"
        )}
        aria-label={soundEnabled ? "Disable sound" : "Enable sound"}
      >
        {soundEnabled ? (
          <Volume2 className="w-4 h-4" />
        ) : (
          <VolumeX className="w-4 h-4 opacity-50" />
        )}
      </motion.button>

        {/* Progress indicator */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={prefersReducedMotion ? {} : { opacity: 1 }}
          transition={prefersReducedMotion ? {} : { delay: 0.8 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-md glass border border-white/10"
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
                  "group relative px-8 py-4 rounded-lg transition-all",
                  "bg-[rgb(var(--accent))]/20 hover:bg-[rgb(var(--accent))]/30",
                  "border border-[rgb(var(--accent))]/40 hover:border-[rgb(var(--accent))]/60",
                  "text-lg font-semibold text-[rgb(var(--fg-0))]",
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

