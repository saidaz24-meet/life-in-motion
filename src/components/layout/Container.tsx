import type { ReactNode } from "react";
import { clsx } from "clsx";
import { CONTAINER } from "../../styles/tokens";

interface ContainerProps {
  children: ReactNode;
  /** Container max-width variant */
  size?: keyof typeof CONTAINER;
  /** Horizontal padding preset - Apple-like responsive spacing */
  padding?: "pageX" | "none";
  /** Additional className */
  className?: string;
}

/**
 * Container component for consistent max-width and horizontal padding
 * Drop-in replacement for `max-w-* mx-auto` patterns
 * Uses responsive padding: px-4 sm:px-6 lg:px-8 for mobile-first approach
 */
export default function Container({
  children,
  size = "6xl",
  padding = "pageX",
  className,
}: ContainerProps) {
  return (
    <div
      className={clsx(
        CONTAINER[size],
        "mx-auto",
        padding === "pageX" && "px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
}

