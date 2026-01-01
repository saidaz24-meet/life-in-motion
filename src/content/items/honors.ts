import { ALL_ITEMS } from "./all";
import type { ContentItem } from "../types";

export const honors: ContentItem[] = ALL_ITEMS.filter((i) => i.type === "honor");

/**
 * Get a content item by its ID
 * @param id - The item ID to look up
 * @returns The ContentItem if found, undefined otherwise
 */
export function getItemById(id: string): ContentItem | undefined {
  return ALL_ITEMS.find((item) => item.id === id);
}
