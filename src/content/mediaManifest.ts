/**
 * Media manifest: maps item ID to media assets
 * Uses paths exactly as provided. Missing assets are empty string/array.
 * Note: This file is kept for backward compatibility. The source of truth is ALL_ITEMS in items/all.ts
 */

import { ALL_ITEMS } from "./items/all";
import type { Media } from "./types";

const mediaTable: Record<string, Media> = {};

// Build manifest from ALL_ITEMS
ALL_ITEMS.forEach((item) => {
  mediaTable[item.id] = item.media;
});

// Legacy: Remove duplicate g10-expo-night.jpeg from RoofMate gallery if it exists
if (mediaTable["roofmate"]?.gallery) {
  const heroImage = mediaTable["roofmate"].heroImage;
  mediaTable["roofmate"].gallery = mediaTable["roofmate"].gallery.filter(
    (path) => path !== heroImage
  );
}

export const MEDIA_MANIFEST = mediaTable;

/**
 * Get media for a specific item by ID
 * @param id - The item ID to look up
 * @returns Media object or undefined if not found
 */
export function getMediaById(id: string): Media | undefined {
  return mediaTable[id];
}

/**
 * @deprecated Use getMediaById instead
 */
export function getMedia(id: string): Media | undefined {
  return getMediaById(id);
}

/**
 * Get all media paths for preloading/validation
 */
export function getAllMediaPaths(): string[] {
  const paths: string[] = [];
  Object.values(mediaTable).forEach((media) => {
    if (media.heroImage) paths.push(media.heroImage);
    if (media.heroVideo) paths.push(media.heroVideo);
    if (media.teaserVideo) paths.push(media.teaserVideo);
    media.gallery.forEach((path) => {
      if (path) paths.push(path);
    });
  });
  return paths.filter(Boolean);
}
