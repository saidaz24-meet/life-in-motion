import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import RidahSequence from "../../components/intro/RidahSequence";
import { useIntroGate } from "../hooks/useIntroGate";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function IntroGatePage() {
  const navigate = useNavigate();
  const { shouldShow, complete } = useIntroGate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const hasNavigatedRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  const handleComplete = () => {
    if (hasNavigatedRef.current) {
      console.log("[IntroGatePage] handleComplete blocked - already navigated");
      return;
    }
    
    console.log("[IntroGatePage] RidahSequence onComplete");
    // Don't persist to localStorage - always show intro on next load
    complete();
    hasNavigatedRef.current = true;
    
    // Smooth transition: fade out intro, fade in site
    setIsTransitioning(true);
    setTimeout(() => {
    // Use imperative navigation with replace to remove intro from history
    navigate("/story", { replace: true });
    }, prefersReducedMotion ? 300 : 800);
  };


  return (
    <>
      <AnimatePresence mode="wait">
        {shouldShow && !hasNavigatedRef.current && (
          <>
            <RidahSequence
              onComplete={handleComplete}
            />
          </>
        )}
      </AnimatePresence>
      
      {/* Transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0.3 } : { duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-black pointer-events-none"
          />
        )}
      </AnimatePresence>
    </>
  );
}