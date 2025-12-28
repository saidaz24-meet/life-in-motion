import type { Tag } from "./meta";

export interface Venture {
  id: string;
  name: string;
  tagline: string;
  context: string;
  whatIBuilt: string[];
  impact: string[];
  proofLinks: Array<{
    label: string;
    url: string;
  }>;
  teaserMedia: {
    type: "image" | "teaser";
    src: string;
    alt?: string;
  };
  youtubeUrl?: string;
  tags: Tag[];
}

export const VENTURES: Venture[] = [
  {
    id: "roofmate",
    name: "RoofMate",
    tagline: "Connecting communities through shared spaces",
    context: "RoofMate emerged from recognizing the untapped potential of urban rooftops and shared spaces. In cities where space is at a premium, we saw an opportunity to create value while building community connections.",
    whatIBuilt: [
      "Platform connecting property owners with space seekers",
      "Trust and safety systems for community sharing",
      "Revenue models that benefit all stakeholders",
      "Mobile and web applications with seamless UX",
    ],
    impact: [
      "Enabled thousands of community connections",
      "Created new income streams for property owners",
      "Reduced urban space waste",
      "Built a sustainable sharing economy model",
    ],
    proofLinks: [
      { label: "RoofMate Website", url: "https://roofmate.example.com" },
      { label: "App Store", url: "https://apps.apple.com/roofmate" },
      { label: "Case Study", url: "https://example.com/roofmate-case-study" },
    ],
    teaserMedia: {
      type: "teaser",
      src: "/teasers/roofmate-teaser.mp4",
    },
    youtubeUrl: "https://youtube.com/watch?v=roofmate-demo",
    tags: ["Entrepreneurship", "Community", "Bridge-building"],
  },
  {
    id: "pvl",
    name: "PVL",
    tagline: "Empowering voices through technology",
    context: "PVL (Project Voice & Leadership) was born from the belief that everyone has a story worth telling and a voice worth amplifying. We built tools and platforms that make it easier for underrepresented voices to be heard.",
    whatIBuilt: [
      "Content creation and distribution platform",
      "Community engagement tools",
      "Analytics and insights dashboard",
      "Partnership network for amplification",
    ],
    impact: [
      "Amplified hundreds of diverse voices",
      "Created pathways for new storytellers",
      "Built sustainable content ecosystems",
      "Fostered cross-cultural understanding",
    ],
    proofLinks: [
      { label: "PVL Platform", url: "https://pvl.example.com" },
      { label: "Success Stories", url: "https://example.com/pvl-stories" },
      { label: "Media Kit", url: "https://example.com/pvl-media" },
    ],
    teaserMedia: {
      type: "image",
      src: "/placeholder-pvl.jpg",
      alt: "PVL platform",
    },
    tags: ["Entrepreneurship", "Community", "Leadership", "Bridge-building"],
  },
];

