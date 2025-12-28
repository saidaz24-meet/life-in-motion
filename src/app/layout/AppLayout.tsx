import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../components/layout/Header";

export default function AppLayout() {
  const location = useLocation();

  return (
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

      {/* Header */}
      <Header />

      {/* Page content with transitions */}
      <div className="relative z-0 h-full overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

