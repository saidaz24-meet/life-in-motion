/**
 * StoryPage - Main story page (route "/story")
 * 
 * This page only renders StoryShell - no intro gate logic.
 * Intro gate is handled separately by IntroGatePage at route "/".
 */

import { useEffect, useRef } from "react";
import StoryShell from "../../components/story/StoryShell";
import DebugHUD from "../../components/intro/DebugHUD";
import { STORY_TIMELINE_SCENES } from "../../content/storyTimeline";

export default function StoryPage() {
  const hasMountedRef = useRef(false);

  // Check for debug query param
  const searchParams = new URLSearchParams(window.location.search);
  const showDebug = searchParams.get("debug") === "1";

  // DEV log only for first mount
  useEffect(() => {
    if (!hasMountedRef.current && import.meta.env.DEV) {
      console.log("[StoryPage] FIRST MOUNT");
      hasMountedRef.current = true;
    }
  }, []);

  // Defensive check: ensure STORY_TIMELINE_SCENES is available
  const timelineLength = STORY_TIMELINE_SCENES?.length ?? 0;
  const hasTimelineData = STORY_TIMELINE_SCENES && Array.isArray(STORY_TIMELINE_SCENES) && timelineLength > 0;

  // Fallback if timeline data is missing or empty - show placeholder, no redirects
  if (!hasTimelineData) {
    console.error("[StoryPage] CRITICAL: Timeline data missing - check storyTimeline.ts import");
  }

  return (
    <>
      {(import.meta.env.DEV || showDebug) && (
        <DebugHUD
          pathname="/story"
          timelineLength={timelineLength}
          shouldShowIntroGate={false}
          isIntroGateOverlayMounted={false}
          isStoryShellMounted={true}
          showDebug={showDebug}
        />
      )}
      <StoryShell />
    </>
  );
}
