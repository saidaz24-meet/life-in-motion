import { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import RecapGateOverlay from "../../components/intro/RecapGateOverlay";
import { useIntroGate } from "../hooks/useIntroGate";
import DebugHUD from "../../components/intro/DebugHUD";

const INTRO_COMPLETED_KEY = "introCompleted";

export default function IntroGatePage() {
  const { shouldShow, complete, skip } = useIntroGate();
  const [isIntroGateOverlayMounted, setIsIntroGateOverlayMounted] = useState(false);
  const hasNavigatedRef = useRef(false);
  
  // Check for debug query params
  const searchParams = new URLSearchParams(window.location.search);
  const showDebug = searchParams.get("debug") === "1";
  const forceShow = searchParams.get("forceShow") === "1";

  // Check localStorage ONCE on mount
  const [shouldNavigate, setShouldNavigate] = useState(() => {
    return localStorage.getItem(INTRO_COMPLETED_KEY) === "1";
  });

  // Prevent double navigation in StrictMode
  useEffect(() => {
    if (shouldNavigate && !hasNavigatedRef.current) {
      hasNavigatedRef.current = true;
      console.log("[IntroGatePage] Navigation triggered");
    }
  }, [shouldNavigate]);

  // Navigate if intro already completed
  if (shouldNavigate && !forceShow && !hasNavigatedRef.current) {
    hasNavigatedRef.current = true;
    return <Navigate to="/story" replace />;
  }

  const handleComplete = () => {
    if (hasNavigatedRef.current) {
      console.log("[IntroGatePage] handleComplete blocked - already navigated");
      return;
    }
    
    console.log("[IntroGatePage] RecapGateOverlay onComplete");
    localStorage.setItem(INTRO_COMPLETED_KEY, "1");
    complete();
    setShouldNavigate(true);
  };

  const handleSkip = () => {
    if (hasNavigatedRef.current) {
      console.log("[IntroGatePage] handleSkip blocked - already navigated");
      return;
    }
    
    console.log("[IntroGatePage] RecapGateOverlay onSkip");
    localStorage.setItem(INTRO_COMPLETED_KEY, "1");
    skip();
    setShouldNavigate(true);
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
        {shouldShow && !shouldNavigate && (
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