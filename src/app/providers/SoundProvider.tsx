import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import type { ReactNode } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const SOUND_STORAGE_KEY = "lifeInMotion_soundEnabled";

interface SoundContextValue {
  isEnabled: boolean;
  toggleSound: () => void;
  hasUserInteracted: boolean;
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
  const lastTickTimeRef = useRef(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize audio context lazily
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current && typeof window !== "undefined" && window.AudioContext) {
      audioContextRef.current = new AudioContext();
    }
    return audioContextRef.current;
  }, []);

  // Load persisted sound preference
  useEffect(() => {
    const saved = localStorage.getItem(SOUND_STORAGE_KEY);
    const shouldEnable = saved === "true" && !prefersReducedMotion;
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

  // Play subtle tick sound (throttled)
  const playTick = useCallback(() => {
    if (!isEnabled || !hasUserInteracted || prefersReducedMotion) return;

    const now = Date.now();
    // Throttle: minimum 150ms between ticks
    if (now - lastTickTimeRef.current < 150) return;
    lastTickTimeRef.current = now;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Very subtle tick: high frequency, very short, very quiet
      oscillator.frequency.value = 800;
      oscillator.type = "sine";
      gainNode.gain.setValueAtTime(0.05, ctx.currentTime); // Very quiet
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.05);
    } catch (error) {
      // Silently fail if audio is not available
    }
  }, [isEnabled, hasUserInteracted, prefersReducedMotion, getAudioContext]);

  // Play confirm sound
  const playConfirm = useCallback(() => {
    if (!isEnabled || !hasUserInteracted || prefersReducedMotion) return;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Subtle confirm: quick upward tone
      oscillator.frequency.setValueAtTime(400, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
      oscillator.type = "sine";
      gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.15);
    } catch (error) {
      // Silently fail if audio is not available
    }
  }, [isEnabled, hasUserInteracted, prefersReducedMotion, getAudioContext]);

  // Play soft blip sound
  const playSoftBlip = useCallback(() => {
    if (!isEnabled || !hasUserInteracted || prefersReducedMotion) return;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Soft blip: gentle tone
      oscillator.frequency.value = 500;
      oscillator.type = "sine";
      gainNode.gain.setValueAtTime(0.06, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.12);
    } catch (error) {
      // Silently fail if audio is not available
    }
  }, [isEnabled, hasUserInteracted, prefersReducedMotion, getAudioContext]);

  const toggleSound = useCallback(() => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    localStorage.setItem(SOUND_STORAGE_KEY, String(newValue));
  }, [isEnabled]);

  const value: SoundContextValue = {
    isEnabled,
    toggleSound,
    hasUserInteracted,
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

