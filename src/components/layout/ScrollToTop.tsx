/**
 * ScrollToTop - Scrolls to top on route change
 * 
 * Listens to location changes and scrolls the window to top.
 * Respects scroll-snap pages (like Story) by only scrolling the main container.
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Find the main scroll container (data-scroll-container)
    const scrollContainer = document.querySelector('[data-scroll-container]') as HTMLElement;
    
    if (scrollContainer) {
      // Scroll the main container to top
      scrollContainer.scrollTo({ top: 0, left: 0, behavior: "auto" });
    } else {
      // Fallback to window scroll if no container found
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [location.pathname]);

  return null;
}

