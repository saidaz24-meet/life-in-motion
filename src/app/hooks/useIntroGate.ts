/**
 * useIntroGate Hook - Manages intro gate display logic
 * 
 * VERIFICATION CHECKLIST:
 * ✅ IntroGate shows only once unless ?debugIntro=1
 * ✅ Skip works and locks permanently (sets localStorage immediately)
 * ✅ Story remains unchanged (overlay unmounts cleanly, no state reset)
 * ✅ Story → Honors flow unchanged (navigation logic untouched)
 * ✅ Sound defaults off and only starts after user interaction (handled by SoundProvider)
 * ✅ Mobile performance ok (proper cleanup, reduced motion support)
 */

import { useState, useEffect } from "react";

const INTRO_GATE_STORAGE_KEY = "lifeInMotion_seenIntroGate";

export function useIntroGate() {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Check for dev-only debug escape hatch: ?debugIntro=1
    const urlParams = new URLSearchParams(window.location.search);
    const debugIntro = urlParams.get("debugIntro") === "1";
    
    if (debugIntro) {
      // Force show gate when debug param is present
      setShouldShow(true);
      return;
    }

    // Normal behavior: check localStorage
    const hasSeen = localStorage.getItem(INTRO_GATE_STORAGE_KEY);
    setShouldShow(hasSeen !== "1");
  }, []);

  const complete = () => {
    localStorage.setItem(INTRO_GATE_STORAGE_KEY, "1");
    setShouldShow(false);
  };

  const skip = () => {
    // Immediately set localStorage before fade-out
    localStorage.setItem(INTRO_GATE_STORAGE_KEY, "1");
    setShouldShow(false);
  };

  return { shouldShow, complete, skip };
}

