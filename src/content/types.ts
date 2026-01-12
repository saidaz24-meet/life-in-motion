import type { Tag } from "./meta";
import type { OrgId } from "./orgs";

export type { Tag };
export type { OrgId };

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
 * Explicit media role type
 */
export interface MediaRole {
  type: "image" | "video";
  src: string;
  label?: string;
}

/**
 * Media assets for a content item
 * 
 * New explicit roles (recommended):
 * - heroMedia: optional hero media (image or video) - highest priority for carousel
 * - demoMedia: optional demo video - distinct from hero, shown after hero
 * - teaserMedia: optional teaser video - shown after demo
 * - gallery: array of gallery images
 * 
 * Legacy fields (backward compatibility, lower priority in buildMediaArray):
 * - heroImage: fallback hero image
 * - heroVideo: fallback emotional/atmospheric video
 * - teaserVideo: fallback product demo video
 * - youtubeUrl: external YouTube link
 */
export interface Media {
  // New explicit roles (recommended)
  heroMedia?: MediaRole;
  demoMedia?: MediaRole; // video only
  teaserMedia?: MediaRole; // video only
  
  // Legacy fields (for backward compatibility)
  heroImage: string;
  heroVideo?: string;
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
 * Badge for organization logos or text
 */
export interface Badge {
  type: "logo" | "text";
  src?: string; // Required for "logo" type
  text?: string; // Required for "text" type
  alt?: string; // Recommended for "logo" type
}

/**
 * Card copy (hook, headline, subhead)
 */
export interface CardCopy {
  oneLiner: string;
  headline: string;
  subhead: string;
  microSummary?: string; // Optional 1-2 line description for admissions-friendly cards
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
  badges?: Badge[]; // Optional array of organization logos/text badges (legacy)
  orgIds?: OrgId[]; // Optional array of organization IDs (preferred over badges for org logos)
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
