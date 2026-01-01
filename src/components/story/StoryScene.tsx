import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { StoryScene as StorySceneType } from "../../content/timeline";
import LazyImage from "../ui/LazyImage";
import LazyVideo from "../ui/LazyVideo";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface StorySceneProps {
  scene: StorySceneType;
  index: number;
  isActive: boolean;
  children: React.ReactNode;
}

export default function StoryScene({
  scene,
  index,
  isActive,
  children,
}: StorySceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Detect mobile for performance
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Parallax scroll tracking
  useEffect(() => {
    if (isMobile || !isActive) {
      setScrollY(0);
      return;
    }

    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress within viewport
      // When scene is centered: progress = 0
      // When scene is at top: progress = -0.5
      // When scene is at bottom: progress = 0.5
      const progress = (viewportHeight / 2 - rect.top) / viewportHeight;
      
      // Clamp progress and apply subtle parallax (max 15px movement)
      const clampedProgress = Math.max(-0.5, Math.min(0.5, progress));
      setScrollY(clampedProgress * 15);
    };

    // Throttle scroll updates for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isActive, isMobile]);

  // Reset parallax when scene becomes inactive
  useEffect(() => {
    if (!isActive) {
      setScrollY(0);
    }
  }, [isActive]);

  return (
    <section
      ref={containerRef}
      className="h-screen snap-start snap-always relative flex items-center justify-center overflow-hidden"
      id={`scene-${index}`}
    >
      {/* Background media with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        {scene.media.type === "image" ? (
          <motion.div
            className="w-full h-full"
            initial={prefersReducedMotion ? false : { scale: 1.1 }}
            animate={prefersReducedMotion ? {} : { 
              scale: isActive ? 1 : 1.1,
              y: isMobile || prefersReducedMotion ? 0 : scrollY,
            }}
            transition={prefersReducedMotion ? {} : { 
              scale: { duration: 1.5, ease: "easeOut" },
              y: { duration: 0.1, ease: "linear" },
            }}
            style={{
              willChange: isMobile || prefersReducedMotion ? "auto" : "transform",
            }}
          >
            <LazyImage
              src={scene.media.src}
              alt={scene.media.alt || scene.headline}
              className="w-full h-full"
            />
          </motion.div>
        ) : (
          <motion.div
            className="w-full h-full"
            initial={prefersReducedMotion ? false : { scale: 1.1 }}
            animate={prefersReducedMotion ? {} : { 
              scale: isActive ? 1 : 1.1,
              y: isMobile || prefersReducedMotion ? 0 : scrollY,
            }}
            transition={prefersReducedMotion ? {} : { 
              scale: { duration: 1.5, ease: "easeOut" },
              y: { duration: 0.1, ease: "linear" },
            }}
            style={{
              willChange: isMobile || prefersReducedMotion ? "auto" : "transform",
            }}
          >
            <LazyVideo
              src={scene.media.src}
              className="w-full h-full"
              autoPlay={isActive}
              loop
              muted
              playsInline
            />
          </motion.div>
        )}

        {/* Gradient overlays for readability - reduced opacity to show animated background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40" />
        
        {/* Vignette overlay - lighter to show animated background */}
        <div 
          className="absolute inset-0" 
          style={{
            background: "radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.15) 100%)",
          }}
        />
      </div>

      {/* Content area */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </section>
  );
}

