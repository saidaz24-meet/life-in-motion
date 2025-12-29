/**
 * Design tokens for consistent spacing, typography, motion, and layout
 * These are TypeScript constants that can be used in components
 */

// Container widths
export const CONTAINER = {
  full: "max-w-full",
  "7xl": "max-w-7xl", // Main page containers
  "6xl": "max-w-6xl",
  "4xl": "max-w-4xl", // Content containers
  "3xl": "max-w-3xl", // Narrow content
  "2xl": "max-w-2xl", // Descriptions, prose
  prose: "max-w-prose", // Optimal reading width
} as const;

// Spacing presets
export const SPACING = {
  // Horizontal padding
  pageX: "px-6 md:px-12 lg:px-16",
  // Vertical padding
  pageY: "py-12",
  pageYLarge: "py-16 md:py-24",
  // Section spacing
  section: "space-y-8 md:space-y-12",
  sectionLarge: "space-y-24 md:space-y-32",
  // Component padding
  card: "p-6 md:p-8",
  cardLarge: "p-8 md:p-12 lg:p-16",
} as const;

// Border radius presets
export const RADIUS = {
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-xl",
  full: "rounded-full",
} as const;

// Motion presets (durations in seconds, easing functions)
export const MOTION = {
  // Durations
  fast: 0.3,
  base: 0.4,
  normal: 0.6,
  slow: 0.8,
  // Easing
  easeOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
  easeInOut: [0.4, 0, 0.6, 1] as [number, number, number, number],
  easeIn: [0.4, 0, 1, 1] as [number, number, number, number],
} as const;

// Typography presets (class names for consistency)
export const TYPOGRAPHY = {
  // Headlines
  h1: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
  h2: "text-3xl md:text-4xl font-semibold",
  h3: "text-2xl md:text-3xl font-semibold",
  h4: "text-xl md:text-2xl font-semibold",
  // Body text
  body: "text-base md:text-lg leading-relaxed",
  bodySmall: "text-sm md:text-base",
  // Captions and labels
  caption: "text-sm text-[rgb(var(--fg-1))]",
  label: "text-xs uppercase tracking-wide",
  // Subheadings/descriptions
  subhead: "text-lg md:text-xl",
} as const;

