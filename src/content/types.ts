import type { Tag } from "./meta";

export type { Tag };

/**
 * Content type discriminator
 */
export type ContentType = "venture" | "honor" | "experience" | "book";

/**
 * Privacy level for content items
 * - public: normal behavior, fully indexable
 * - unlisted: add noindex meta tag when modal is open
 * - proof-only: don't embed YouTube/video; show images + evidence only
 */
export type Privacy = "public" | "unlisted" | "proof-only";

/**
 * Media assets for a content item
 * - heroVideo: emotional/atmospheric video (highest priority for hero display)
 * - heroImage: fallback hero image
 * - teaserVideo: product demo video (used as fallback if no heroVideo/heroImage)
 * - youtubeUrl: external YouTube link
 * - gallery: array of gallery images
 */
export interface Media {
  heroImage: string;
  heroVideo?: string; // Optional emotional/atmospheric video
  teaserVideo: string;
  youtubeUrl: string;
  gallery: string[];
}

/**
 * Case file details (context, actions, impact, evidence)
 */
export interface CaseFile {
  context: string;
  whatIDid: string[];
  impact: string[];
  evidence: Array<{ label: string; url: string }>;
  deepDive: string;
}

/**
 * Card copy (hook, headline, subhead)
 */
export interface CardCopy {
  oneLiner: string;
  headline: string;
  subhead: string;
}

/**
 * Main content item interface
 */
export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  date: string;
  tags: Tag[];
  privacy: Privacy;
  media: Media;
  card: CardCopy;
  beats: string[];
  caseFile: CaseFile;
}

/**
 * Normalizes asset paths to ensure they start with `/` (for public assets)
 * Returns empty string if the path is falsy
 * 
 * @param path - The asset path to normalize
 * @returns Normalized path starting with `/` or empty string
 * 
 * @example
 * normalizeAsset("/images/hero.jpg") // "/images/hero.jpg"
 * normalizeAsset("images/hero.jpg")  // "/images/hero.jpg"
 * normalizeAsset("")                 // ""
 * normalizeAsset(null)                // ""
 */
export function normalizeAsset(path: string | null | undefined): string {
  if (!path) return "";
  return path.startsWith("/") ? path : `/${path}`;
}
