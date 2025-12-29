import { Linkedin, Mail } from "lucide-react";
import { clsx } from "clsx";

export default function PageFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 py-6 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Copyright */}
        <span className="text-xs text-[rgb(var(--fg-1))] whitespace-nowrap">© 2026</span>

        {/* Center: Smile */}
        <span className="text-sm text-[rgb(var(--fg-1))]">Smile.</span>

        {/* Right: Icons */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/saidazaizah"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "p-2 rounded-md transition-all duration-200 ease-out",
              "hover:bg-white/5 active:bg-white/10",
              "border border-white/10 hover:border-white/20",
              "text-[rgb(var(--fg-1))] hover:text-[rgb(var(--fg-0))]",
              "hover:-translate-y-0.5 active:translate-y-0",
              "hover:shadow-[0_2px_8px_rgba(120,220,255,0.1)]",
              "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-1 focus:ring-offset-transparent"
            )}
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          {/* Mail */}
          <a
            href="mailto:said@example.com"
            className={clsx(
              "p-2 rounded-md transition-all duration-200 ease-out",
              "hover:bg-white/5 active:bg-white/10",
              "border border-white/10 hover:border-white/20",
              "text-[rgb(var(--fg-1))] hover:text-[rgb(var(--fg-0))]",
              "hover:-translate-y-0.5 active:translate-y-0",
              "hover:shadow-[0_2px_8px_rgba(120,220,255,0.1)]",
              "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-1 focus:ring-offset-transparent"
            )}
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

