import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../components/layout/Header";
import PageFooter from "../../components/layout/PageFooter";
import ScrollToTop from "../../components/layout/ScrollToTop";

export default function AppLayout() {
  const location = useLocation();
  const isIntroRoute = location.pathname === "/";
  const isStoryRoute = location.pathname === "/story";

  // Dev-only logging
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log("[APP NAV]", location.pathname, location.key);
    }
  }, [location.key, location.pathname]);

  if (import.meta.env.DEV) {
    console.log("[APP LAYOUT RENDER]", location.pathname);
  }

  return (
    <>
      <ScrollToTop />
      <div className="fixed inset-0 overflow-hidden flex flex-col h-[100dvh]">
        {/* Fixed cinematic background */}
        <div className="absolute inset-0">
          {/* Base dark background */}
          <div className="absolute inset-0 bg-[rgb(var(--bg-0))]" />
          
          {/* Animated gradient layer */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 20% 30%, rgba(120, 220, 255, 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 70%, rgba(120, 220, 255, 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 50%, rgba(120, 220, 255, 0.12) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 30%, rgba(120, 220, 255, 0.15) 0%, transparent 50%)",
              ],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          {/* Vignette overlay */}
          <div 
            className="absolute inset-0" 
            style={{
              background: "radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)",
            }}
          />
        </div>

        {/* Header - fixed at top (hidden on intro route) */}
        {!isIntroRoute && <Header />}

        {/* Page content with transitions - This is the ONLY scrolling container in the app */}
        {/* Mobile: Extend content into safe areas so it fills viewport including system bars */}
        <div 
          className={`relative z-0 pointer-events-auto flex-1 min-h-0 overflow-y-auto overscroll-behavior-contain ${isStoryRoute ? "overflow-hidden" : ""} ${isIntroRoute ? "" : "pt-[57px]"}`} 
          data-scroll-container
          style={{
            // Extend content into bottom safe area on mobile so it fills entire viewport
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            // Prevent over-scrolling past content (no rubber-band effect past footer)
            overscrollBehavior: 'contain',
            overscrollBehaviorY: 'contain',
          }}
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={location.key}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              }}
              className={`${isStoryRoute ? "h-full pointer-events-auto" : "flex flex-col min-h-full"} w-full`}
            >
              {isStoryRoute ? (
                <Outlet />
              ) : (
                <>
                  <main className="flex-1 w-full">
                    <Outlet />
                  </main>
                  {!isIntroRoute && (
                    <>
                      {/* End cap spacer to ensure footer is always reachable */}
                      <div className="h-8 flex-shrink-0" aria-hidden="true" />
                      <PageFooter />
                    </>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

