/**
 * Debug HUD - DEV-only overlay for debugging intro gate and story issues
 * Can be enabled with ?debug=1 query param in production
 */

interface DebugHUDProps {
  pathname: string;
  timelineLength: number;
  shouldShowIntroGate: boolean;
  isIntroGateOverlayMounted: boolean;
  isStoryShellMounted: boolean;
  showDebug?: boolean;
}

export default function DebugHUD({
  pathname,
  timelineLength,
  shouldShowIntroGate,
  isIntroGateOverlayMounted,
  isStoryShellMounted,
  showDebug = false,
}: DebugHUDProps) {
  // Show in dev mode or when ?debug=1 is present
  if (!import.meta.env.DEV && !showDebug) {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 z-[9999] bg-black/90 border border-white/20 rounded-lg p-4 font-mono text-xs text-white max-w-sm">
      <div className="font-bold mb-2 text-yellow-400">
        DEBUG HUD {showDebug && !import.meta.env.DEV ? "(?debug=1)" : "(DEV)"}
      </div>
      <div className="space-y-1">
        <div>
          <span className="text-gray-400">Route:</span>{" "}
          <span className="text-blue-400">{pathname}</span>
        </div>
        <div>
          <span className="text-gray-400">Timeline length:</span>{" "}
          <span className={timelineLength > 0 ? "text-green-400" : "text-red-400"}>
            {timelineLength}
          </span>
        </div>
        <div>
          <span className="text-gray-400">IntroGate shouldShow:</span>{" "}
          <span className={shouldShowIntroGate ? "text-green-400" : "text-red-400"}>
            {String(shouldShowIntroGate)}
          </span>
        </div>
        <div>
          <span className="text-gray-400">IntroGateOverlay mounted:</span>{" "}
          <span className={isIntroGateOverlayMounted ? "text-green-400" : "text-red-400"}>
            {String(isIntroGateOverlayMounted)}
          </span>
        </div>
        <div>
          <span className="text-gray-400">StoryShell mounted:</span>{" "}
          <span className={isStoryShellMounted ? "text-green-400" : "text-red-400"}>
            {String(isStoryShellMounted)}
          </span>
        </div>
        <div className="pt-2 border-t border-white/10 mt-2">
          <span className="text-gray-400">Story State:</span>{" "}
          <span className={isStoryShellMounted && timelineLength > 0 ? "text-green-400" : "text-red-400"}>
            {isStoryShellMounted && timelineLength > 0 ? "OK" : "ERROR"}
          </span>
        </div>
      </div>
    </div>
  );
}

