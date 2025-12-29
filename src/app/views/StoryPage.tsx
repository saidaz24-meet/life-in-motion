/**
 * StoryPage - Main story page with optional intro gate overlay
 * 
 * VERIFICATION CHECKLIST:
 * ✅ Story remains unchanged (StoryShell renders independently)
 * ✅ Overlay starts immediately and unmounts cleanly after completion
 * ✅ Story → Honors flow unchanged (navigation handled by StoryShell)
 */

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import StoryShell from "../../components/story/StoryShell";
import RecapGateOverlay from "../../components/intro/RecapGateOverlay";
import { useIntroGate } from "../hooks/useIntroGate";
import DebugHUD from "../../components/intro/DebugHUD";
import { STORY_SCENES } from "../../content/timeline";

export default function StoryPage() {
  const location = useLocation();
  const { shouldShow, complete, skip } = useIntroGate();
  const [isIntroGateOverlayMounted, setIsIntroGateOverlayMounted] = useState(false);
  const [isStoryShellMounted, setIsStoryShellMounted] = useState(false);

  useEffect(() => {
    console.log("[StoryPage] MOUNTED");
    return () => {
      console.log("[StoryPage] UNMOUNTED");
    };
  }, []);

  useEffect(() => {
    console.log("[StoryPage] shouldShow changed:", shouldShow);
  }, [shouldShow]);

  const timelineLength = STORY_SCENES?.length ?? 0;

  return (
    <>
      {import.meta.env.DEV && (
        <DebugHUD
          pathname={location.pathname}
          timelineLength={timelineLength}
          shouldShowIntroGate={shouldShow}
          isIntroGateOverlayMounted={isIntroGateOverlayMounted}
          isStoryShellMounted={isStoryShellMounted}
        />
      )}
      <StoryShell key={location.key} onMountChange={setIsStoryShellMounted} />
      <AnimatePresence>
        {shouldShow && (
          <RecapGateOverlay
            onComplete={() => {
              console.log("[StoryPage] RecapGateOverlay onComplete");
              complete();
            }}
            onSkip={() => {
              console.log("[StoryPage] RecapGateOverlay onSkip");
              skip();
            }}
            onMountChange={setIsIntroGateOverlayMounted}
          />
        )}
      </AnimatePresence>
    </>
  );
}
