import type { NavigateFunction } from "react-router-dom";

const ENABLE_NAV_STACK = true; // ← Change to true

export function createNavLogger(navigate: NavigateFunction) {
  return (to: string, options?: { replace?: boolean }, reason?: string) => {
    try {
      console.debug("[NAVIGATE]", to, reason || "no reason");
      
      if (ENABLE_NAV_STACK) {
        const stack = new Error().stack;
        const lines = stack?.split('\n').slice(2, 8) || [];
        console.debug("  Call stack:");
        lines.forEach(line => console.debug("    ", line.trim()));
      }
      
      navigate(to, options);
    } catch (error) {
      console.error("[NAVIGATE] Error during navigation:", error);
    }
  };
}