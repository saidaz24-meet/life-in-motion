import type { Tag } from "./meta";

export interface StoryScene {
  id: string;
  headline: string;
  beats: string[];
  body: string;
  media: {
    type: "image" | "teaser";
    src: string;
    alt?: string;
  };
  year: number;
  tags: Tag[];
}

export const STORY_SCENES: StoryScene[] = [
  {
    id: "scene-1",
    headline: "The Beginning",
    beats: [
      "Growing up in a multicultural environment",
      "Early fascination with technology and community",
      "First experiences bridging different worlds",
    ],
    body: "This is where the journey began. A place where different cultures, languages, and perspectives converged, shaping a unique worldview that would later define my path.",
    media: {
      type: "image",
      src: "/placeholder-scene-1.jpg",
      alt: "Early beginnings",
    },
    year: 2010,
    tags: ["Identity", "Community"],
  },
  {
    id: "scene-2",
    headline: "Finding Purpose",
    beats: [
      "Discovering the power of education",
      "Mentoring others and seeing impact",
      "Realizing the importance of representation",
    ],
    body: "Through teaching and mentoring, I discovered that knowledge shared is power multiplied. Each student, each conversation, became a thread in a larger tapestry of change.",
    media: {
      type: "teaser",
      src: "/teasers/purpose-teaser.mp4",
    },
    year: 2015,
    tags: ["Leadership", "Bridge-building"],
  },
  {
    id: "scene-3",
    headline: "Breaking Barriers",
    beats: [
      "First major research breakthrough",
      "Navigating spaces where few looked like me",
      "Building bridges through innovation",
    ],
    body: "Research became more than academic pursuit—it became a way to challenge assumptions, open doors, and create opportunities for others who would follow.",
    media: {
      type: "image",
      src: "/placeholder-scene-3.jpg",
      alt: "Research and innovation",
    },
    year: 2018,
    tags: ["Research", "Bridge-building"],
  },
  {
    id: "scene-4",
    headline: "Building Ventures",
    beats: [
      "From idea to execution",
      "Assembling teams that believe",
      "Creating value beyond profit",
    ],
    body: "Entrepreneurship emerged as the natural next step—a way to turn vision into reality, to build solutions that matter, and to create lasting impact.",
    media: {
      type: "teaser",
      src: "/teasers/ventures-teaser.mp4",
    },
    year: 2020,
    tags: ["Entrepreneurship", "Leadership"],
  },
  {
    id: "scene-5",
    headline: "Movement and Craft",
    beats: [
      "Finding rhythm in motion",
      "Dance as expression and connection",
      "Running as meditation and clarity",
    ],
    body: "Movement became a language—dabka connecting to heritage, running clearing the mind, each step a reminder that progress comes through consistent motion.",
    media: {
      type: "image",
      src: "/placeholder-scene-5.jpg",
      alt: "Movement and expression",
    },
    year: 2022,
    tags: ["Movement", "Craft"],
  },
];

