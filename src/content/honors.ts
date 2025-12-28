import type { Tag } from "./meta";

export interface Honor {
  id: string;
  title: string;
  oneLiner: string;
  context: string;
  whatIDid: string[];
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

export const HONORS: Honor[] = [
  {
    id: "honor-1",
    title: "Outstanding Research Contribution",
    oneLiner: "Recognized for groundbreaking work in computational methods",
    context: "During my graduate studies, I developed novel approaches that significantly advanced the field. The work combined theoretical rigor with practical applications, addressing real-world challenges.",
    whatIDid: [
      "Developed innovative algorithms for complex problem-solving",
      "Published findings in top-tier academic journals",
      "Presented research at international conferences",
      "Collaborated with industry partners on implementation",
    ],
    impact: [
      "Methodology adopted by research teams worldwide",
      "Opened new avenues for future research",
      "Inspired other researchers in underrepresented communities",
      "Led to practical applications in multiple industries",
    ],
    proofLinks: [
      { label: "Research Paper", url: "https://example.com/paper" },
      { label: "Conference Presentation", url: "https://example.com/presentation" },
    ],
    teaserMedia: {
      type: "image",
      src: "/placeholder-honor-1.jpg",
      alt: "Research recognition",
    },
    youtubeUrl: "https://youtube.com/watch?v=example1",
    tags: ["Research", "Leadership"],
  },
  {
    id: "honor-2",
    title: "Community Leadership Award",
    oneLiner: "Honored for transformative impact on student communities",
    context: "Through years of mentoring, teaching, and community building, I've worked to create spaces where everyone can thrive. This recognition reflects the collective effort of many.",
    whatIDid: [
      "Founded and led mentorship programs",
      "Organized community events and workshops",
      "Created resources for underrepresented students",
      "Built lasting networks of support",
    ],
    impact: [
      "Hundreds of students directly supported",
      "Increased representation in tech and research",
      "Created sustainable community structures",
      "Inspired others to take on leadership roles",
    ],
    proofLinks: [
      { label: "Award Announcement", url: "https://example.com/award" },
      { label: "Community Impact Report", url: "https://example.com/impact" },
    ],
    teaserMedia: {
      type: "teaser",
      src: "/teasers/community-teaser.mp4",
    },
    tags: ["Community", "Leadership", "Bridge-building"],
  },
  {
    id: "honor-3",
    title: "Innovation in Entrepreneurship",
    oneLiner: "Acknowledged for building ventures that create real value",
    context: "Building companies isn't just about profit—it's about solving problems, creating opportunities, and making a difference. This recognition validates that approach.",
    whatIDid: [
      "Launched successful tech ventures",
      "Created jobs and opportunities",
      "Developed innovative solutions to real problems",
      "Built sustainable business models",
    ],
    impact: [
      "Products used by thousands of users",
      "Created employment opportunities",
      "Demonstrated new approaches to business",
      "Inspired other entrepreneurs",
    ],
    proofLinks: [
      { label: "Company Website", url: "https://example.com/venture" },
      { label: "Press Coverage", url: "https://example.com/press" },
    ],
    teaserMedia: {
      type: "image",
      src: "/placeholder-honor-3.jpg",
      alt: "Entrepreneurship recognition",
    },
    tags: ["Entrepreneurship", "Leadership"],
  },
];

