/**
 * ScrollToTop - Scrolls to top on route change
 * 
 * Listens to location changes and scrolls the scroll container to top.
 * Only scrolls if the container is not currently locked by a modal.
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollLockManager } from "../../utils/scrollLockManager";

export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Only scroll to top if scroll is not locked (no modal open)
    const lockState = scrollLockManager.getState();
    if (lockState.isLocked) {
      // Don't scroll if a modal is open - let user close modal first
      return;
    }

    // Find the main scroll container (data-scroll-container)
    const scrollContainer = document.querySelector('[data-scroll-container]') as HTMLElement;
    
    if (scrollContainer) {
      // Scroll the main container to top (non-story routes only)
      // Story route has its own scroll management
      const isStoryRoute = location.pathname === "/story";
      if (!isStoryRoute) {
        scrollContainer.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    }
  }, [location.pathname]);

  return null;
}

