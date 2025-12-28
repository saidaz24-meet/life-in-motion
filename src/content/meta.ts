export const SITE_TITLE = "Said Azaizah — Life in Motion";

export const TAGS = [
  "Identity",
  "Bridge-building",
  "Leadership",
  "Research",
  "Community",
  "Entrepreneurship",
  "Movement",
  "Craft",
] as const;

export type Tag = (typeof TAGS)[number];
