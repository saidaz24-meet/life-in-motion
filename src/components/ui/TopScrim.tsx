/**
 * TopScrim - Subtle top gradient overlay for header/media blending
 * Provides a very shallow gradient that blends hero media with fixed header
 * Keeps it cinematic and subtle, no harsh seams
 */
export default function TopScrim() {
  return (
    <div
      className="absolute inset-x-0 top-0 pointer-events-none z-10 h-12 md:h-16"
      style={{
        background: `
          linear-gradient(to bottom,
            rgba(0, 0, 0, 0.6) 0%,
            rgba(0, 0, 0, 0.2) 50%,
            transparent 100%
          )
        `,
      }}
      aria-hidden="true"
    />
  );
}

