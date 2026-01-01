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
    title: "Where It Began",
    beats: [
      "A school built for rigor and identity",
      "Learning to earn my space in demanding halls",
      "Friendships and friction—both taught me"
    ],
    mediaRef: "/images/life/school-leyada/g2-graduating.jpg",
    itemIds: ["school-leyada"]
  },
  {
    id: "scene-2",
    title: "Building Bridges",
    beats: [
      "You build, then you talk, then you build again",
      "Differences don't vanish; they become constraints",
      "MEET made my ambition more responsible"
    ],
    mediaRef: "/images/life/meet/1d9300b2-2414-473f-90b8-e562e2899c34.JPG",
    itemIds: ["meet"]
  },
  {
    id: "scene-3",
    title: "Roommates, Not Headlines",
    beats: [
      "A nonprofit, Android-first matching platform",
      "Built with a binational team through MEET",
      "Expo night: strangers thanked us like it mattered"
    ],
    mediaRef: "/images/life/roofmate/g10-expo-night.jpeg",
    itemIds: ["roofmate"]
  },
  {
    id: "scene-4",
    title: "Teaching as Engineering",
    beats: [
      "Tracebacks as puzzles, not failures",
      "I watched what students fear—and what helps",
      "Then I built tools to scale that help"
    ],
    mediaRef: "/images/life/meet-TA/g5-class-pic.jpg",
    itemIds: ["meet-ta", "bml-advanced-track"]
  },
  {
    id: "scene-5",
    title: "Winning Under Pressure",
    beats: [
      "A waiting room turned into a product problem",
      "A form that took hours became minutes",
      "Winning mattered. The use-case mattered more"
    ],
    mediaRef: "/images/life/huji-hackathon-win/hero.jpg",
    itemIds: ["huji-hackathon-win"]
  },
  {
    id: "scene-6",
    title: "From Spreadsheets to Insight",
    beats: [
      "Manual triage became a product problem",
      "Runs cached by sequence hash—less recompute, more insight",
      "Designed to ship into labs, not stay as scripts"
    ],
    mediaRef: "/images/life/pvl/DESY-delegation/hero.jpg",
    itemIds: ["pvl-internship"]
  },
  {
    id: "scene-7",
    title: "Rhythm That Grounds",
    beats: [
      "Nine years. Six hours a week",
      "Movement as discipline, not escape",
      "Motion as a way to stay human"
    ],
    mediaRef: "/images/life/dabka/Budapest-international-festival.JPG",
    itemIds: ["dabka"]
  },
  {
    id: "scene-8",
    title: "Showing Up",
    beats: [
      "Less about hours. More about presence",
      "Serving without needing a stage",
      "Building a life that's useful to others"
    ],
    mediaRef: "/images/life/volunteering/hero.jpg",
    itemIds: ["volunteering"]
  },
  {
    id: "scene-9",
    title: "The Path Forward",
    beats: [
      "Each chapter builds on the last",
      "Craft, community, and conscience—woven together",
      "Ready to continue the journey"
    ],
    mediaRef: "/images/profile/hero.JPEG",
    itemIds: []
  }
];

