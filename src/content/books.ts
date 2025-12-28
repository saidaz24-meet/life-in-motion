import type { Tag } from "./meta";

export interface Book {
  id: string;
  title: string;
  author: string;
  whyILovedIt: string;
  takeaway: string;
  relatedTags: Tag[];
}

export const BOOKS: Book[] = [
  {
    id: "book-1",
    title: "The Innovator's Dilemma",
    author: "Clayton Christensen",
    whyILovedIt: "This book fundamentally changed how I think about innovation and disruption. Christensen's framework for understanding why successful companies fail provides powerful insights for anyone building something new.",
    takeaway: "Disruptive innovation often comes from unexpected places, and the very things that make companies successful can blind them to emerging threats and opportunities.",
    relatedTags: ["Entrepreneurship", "Research"],
  },
  {
    id: "book-2",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    whyILovedIt: "Harari's sweeping narrative of human history helped me understand the power of shared stories and collective imagination. It's a reminder that the stories we tell shape the world we create.",
    takeaway: "Human cooperation at scale is built on shared fictions—whether they're religions, nations, or corporations. Understanding this helps us build better systems.",
    relatedTags: ["Identity", "Bridge-building"],
  },
  {
    id: "book-3",
    title: "The Art of Learning",
    author: "Josh Waitzkin",
    whyILovedIt: "Waitzkin's journey from chess prodigy to martial arts champion offers profound insights into the process of mastery. His approach to learning and growth resonates deeply with my own experiences.",
    takeaway: "True mastery comes from understanding the principles behind techniques, not just memorizing them. Process over outcome, growth over fixed mindset.",
    relatedTags: ["Craft", "Movement"],
  },
  {
    id: "book-4",
    title: "Crossing the Chasm",
    author: "Geoffrey Moore",
    whyILovedIt: "Essential reading for anyone building products or ventures. Moore's framework for understanding how innovations spread through different market segments is both practical and profound.",
    takeaway: "The gap between early adopters and the early majority is the chasm that kills most innovations. Understanding this transition is crucial for success.",
    relatedTags: ["Entrepreneurship", "Leadership"],
  },
  {
    id: "book-5",
    title: "The Structure of Scientific Revolutions",
    author: "Thomas Kuhn",
    whyILovedIt: "Kuhn's concept of paradigm shifts transformed how I think about progress in research and knowledge. It's a reminder that breakthroughs often require questioning fundamental assumptions.",
    takeaway: "Scientific progress isn't always linear. Paradigm shifts occur when anomalies accumulate and new frameworks emerge that better explain the world.",
    relatedTags: ["Research", "Craft"],
  },
  {
    id: "book-6",
    title: "Born a Crime",
    author: "Trevor Noah",
    whyILovedIt: "Noah's memoir is a powerful exploration of identity, belonging, and the absurdity of systems designed to divide. His humor and insight make difficult truths accessible.",
    takeaway: "Identity is complex and fluid. The systems that try to categorize us often fail to capture the full richness of human experience.",
    relatedTags: ["Identity", "Bridge-building", "Community"],
  },
  {
    id: "book-7",
    title: "Atomic Habits",
    author: "James Clear",
    whyILovedIt: "Clear's framework for building good habits and breaking bad ones is practical and powerful. It's helped me understand how small, consistent actions compound into significant change.",
    takeaway: "Systems over goals. Focus on the process, make it obvious and attractive, and let identity-based habits drive lasting change.",
    relatedTags: ["Craft", "Movement"],
  },
  {
    id: "book-8",
    title: "The Power of Now",
    author: "Eckhart Tolle",
    whyILovedIt: "Tolle's exploration of presence and consciousness has influenced how I approach both work and life. The practice of being present enhances everything else.",
    takeaway: "Most suffering comes from being lost in thoughts about past or future. Presence is the key to both peace and effectiveness.",
    relatedTags: ["Movement", "Craft"],
  },
];

