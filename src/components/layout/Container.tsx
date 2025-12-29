import { ReactNode } from "react";
import { clsx } from "clsx";
import { CONTAINER, SPACING } from "../../styles/tokens";

interface ContainerProps {
  children: ReactNode;
  /** Container max-width variant */
  size?: keyof typeof CONTAINER;
  /** Horizontal padding preset */
  padding?: "pageX" | "none";
  /** Additional className */
  className?: string;
}

/**
 * Container component for consistent max-width and horizontal padding
 * Drop-in replacement for `max-w-* mx-auto` patterns
 */
export default function Container({
  children,
  size = "7xl",
  padding = "pageX",
  className,
}: ContainerProps) {
  return (
    <div
      className={clsx(
        CONTAINER[size],
        "mx-auto",
        padding === "pageX" && SPACING.pageX,
        className
      )}
    >
      {children}
    </div>
  );
}

