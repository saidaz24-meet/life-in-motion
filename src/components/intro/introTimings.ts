/**
 * Premium intro timing constants
 * Tuned for natural, human-like typing cadence
 */

// Base typing speed (milliseconds per character)
export const BASE_TYPING_SPEED_MS = 70;

// Variance for natural typing rhythm (random ± this amount)
export const TYPING_VARIANCE_MS = 25;

// Micro-pauses after punctuation (milliseconds)
export const PAUSE_AFTER_PERIOD_MS = 180; // After "."
export const PAUSE_AFTER_COMMA_MS = 120;  // After ","
export const PAUSE_AFTER_EMDASH_MS = 150; // After "—" or "–"
export const PAUSE_AFTER_QUESTION_MS = 180; // After "?"
export const PAUSE_AFTER_EXCLAMATION_MS = 200; // After "!"

// Line spacing - pause after line break (milliseconds)
export const PAUSE_AFTER_LINE_BREAK_MS = 350;

// Dots animation cadence (milliseconds between dot additions)
export const DOTS_INTERVAL_MS = 400; // Intentional, not too fast

// Pause steps - duration for explicit pause steps
export const DRAMATIC_PAUSE_MS = 500; // Short dramatic pause
export const MEDIUM_PAUSE_MS = 700;   // Medium pause between sections
export const LONG_PAUSE_MS = 900;     // Long pause before major transitions

// Logo cameo - delay before typing logo line after logo appears
export const LOGO_LINE_DELAY_MS = 700;

// Sound tick frequency - play tick every N characters (range)
export const SOUND_TICK_MIN_CHARS = 2;
export const SOUND_TICK_MAX_CHARS = 4;

// Fast-forward multiplier (reduces delays when Space is held)
export const FAST_FORWARD_MULTIPLIER = 0.15; // 15% of normal speed

/**
 * Get pause duration for a punctuation character
 */
export function getPunctuationPause(char: string): number {
  switch (char) {
    case ".":
      return PAUSE_AFTER_PERIOD_MS;
    case ",":
      return PAUSE_AFTER_COMMA_MS;
    case "—":
    case "–":
    case "-":
      return PAUSE_AFTER_EMDASH_MS;
    case "?":
      return PAUSE_AFTER_QUESTION_MS;
    case "!":
      return PAUSE_AFTER_EXCLAMATION_MS;
    default:
      return 0;
  }
}

/**
 * Check if a character is punctuation that should trigger a pause
 */
export function isPunctuationPause(char: string): boolean {
  return [".", ",", "—", "–", "-", "?", "!"].includes(char);
}

