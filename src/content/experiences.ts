import type { Tag } from "./meta";

export interface Experience {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  year: number;
  location?: string;
  media?: {
    type: "image" | "teaser";
    src: string;
    alt?: string;
  };
  tags: Tag[];
  relatedLinks?: Array<{
    label: string;
    url: string;
  }>;
}

export const EXPERIENCES: Experience[] = [
  {
    id: "meet",
    title: "MEET Program",
    shortDescription: "Intensive program bridging technology, entrepreneurship, and cross-cultural collaboration",
    fullDescription: "The MEET program brought together young leaders from different backgrounds to learn technology, entrepreneurship, and leadership. It was a transformative experience that taught me the power of collaboration across divides and the importance of building bridges through shared purpose.",
    year: 2016,
    location: "Jerusalem",
    media: {
      type: "image",
      src: "/placeholder-meet.jpg",
      alt: "MEET program participants",
    },
    tags: ["Bridge-building", "Leadership", "Community"],
    relatedLinks: [
      { label: "MEET Website", url: "https://meet.mit.edu" },
    ],
  },
  {
    id: "germany-internship",
    title: "Germany Internship",
    shortDescription: "Research internship in computational methods",
    fullDescription: "Spent a summer in Germany working on cutting-edge research projects. This experience expanded my technical skills while exposing me to different research cultures and methodologies. It was a period of intense learning and growth.",
    year: 2018,
    location: "Germany",
    media: {
      type: "teaser",
      src: "/teasers/germany-teaser.mp4",
    },
    tags: ["Research", "Craft"],
  },
  {
    id: "technion-job",
    title: "Technion Research Position",
    shortDescription: "Leading research projects at one of Israel's top technical universities",
    fullDescription: "Working at Technion allowed me to contribute to significant research while mentoring the next generation of researchers. I led projects that combined theoretical innovation with practical applications, and helped build a more inclusive research environment.",
    year: 2019,
    location: "Haifa, Israel",
    media: {
      type: "image",
      src: "/placeholder-technion.jpg",
      alt: "Technion campus",
    },
    tags: ["Research", "Leadership", "Community"],
  },
  {
    id: "tutoring",
    title: "Tutoring and Mentoring",
    shortDescription: "Years of teaching and mentoring students from diverse backgrounds",
    fullDescription: "Tutoring became more than just teaching—it became a way to open doors, build confidence, and create pathways. I've worked with students at all levels, from high school to graduate school, helping them navigate academic challenges and discover their potential.",
    year: 2017,
    tags: ["Community", "Leadership", "Bridge-building"],
  },
  {
    id: "dabka",
    title: "Dabka",
    shortDescription: "Traditional dance as cultural expression and connection",
    fullDescription: "Dabka is more than dance—it's a connection to heritage, a form of storytelling, and a way to build community. Through dabka, I've connected with my roots, shared culture with others, and found a unique form of expression that bridges past and present.",
    year: 2015,
    media: {
      type: "image",
      src: "/placeholder-dabka.jpg",
      alt: "Dabka performance",
    },
    tags: ["Movement", "Identity", "Community"],
  },
  {
    id: "empowered",
    title: "Empowered Initiative",
    shortDescription: "Creating opportunities for underrepresented communities in tech",
    fullDescription: "The Empowered initiative was born from recognizing the barriers that exist in tech and research. We created programs, resources, and networks to help others navigate these spaces, build confidence, and achieve their goals.",
    year: 2020,
    tags: ["Community", "Leadership", "Bridge-building"],
    relatedLinks: [
      { label: "Initiative Website", url: "https://example.com/empowered" },
    ],
  },
  {
    id: "running",
    title: "Running as Meditation",
    shortDescription: "Finding clarity and purpose through movement",
    fullDescription: "Running became my meditation—a time to process, to think, to find clarity. Each run is a journey, and over the years, I've learned that the rhythm of movement helps unlock insights and solutions that elude a still mind.",
    year: 2018,
    media: {
      type: "teaser",
      src: "/teasers/running-teaser.mp4",
    },
    tags: ["Movement", "Craft"],
  },
];

