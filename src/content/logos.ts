/**
 * Logo items for IntroGate overlay
 */

export interface LogoItem {
  id: string;
  name: string;
  src: string; // Path to SVG/PNG asset
  href?: string; // Optional link URL
}

/**
 * Logo collection for intro gate
 */
export const LOGOS: LogoItem[] = [
  {
    id: "meet",
    name: "MEET",
    src: "/logos/meet.svg",
    href: "https://meet.mit.edu",
  },
  {
    id: "meta",
    name: "Meta",
    src: "/logos/meta.svg",
    href: "https://meta.com",
  },
  {
    id: "appsflyer",
    name: "AppsFlyer",
    src: "/logos/appsflyer.svg",
    href: "https://appsflyer.com",
  },
  {
    id: "technion",
    name: "Technion",
    src: "/logos/technion.svg",
    href: "https://technion.ac.il",
  },
  {
    id: "mit",
    name: "MIT",
    src: "/logos/mit.svg",
    href: "https://mit.edu",
  },
];

