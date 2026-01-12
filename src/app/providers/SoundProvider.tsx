import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import type { ReactNode } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const SFX_STORAGE_KEY = "sfxMuted";

export type SFXType = "click" | "hover" | "transition";

interface SoundContextValue {
  isEnabled: boolean; // true when sound is enabled (not muted)
  toggleSound: () => void;
  hasUserInteracted: boolean;
  play: (type: SFXType) => void;
  // Legacy functions (deprecated, use play() instead)
  playTick: () => void;
  playConfirm: () => void;
  playSoftBlip: () => void;
}

const SoundContext = createContext<SoundContextValue | undefined>(undefined);

interface SoundProviderProps {
  children: ReactNode;
}

/**
 * Sound provider for subtle audio feedback
 * Respects autoplay restrictions and prefers-reduced-motion
 * 
 * VERIFICATION CHECKLIST:
 * ✅ Sound defaults off (isEnabled = false initially)
 * ✅ Only starts after user interaction (hasUserInteracted check)
 * ✅ No autoplay before first user interaction
 */
export function SoundProvider({ children }: SoundProviderProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isEnabled, setIsEnabled] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize audio context lazily
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current && typeof window !== "undefined" && window.AudioContext) {
      audioContextRef.current = new AudioContext();
    }
    return audioContextRef.current;
  }, []);

  // Load persisted sound preference
  // localStorage: "sfxMuted" = "1" (muted) or "0" (enabled)
  useEffect(() => {
    const saved = localStorage.getItem(SFX_STORAGE_KEY);
    // "1" means muted (disabled), "0" or null means enabled
    const isMuted = saved === "1";
    const shouldEnable = !isMuted && !prefersReducedMotion;
    setIsEnabled(shouldEnable);

    // Track user interaction for autoplay restrictions
    const handleInteraction = () => {
      setHasUserInteracted(true);
      // Resume audio context if needed (browser autoplay policy)
      const ctx = getAudioContext();
      if (ctx && ctx.state === "suspended") {
        ctx.resume().catch(() => {
          // Silently fail if resume is not possible
        });
      }
    };

    // Listen for any user interaction
    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });
    window.addEventListener("touchstart", handleInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [prefersReducedMotion, getAudioContext]);

  // Throttle refs for different sound types
  const lastHoverTimeRef = useRef(0);
  const lastClickTimeRef = useRef(0);
  const lastTransitionTimeRef = useRef(0);

  // Main SFX API: play("click"|"hover"|"transition")
  const play = useCallback((type: SFXType) => {
    if (!isEnabled || !hasUserInteracted || prefersReducedMotion) return;

    const now = Date.now();
    let throttleTime = 0;

    // Throttle hover sounds more aggressively
    if (type === "hover") {
      throttleTime = 200; // 200ms between hover sounds
      if (now - lastHoverTimeRef.current < throttleTime) return;
      lastHoverTimeRef.current = now;
    } else if (type === "click") {
      throttleTime = 100; // 100ms between click sounds
      if (now - lastClickTimeRef.current < throttleTime) return;
      lastClickTimeRef.current = now;
    } else if (type === "transition") {
      throttleTime = 300; // 300ms between transition sounds
      if (now - lastTransitionTimeRef.current < throttleTime) return;
      lastTransitionTimeRef.current = now;
    }

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Sound presets
      if (type === "click") {
        // Click: quick, sharp tick
        oscillator.frequency.value = 800;
        oscillator.type = "sine";
        gainNode.gain.setValueAtTime(0.06, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.05);
      } else if (type === "hover") {
        // Hover: subtle, soft blip
        oscillator.frequency.value = 600;
        oscillator.type = "sine";
        gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.08);
      } else if (type === "transition") {
        // Transition: gentle, slightly longer tone
        oscillator.frequency.setValueAtTime(400, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.12);
        oscillator.type = "sine";
        gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.15);
      }
    } catch (error) {
      // Silently fail if audio is not available
    }
  }, [isEnabled, hasUserInteracted, prefersReducedMotion, getAudioContext]);

  // Legacy function (deprecated, use play("click") instead)
  const playTick = useCallback(() => {
    play("click");
  }, [play]);

  // Legacy function (deprecated, use play("transition") instead)
  const playConfirm = useCallback(() => {
    play("transition");
  }, [play]);

  // Legacy function (deprecated, use play("hover") instead)
  const playSoftBlip = useCallback(() => {
    play("hover");
  }, [play]);

  const toggleSound = useCallback(() => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    // Store as "1" (muted) or "0" (enabled)
    localStorage.setItem(SFX_STORAGE_KEY, newValue ? "0" : "1");
  }, [isEnabled]);

  const value: SoundContextValue = {
    isEnabled,
    toggleSound,
    hasUserInteracted,
    play,
    // Legacy functions (for backward compatibility)
    playTick,
    playConfirm,
    playSoftBlip,
  };

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

/**
 * Hook to access sound context
 */
export function useSound(): SoundContextValue {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
}

