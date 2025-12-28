import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { SITE_TITLE } from "../../content/meta";
import { clsx } from "clsx";
import OverlayMenu from "../nav/OverlayMenu";

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

  return (
    <>
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
            type="button"
            data-menu-button
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

      {/* Overlay Menu */}
      <OverlayMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

