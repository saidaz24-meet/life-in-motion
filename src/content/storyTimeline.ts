/**
 * Story Timeline - Cinematic scenes for the Story page
 * Each scene: hero media + 3 beats + optional linked content items
 */

export interface StoryTimelineScene {
  id: string;
  title: string;
  beats: [string, string, string]; // Exactly 3 beats
  mediaRef: string; // Path to existing public asset
  itemIds?: string[]; // Optional linked content item IDs
}

export const STORY_TIMELINE_SCENES: StoryTimelineScene[] = [
  {
    id: "scene-1",
    title: "Life in Motion",
    beats: [
      "I build to make things clearer",
      "I move to stay grounded",
      "I lead by showing up"
    ],
    mediaRef: "/images/profile/hero.JPEG",
    itemIds: []
  },
  {
    id: "scene-2",
    title: "Rigor and Identity",
    beats: [
      "A demanding school chapter shaped my discipline",
      "I learned to stay open and steady in a mixed environment",
      "Friendships and friction, both taught me"
    ],
    mediaRef: "/images/life/school-leyada/g2-graduating.jpg",
    itemIds: ["school-leyada"]
  },
  {
    id: "scene-3",
    title: "Bridge Building",
    beats: [
      "MEET trained my craft and my responsibility",
      "You build, then you talk, then you build again",
      "Trust is built through shared work"
    ],
    mediaRef: "/images/life/meet/1d9300b2-2414-473f-90b8-e562e2899c34.JPG",
    itemIds: ["meet"]
  },
  {
    id: "scene-4",
    title: "RoofMate",
    beats: [
      "Roommate matching is a trust problem",
      "We chose an app-first product on purpose",
      "Built to make \"the other\" feel like a roommate"
    ],
    mediaRef: "/images/life/roofmate/g10-expo-night.jpeg",
    itemIds: ["roofmate"]
  },
  {
    id: "scene-5",
    title: "Teaching",
    beats: [
      "Teaching exposed what I did not fully understand yet",
      "I watched what students fear, and what helps",
      "I started building tools to reduce prep friction"
    ],
    mediaRef: "/images/life/meet-TA/g5-class-pic.jpg",
    itemIds: ["meet-ta", "bml-advanced-track"]
  },
  {
    id: "scene-6",
    title: "Research",
    beats: [
      "Brilliant science can be slowed by glue work",
      "So I rebuilt the workflow into a platform",
      "Runs cached by sequence hash, less recompute, more insight"
    ],
    mediaRef: "/images/life/pvl/DESY-delegation/hero.jpg",
    itemIds: ["pvl-internship"]
  },
  {
    id: "scene-7",
    title: "Service",
    beats: [
      "Less about hours. More about presence",
      "I learned the difference between helping and performing help",
      "Showing up quietly still matters"
    ],
    mediaRef: "/images/life/volunteering/hero.jpg",
    itemIds: ["volunteering"]
  },
  {
    id: "scene-8",
    title: "Movement",
    beats: [
      "When life gets loud, my body remembers the rhythm",
      "Discipline built through repetition",
      "Culture carried through motion"
    ],
    mediaRef: "/images/life/dabka/Budapest-international-festival.JPG",
    itemIds: ["dabka"]
  },
  {
    id: "scene-9",
    title: "The Path Forward",
    beats: [
      "Each chapter builds on the last",
      "Craft, community, and conscience, woven together",
      "Ready to continue the journey"
    ],
    mediaRef: "/images/profile/hero.JPEG",
    itemIds: []
  }
];
