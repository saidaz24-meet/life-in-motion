/**
 * Simple logo inspired by GitHub's Octocat
 * Features a person with a smile in a clean, minimal style
 * Now with subtle short curly hair (small arcs) for extra personality.
 */
export default function SmileLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Smile Logo"
      role="img"
    >
      {/* Head */}
      <circle cx="50" cy="42" r="22" fill="currentColor" />

      {/* Short curly hair (subtle arcs). Stroke so it scales well at small sizes */}
      <path
        d="M 38 22 C 41 18, 46 18, 48 22
           M 46 20 C 49 16, 54 16, 56 20
           M 54 22 C 57 18, 62 18, 64 22"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Smile */}
      <path
        d="M 33 42 Q 50 52 67 42"
        stroke="rgb(var(--bg-0))"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Eyes */}
      <circle cx="42" cy="37" r="2.5" fill="rgb(var(--bg-0))" />
      <circle cx="58" cy="37" r="2.5" fill="rgb(var(--bg-0))" />

      {/* Body */}
      <rect x="38" y="62" width="24" height="28" rx="6" fill="currentColor" />
    </svg>
  );
}
