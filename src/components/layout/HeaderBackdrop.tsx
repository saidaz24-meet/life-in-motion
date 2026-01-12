/**
 * HeaderBackdrop - Shallow scrim gradient behind header for smooth header → media transition
 * 
 * This component creates a subtle gradient overlay that sits behind the header,
 * ensuring media content never visually bleeds into the header's border/shadow line.
 * It provides a premium, continuous transition between header and hero media.
 */

export default function HeaderBackdrop() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[29] pointer-events-none"
      aria-hidden="true"
      style={{
        // Match header height: py-4 = 1rem top + 1rem bottom = 32px total, plus border = ~64px
        // Use calc to include safe-area inset for mobile
        height: 'calc(env(safe-area-inset-top, 0px) + 4rem)',
        background: `
          linear-gradient(to bottom,
            rgba(10, 10, 12, 0.95) 0%,
            rgba(10, 10, 12, 0.85) 30%,
            rgba(10, 10, 12, 0.6) 60%,
            rgba(10, 10, 12, 0.3) 80%,
            transparent 100%
          )
        `,
      }}
    />
  );
}
