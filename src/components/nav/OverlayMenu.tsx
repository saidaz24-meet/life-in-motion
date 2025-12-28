import { useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { clsx } from "clsx";

interface OverlayMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  path: string;
  description: string;
}

interface QuickJump {
  label: string;
  filter: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Honors (main)", path: "/honors", description: "Recognition and achievements" },
  { label: "Ventures", path: "/ventures", description: "Projects and initiatives" },
  { label: "Life Atlas", path: "/atlas", description: "Interactive journey map" },
  { label: "Books", path: "/books", description: "Reading and recommendations" },
  { label: "About", path: "/about", description: "Background and philosophy" },
  { label: "Contact", path: "/contact", description: "Get in touch" },
];

const QUICK_JUMPS: QuickJump[] = [
  { label: "MEET", filter: "meet" },
  { label: "Germany internship", filter: "germany-internship" },
  { label: "Technion job", filter: "technion-job" },
  { label: "Tutoring", filter: "tutoring" },
  { label: "Dabka", filter: "dabka" },
  { label: "Empowered", filter: "empowered" },
  { label: "Running", filter: "running" },
  { label: "Books", filter: "books" },
];

export default function OverlayMenu({ isOpen, onClose }: OverlayMenuProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const lastFocusableRef = useRef<HTMLButtonElement>(null);

  // Close on navigation (only when pathname actually changes, not on initial mount)
  const prevPathnameRef = useRef(location.pathname);
  useEffect(() => {
    if (isOpen && location.pathname !== prevPathnameRef.current) {
      prevPathnameRef.current = location.pathname;
      onClose();
    } else if (!isOpen) {
      prevPathnameRef.current = location.pathname;
    }
  }, [location.pathname, isOpen, onClose]);

  // Robust pointerdown outside handler (React 18 StrictMode safe)
  // Track when menu opened to ignore events that happened before handler was attached
  const menuOpenedAtRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (isOpen) {
      // Record when menu was opened (with small delay to let button click finish)
      menuOpenedAtRef.current = Date.now() + 10;
    } else {
      menuOpenedAtRef.current = null;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    // Get button ref synchronously when handler is attached
    const button = document.querySelector(
      'button[data-menu-button]'
    ) as HTMLButtonElement;
    menuButtonRef.current = button;

    const handlePointerDown = (event: PointerEvent) => {
      // Ignore events that happened before the menu was opened
      // This prevents catching the button's own click event
      if (menuOpenedAtRef.current && event.timeStamp < menuOpenedAtRef.current) {
        return;
      }

      const target = event.target as Node;
      
      // Ignore if clicking inside the menu panel
      if (menuRef.current?.contains(target)) {
        return;
      }
      
      // Ignore if clicking the menu button itself (check both ref and direct query)
      if (
        menuButtonRef.current?.contains(target) ||
        button?.contains(target) ||
        (target instanceof Element && target.closest('button[data-menu-button]'))
      ) {
        return;
      }
      
      // Close menu on outside click
      onClose();
    };

    // Use capture phase to catch events before they bubble
    document.addEventListener("pointerdown", handlePointerDown, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
    };
  }, [isOpen, onClose]);

  // ESC key handler
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements = menuRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    // Focus first element when menu opens
    setTimeout(() => {
      firstFocusableRef.current?.focus();
    }, 100);

    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleQuickJump = (filter: string) => {
    navigate(`/atlas?filter=${encodeURIComponent(filter)}`);
    onClose();
  };

  const handleBackdropClick = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onPointerDown={handleBackdropClick}
            aria-hidden="true"
          />

          {/* Menu panel */}
          <motion.div
            ref={menuRef}
            initial={{ 
              scale: 0.8,
              opacity: 0,
              y: -20,
            }}
            animate={{ 
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{ 
              scale: 0.8,
              opacity: 0,
              y: -20,
            }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              mass: 0.8,
            }}
            style={{
              transformOrigin: "top right",
            }}
            className="fixed inset-0 z-[201] flex flex-col overflow-y-auto pointer-events-none"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Glass panel container */}
            <div className="flex-1 flex flex-col m-6 glass rounded-lg border border-white/10 pointer-events-auto bg-[rgb(var(--bg-0))]/90 backdrop-blur-xl">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-lg font-medium text-[rgb(var(--fg-0))]">Navigation</h2>
                <button
                  ref={firstFocusableRef}
                  onClick={onClose}
                  className={clsx(
                    "p-2 rounded-md transition-colors",
                    "hover:bg-white/5 active:bg-white/10",
                    "border border-white/10 hover:border-white/20",
                    "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent"
                  )}
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-[rgb(var(--fg-0))]" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 space-y-12">
                {/* Main navigation */}
                <nav className="space-y-4" aria-label="Main navigation">
                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleNavClick(item.path)}
                      className={clsx(
                        "w-full text-left p-6 rounded-lg transition-all",
                        "hover:bg-white/5 active:bg-white/10",
                        "border border-white/10 hover:border-white/20",
                        "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent",
                        location.pathname === item.path && "bg-white/5 border-white/20"
                      )}
                    >
                      <div className="text-2xl font-semibold text-[rgb(var(--fg-0))] mb-1">
                        {item.label}
                      </div>
                      <div className="text-sm text-[rgb(var(--fg-1))]">
                        {item.description}
                      </div>
                    </button>
                  ))}
                </nav>

                {/* Quick Jumps */}
                <div>
                  <h3 className="text-sm font-medium text-[rgb(var(--fg-1))] uppercase tracking-wide mb-4">
                    Quick Jumps
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {QUICK_JUMPS.map((jump, index) => (
                      <button
                        key={jump.filter}
                        ref={index === QUICK_JUMPS.length - 1 ? lastFocusableRef : undefined}
                        onClick={() => handleQuickJump(jump.filter)}
                        className={clsx(
                          "px-4 py-2 rounded-full text-sm font-medium transition-all",
                          "bg-white/5 hover:bg-white/10 active:bg-white/15",
                          "border border-white/10 hover:border-white/20",
                          "text-[rgb(var(--fg-0))]",
                          "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent"
                        )}
                      >
                        {jump.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

