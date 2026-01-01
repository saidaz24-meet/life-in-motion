import { ALL_ITEMS } from "./all";
import type { ContentItem } from "../types";

/**
 * Get a content item by its ID
 * @param id - The item ID to look up
 * @returns The ContentItem if found, undefined otherwise
 */
export function getItemById(id: string): ContentItem | undefined {
  return ALL_ITEMS.find((item) => item.id === id);
}

/**
 * Get all items of a specific type
 * @param type - The content type to filter by
 * @returns Array of ContentItems matching the type
 */
export function getItemsByType(
  type: ContentItem["type"]
): ContentItem[] {
  return ALL_ITEMS.filter((item) => item.type === type);
}

/**
 * Get all public items (filtered by privacy)
 * @returns Array of public ContentItems
 */
export function getPublicItems(): ContentItem[] {
  return ALL_ITEMS.filter((item) => item.privacy === "public");
}

// Re-export for convenience
export { ALL_ITEMS } from "./all";
export { ventures } from "./ventures";
export { honors } from "./honors";
export { experiences } from "./experiences";
export { books } from "./books";

