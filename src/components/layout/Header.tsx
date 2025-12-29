import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_TITLE } from "../../content/meta";
import { clsx } from "clsx";
import OverlayMenu from "../nav/OverlayMenu";
import SmileLogo from "../ui/SmileLogo";
import SoundToggle from "../ui/SoundToggle";

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

export default function Header() {
  const location = useLocation();
  const sectionLabel = ROUTE_LABELS[location.pathname] || "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track scroll on the scrollable container (works for both main scroll and Story's nested scroll)
  useEffect(() => {
    let rafId: number | null = null;
    
    const handleScroll = () => {
      if (rafId !== null) return;
      
      rafId = requestAnimationFrame(() => {
        const scrollContainer = document.querySelector('[data-scroll-container]') as HTMLElement;
        if (scrollContainer) {
          setIsScrolled(scrollContainer.scrollTop > 10);
        }
        rafId = null;
      });
    };

    const scrollContainer = document.querySelector('[data-scroll-container]') as HTMLElement;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
      // Check initial scroll position
      handleScroll();
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
        }
      };
    }
  }, []);

  // Generate unique ID for menu
  const menuId = "navigation-menu";

  // Handle hover to open menu
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    // Small delay before closing to prevent flickering
    hoverTimeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false);
    }, 100);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Get button position for menu positioning
  const [buttonPosition, setButtonPosition] = useState({ top: 0, right: 0 });
  
  useEffect(() => {
    const updatePosition = () => {
      if (menuButtonRef.current) {
        const rect = menuButtonRef.current.getBoundingClientRect();
        setButtonPosition({
          top: rect.bottom + 8,
          right: window.innerWidth - rect.right,
        });
      }
    };
    
    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [isMenuOpen]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4 border-b border-white/10"
        initial={false}
        animate={{
          backgroundColor: isScrolled ? "rgba(10, 10, 12, 0.85)" : "rgba(10, 10, 12, 0)",
          backdropFilter: isScrolled ? "blur(12px) saturate(180%)" : "blur(0px)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="flex items-center gap-3">
          <SmileLogo className="w-6 h-6 text-[rgb(var(--fg-0))]" />
          <h1 className="text-sm font-medium tracking-tight text-[rgb(var(--fg-0))]">
            {SITE_TITLE}
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Optional breadcrumb/section label with active state - hide Story label */}
          {sectionLabel && location.pathname !== "/" && (
            <span
              className={clsx(
                "text-xs tracking-wide uppercase transition-colors",
                "px-3 py-1 rounded-md",
                "bg-white/10 text-[rgb(var(--fg-0))] font-medium"
              )}
            >
              {sectionLabel}
            </span>
          )}

          {/* Sound toggle */}
          <SoundToggle size="sm" />
          
          {/* Menu button container with hover area */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              ref={menuButtonRef}
              type="button"
              data-menu-button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-controls={menuId}
              className={clsx(
                "p-2 rounded-md transition-all duration-200 ease-out",
                "hover:bg-white/5 active:bg-white/10",
                "border border-white/10 hover:border-white/20",
                "hover:-translate-y-0.5 active:translate-y-0",
                "hover:shadow-[0_4px_12px_rgba(120,220,255,0.15)]",
                "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent"
              )}
              aria-label="Menu"
              aria-expanded={isMenuOpen}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {isMenuOpen ? (
                  <X className="w-4 h-4 text-[rgb(var(--fg-0))]" />
                ) : (
                  <Menu className="w-4 h-4 text-[rgb(var(--fg-0))]" />
                )}
              </motion.div>
            </button>

            {/* Menu dropdown - positioned from button */}
            <OverlayMenu 
              id={menuId} 
              isOpen={isMenuOpen} 
              onClose={() => setIsMenuOpen(false)}
              buttonPosition={buttonPosition}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}

