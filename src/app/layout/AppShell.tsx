import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { SITE_TITLE } from "../../content/meta";
import { clsx } from "clsx";
import OverlayMenu from "../../components/nav/OverlayMenu";

// Route to section label mapping
const ROUTE_LABELS: Record<string, string> = {
  "/": "Story",
  "/story": "Story",
  "/honors": "Honors",
  "/ventures": "Ventures",
  "/atlas": "Atlas",
  "/books": "Books",
  "/about": "About",
  "/contact": "Contact",
};

export default function AppShell() {
  const location = useLocation();
  const sectionLabel = ROUTE_LABELS[location.pathname] || "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

      {/* Top bar */}
      <div className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-white/10">
        <h1 className="text-sm font-medium tracking-tight text-[rgb(var(--fg-0))]">
          {SITE_TITLE}
        </h1>
        
        <div className="flex items-center gap-4">
          {/* Optional breadcrumb/section label */}
          {sectionLabel && (
            <span className="text-xs text-[rgb(var(--fg-1))] tracking-wide uppercase">
              {sectionLabel}
            </span>
          )}
          
          {/* Menu button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className={clsx(
              "p-2 rounded-md transition-colors",
              "hover:bg-white/5 active:bg-white/10",
              "border border-white/10 hover:border-white/20",
              "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent"
            )}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
          >
            <Menu className="w-4 h-4 text-[rgb(var(--fg-0))]" />
          </button>
        </div>
      </div>

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

      {/* Overlay Menu */}
      <OverlayMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
}

