import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "../../app/providers/SoundProvider";
import { clsx } from "clsx";

interface SoundToggleProps {
  className?: string;
  size?: "sm" | "md";
}

export default function SoundToggle({ className, size = "md" }: SoundToggleProps) {
  const { isEnabled, toggleSound } = useSound();

  const iconSize = size === "sm" ? "w-3 h-3" : "w-4 h-4";
  const padding = size === "sm" ? "p-1.5" : "p-2";

  return (
    <button
      onClick={toggleSound}
      className={clsx(
        padding,
        "rounded-md transition-all duration-200 ease-out",
        "bg-white/5 hover:bg-white/10 active:bg-white/15",
        "border border-white/10 hover:border-white/20",
        "text-[rgb(var(--fg-1))] hover:text-[rgb(var(--fg-0))]",
        "hover:-translate-y-0.5 active:translate-y-0",
        "hover:shadow-[0_2px_8px_rgba(120,220,255,0.1)]",
        // Visible focus ring for accessibility (high contrast)
        "focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-black",
        className
      )}
      aria-label={isEnabled ? "Disable sound effects" : "Enable sound effects"}
    >
      {isEnabled ? (
        <Volume2 className={iconSize} />
      ) : (
        <VolumeX className={clsx(iconSize, "opacity-50")} />
      )}
    </button>
  );
}

