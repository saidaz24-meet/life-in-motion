import { useEffect, useState } from "react";

/**
 * Hook to detect and respect prefers-reduced-motion
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Get motion props that respect reduced motion preferences
 */
export function getReducedMotionProps(reducedMotion: boolean) {
  if (reducedMotion) {
    return {
      transition: { duration: 0 },
      initial: false,
      animate: { opacity: 1 },
    };
  }
  return {};
}

