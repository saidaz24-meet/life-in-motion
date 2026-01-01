import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ExternalLink } from "lucide-react";
import { clsx } from "clsx";
import type { StoryTimelineScene } from "../../content/storyTimeline";
import LazyImage from "../ui/LazyImage";
import LazyVideo from "../ui/LazyVideo";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { getItemById } from "../../content/items";
import type { ContentItem } from "../../content/types";
import { useNavigate } from "react-router-dom";

interface CinematicSceneProps {
  scene: StoryTimelineScene;
  index: number;
  isActive: boolean;
  isLast: boolean;
  onContinue?: () => void;
}

export default function CinematicScene({
  scene,
  index: _index,
  isActive,
  isLast,
  onContinue,
}: CinematicSceneProps) {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const [visibleBeats, setVisibleBeats] = useState(0);
  const [linkedItems, setLinkedItems] = useState<ContentItem[]>([]);

  // Load linked items
  useEffect(() => {
    if (scene.itemIds && Array.isArray(scene.itemIds) && scene.itemIds.length > 0) {
      const items = scene.itemIds
        .map((id) => getItemById(id))
        .filter((item): item is ContentItem => Boolean(item));
      setLinkedItems(items);
    } else {
      setLinkedItems([]);
    }
  }, [scene.itemIds]);

  // Reset and reveal beats when scene becomes active
  useEffect(() => {
    if (isActive) {
      setVisibleBeats(0);
      // Auto-reveal first beat after delay
      const timer1 = setTimeout(() => setVisibleBeats(1), 600);
      const timer2 = setTimeout(() => setVisibleBeats(2), 1200);
      const timer3 = setTimeout(() => setVisibleBeats(3), 1800);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
      setVisibleBeats(0);
    }
  }, [isActive]);

  const handleNextBeat = () => {
    if (visibleBeats < 3) {
      setVisibleBeats((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleItemClick = (itemId: string) => {
    // Navigate to appropriate page and open modal
    const item = getItemById(itemId);
    if (!item) return;

    let basePath = "/honors";
    if (item.type === "venture") basePath = "/ventures";
    else if (item.type === "experience") basePath = "/atlas";
    else if (item.type === "book") basePath = "/books";

    navigate(`${basePath}?focus=${itemId}`);
  };

  const allBeatsVisible = visibleBeats >= 3;
  // Detect video by extension or if path contains /teasers/
  const isVideo = scene.mediaRef.includes("/teasers/") || 
                  scene.mediaRef.endsWith(".mp4") || 
                  scene.mediaRef.endsWith(".mov") || 
                  scene.mediaRef.endsWith(".MP4") ||
                  scene.mediaRef.endsWith(".webm");

  return (
    <section className="h-screen snap-start snap-always relative flex items-center justify-center overflow-hidden">
      {/* Full-bleed background media */}
      <div className="absolute inset-0 overflow-hidden">
        {isVideo ? (
          <LazyVideo
            src={scene.mediaRef}
            className="w-full h-full object-cover"
            autoPlay={isActive}
            loop
            muted
            playsInline
          />
        ) : (
          <motion.div
            className="w-full h-full"
            initial={prefersReducedMotion ? false : { scale: 1.1 }}
            animate={prefersReducedMotion ? {} : { scale: isActive ? 1 : 1.1 }}
            transition={prefersReducedMotion ? {} : { duration: 2, ease: "easeOut" }}
          >
            <LazyImage
              src={scene.mediaRef}
              alt={scene.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)",
          }}
        />
      </div>

      {/* Content - centered, large typography */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center md:text-left">
          {/* Title - very large */}
          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={prefersReducedMotion ? {} : {
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 40,
              filter: isActive ? "blur(0px)" : "blur(8px)",
            }}
            transition={prefersReducedMotion ? {} : { duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-[rgb(var(--fg-0))] leading-[1.1] tracking-tight mb-8"
          >
            {scene.title}
          </motion.h1>

          {/* Beats - 3 beats, revealed progressively */}
          <div className="space-y-4 min-h-[180px]">
            <AnimatePresence mode="popLayout">
              {scene.beats.slice(0, visibleBeats).map((beat, beatIndex) => (
                <motion.div
                  key={beatIndex}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={prefersReducedMotion ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -20, filter: "blur(8px)" }}
                  transition={prefersReducedMotion ? {} : {
                    duration: 0.6,
                    delay: beatIndex * 0.2,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="flex items-start gap-4"
                >
                  <motion.span
                    initial={prefersReducedMotion ? false : { scale: 0 }}
                    animate={prefersReducedMotion ? {} : { scale: 1 }}
                    transition={prefersReducedMotion ? {} : {
                      duration: 0.3,
                      delay: beatIndex * 0.2 + 0.1,
                      type: "spring",
                    }}
                    className="text-[rgb(var(--accent))] text-2xl md:text-3xl mt-1 flex-shrink-0"
                  >
                    •
                  </motion.span>
                  <span className="text-xl md:text-2xl lg:text-3xl text-[rgb(var(--fg-0))] leading-relaxed font-medium">
                    {beat}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Next beat button */}
            {visibleBeats < 3 && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={handleNextBeat}
                className={clsx(
                  "flex items-center gap-2 px-6 py-3 rounded-lg transition-all",
                  "bg-white/10 hover:bg-white/15 active:bg-white/20",
                  "border border-white/20 hover:border-white/30",
                  "text-base text-[rgb(var(--fg-0))] font-medium",
                  "focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-transparent",
                  "mt-6"
                )}
              >
                <span>Next beat</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            )}
          </div>

          {/* Linked items - show after all beats */}
          {allBeatsVisible && linkedItems.length > 0 && (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? {} : { duration: 0.6, delay: 0.3 }}
              className="mt-12 space-y-3"
            >
              <p className="text-sm text-[rgb(var(--fg-1))] mb-4">Explore related chapters:</p>
              <div className="flex flex-wrap gap-3">
                {linkedItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={clsx(
                      "group flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                      "bg-white/10 hover:bg-white/15 active:bg-white/20",
                      "border border-white/20 hover:border-white/30",
                      "text-sm text-[rgb(var(--fg-0))] font-medium",
                      "focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-transparent"
                    )}
                  >
                    <span>{item.card.headline}</span>
                    <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Continue to Site Mode - only on last scene */}
          {isLast && allBeatsVisible && (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? {} : { duration: 0.8, delay: 0.5 }}
              className="mt-16"
            >
              <button
                onClick={onContinue}
                className={clsx(
                  "group relative px-8 py-4 rounded-lg transition-all duration-300 ease-out",
                  "bg-[rgb(var(--accent))]/20 hover:bg-[rgb(var(--accent))]/30 active:bg-[rgb(var(--accent))]/25",
                  "border border-[rgb(var(--accent))]/40 hover:border-[rgb(var(--accent))]/60",
                  "text-lg md:text-xl font-semibold text-[rgb(var(--fg-0))]",
                  "hover:-translate-y-1 active:translate-y-0",
                  "hover:shadow-[0_8px_24px_rgba(120,220,255,0.4)]",
                  "focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/40 focus:ring-offset-2 focus:ring-offset-transparent",
                  "overflow-hidden"
                )}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <span className="relative flex items-center gap-3">
                  Continue to Site Mode
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

