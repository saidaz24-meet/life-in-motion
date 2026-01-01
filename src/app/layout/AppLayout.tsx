import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../components/layout/Header";
import PageFooter from "../../components/layout/PageFooter";
import ScrollToTop from "../../components/layout/ScrollToTop";

export default function AppLayout() {
  const location = useLocation();
  const isIntroRoute = location.pathname === "/";

  // Temporary dev logging
  useEffect(() => {
    console.log("[APP NAV]", location.pathname, location.key);
  }, [location.key, location.pathname]);

  console.log("[APP LAYOUT RENDER]", location.pathname);

  return (
    <>
      <ScrollToTop />
      <div className="fixed inset-0 overflow-hidden">
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

      {/* Page content with transitions - offset for fixed header */}
      <div className={`relative z-0 h-full overflow-y-auto ${isIntroRoute ? "" : "pt-[57px]"}`} data-scroll-container>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.key}
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
            className={`flex flex-col ${isIntroRoute ? "min-h-[100dvh]" : "min-h-[calc(100dvh-57px)]"}`}
          >
            <div className="flex-1">
              <Outlet />
            </div>
            {!isIntroRoute && <PageFooter />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
    </>
  );
}

