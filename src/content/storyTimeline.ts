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
      "I Love Building",
      "I lead by showing up...no matter what",
      "I am a reciepe that can make up dozens of dishes...only time will tell",
    ],
    mediaRef: "/images/profile/hero.JPEG",
    itemIds: []
  },
  {
    id: "scene-2",
    title: "Rigor and Identity",
    beats: [
      "A demanding school chapter shaped my perspective",
      "I learned to stay open and steady in a mixed environment",
      "Friendships & friction"
    ],
    mediaRef: "/images/life/school-leyada/g2-graduating.jpg",
    itemIds: ["school-leyada"]
  },
  {
    id: "scene-3",
    title: "Bridge Building",
    beats: [
      "You see the best in others when someone helps you see the best in yourself",
      "You build, then you talk, then you build again",
      "Trust is built through shared work & compound interest"
    ],
    mediaRef: "/images/life/meet/1d9300b2-2414-473f-90b8-e562e2899c34.JPG",
    itemIds: ["meet"]
  },
  {
    id: "scene-4",
    title: "RoofMate",
    beats: [
      "Roommate matching is a trust problem...especially in Israel",
      "We chose an app-first product on purpose",
      "Built to make \"the other\" be...a roommate"
    ],
    mediaRef: "/images/life/roofmate/g10-expo-night.jpeg",
    itemIds: ["roofmate"]
  },
  {
    id: "scene-5",
    title: "Teaching",
    beats: [
      "Teaching exposed what I did not fully understand yet",
      "Implemented principles and planted seeds",
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
      "Just do it!"
    ],
    mediaRef: "/images/life/pvl/DESY-delegation/hero.jpg",
    itemIds: ["pvl-internship"]
  },
  {
    id: "scene-7",
    title: "Service",
    beats: [
      "Unus pro omnibus, omnes pro uno",
      "A whole different side of me",
      "Community comes first"
    ],
    mediaRef: "/images/life/volunteering/hero.jpg",
    itemIds: ["volunteering"]
  },
  {
    id: "scene-8",
    title: "Movement",
    beats: [
      "Pure Passion",
      "Inner tranquility",
      "Despite the loud music tho"
    ],
    mediaRef: "/images/life/dabka/Budapest-international-festival.JPG",
    itemIds: ["dabka"]
  },
  {
    id: "scene-9",
    title: "The Path Forward",
    beats: [
      "Each chapter builds on the last",
      "me & you vs life's journey",
      "all in"
    ],
    mediaRef: "/images/profile/hero.JPEG",
    itemIds: []
  }
];
