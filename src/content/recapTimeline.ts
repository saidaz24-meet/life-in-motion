import type { Tag } from "./meta";

export interface RecapMilestone {
  id: string;
  dateLabel: string; // e.g., "2019", "2021", "2024 — DESY"
  title: string; // short: "MEET", "Germany Internship", "Technion Job", "RoofMate", "PVL", "Tutoring", "Dabka", "Running"
  intensity: number; // 0–1 to vary bar height subtly
  tags: Tag[];
}

export const RECAP_MILESTONES: RecapMilestone[] = [
  {
    id: "milestone-meet",
    dateLabel: "2019",
    title: "MEET",
    intensity: 0.7,
    tags: ["Community", "Leadership"],
  },
  {
    id: "milestone-germany",
    dateLabel: "2020",
    title: "Germany Internship",
    intensity: 0.8,
    tags: ["Research", "Bridge-building"],
  },
  {
    id: "milestone-technion",
    dateLabel: "2021",
    title: "Technion Job",
    intensity: 0.9,
    tags: ["Research", "Leadership"],
  },
  {
    id: "milestone-roofmate",
    dateLabel: "2022",
    title: "RoofMate",
    intensity: 0.85,
    tags: ["Entrepreneurship", "Leadership"],
  },
  {
    id: "milestone-pvl",
    dateLabel: "2023",
    title: "PVL",
    intensity: 0.75,
    tags: ["Research", "Community"],
  },
  {
    id: "milestone-tutoring",
    dateLabel: "2023",
    title: "Tutoring",
    intensity: 0.6,
    tags: ["Community", "Bridge-building"],
  },
  {
    id: "milestone-dabka",
    dateLabel: "2024",
    title: "Dabka",
    intensity: 0.65,
    tags: ["Movement", "Craft", "Identity"],
  },
  {
    id: "milestone-running",
    dateLabel: "2024 — DESY",
    title: "Running",
    intensity: 0.7,
    tags: ["Movement", "Craft"],
  },
];

