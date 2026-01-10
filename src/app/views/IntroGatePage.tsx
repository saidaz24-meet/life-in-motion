import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import RecapGateOverlay from "../../components/intro/RecapGateOverlay";
import { useIntroGate } from "../hooks/useIntroGate";
import DebugHUD from "../../components/intro/DebugHUD";

const INTRO_COMPLETED_KEY = "introCompleted";

export default function IntroGatePage() {
  const navigate = useNavigate();
  const { shouldShow, complete, skip } = useIntroGate();
  const [isIntroGateOverlayMounted, setIsIntroGateOverlayMounted] = useState(false);
  const hasNavigatedRef = useRef(false);
  
  // Check for debug query params
  const searchParams = new URLSearchParams(window.location.search);
  const showDebug = searchParams.get("debug") === "1";
  const forceShow = searchParams.get("forceShow") === "1";

  // Navigate if intro already completed (on mount only)
  useEffect(() => {
    const hasCompleted = localStorage.getItem(INTRO_COMPLETED_KEY) === "1";
    if (hasCompleted && !forceShow && !hasNavigatedRef.current) {
      hasNavigatedRef.current = true;
      console.log("[IntroGatePage] Intro already completed, navigating to /story");
      navigate("/story", { replace: true });
    }
  }, [navigate, forceShow]);

  const handleComplete = () => {
    if (hasNavigatedRef.current) {
      console.log("[IntroGatePage] handleComplete blocked - already navigated");
      return;
    }
    
    console.log("[IntroGatePage] RecapGateOverlay onComplete");
    // Set localStorage BEFORE navigation to prevent guard redirects
    localStorage.setItem(INTRO_COMPLETED_KEY, "1");
    complete();
    hasNavigatedRef.current = true;
    // Use imperative navigation with replace to remove intro from history
    navigate("/story", { replace: true });
  };

  const handleSkip = () => {
    if (hasNavigatedRef.current) {
      console.log("[IntroGatePage] handleSkip blocked - already navigated");
      return;
    }
    
    console.log("[IntroGatePage] RecapGateOverlay onSkip");
    // Set localStorage BEFORE navigation to prevent guard redirects
    localStorage.setItem(INTRO_COMPLETED_KEY, "1");
    skip();
    hasNavigatedRef.current = true;
    // Use imperative navigation with replace to remove intro from history
    navigate("/story", { replace: true });
  };

  return (
    <>
      {(import.meta.env.DEV || showDebug) && (
        <DebugHUD
          pathname="/"
          timelineLength={0}
          shouldShowIntroGate={shouldShow}
          isIntroGateOverlayMounted={isIntroGateOverlayMounted}
          isStoryShellMounted={false}
          showDebug={showDebug}
        />
      )}
      <AnimatePresence mode="wait">
        {shouldShow && !hasNavigatedRef.current && (
          <RecapGateOverlay
            onComplete={handleComplete}
            onSkip={handleSkip}
            onMountChange={setIsIntroGateOverlayMounted}
          />
        )}
      </AnimatePresence>
    </>
  );
}