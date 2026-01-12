/**
 * Organization Registry
 * 
 * Central registry for all organizations that have logos.
 * Use orgIds in ContentItem to reference organizations instead of manually creating Badge objects.
 */

export const ORG_IDS = [
  "MEET",
  "HUJI",
  "DESY",
  "WEIZMANN",
  "MIT",
  "APPSFLYER",
  "BML", // BetterMind Labs
] as const;

export type OrgId = (typeof ORG_IDS)[number];

export interface Org {
  id: OrgId;
  name: string;
  logoSrc: string; // Path to logo in /public/images/logos/
  alt: string; // Alt text for logo
}

/**
 * Organization registry mapping OrgId to Org data
 * 
 * Logo file naming convention:
 * - Use lowercase, hyphenated names matching the OrgId
 * - Example: MEET -> meet.png, HUJI -> huji.jpg
 * - Place all logos in /public/images/logos/
 */
export const ORGS: Record<OrgId, Org> = {
  MEET: {
    id: "MEET",
    name: "MEET (Middle East Entrepreneurs of Tomorrow)",
    logoSrc: "/images/logos/meet.png",
    alt: "MEET logo",
  },
  HUJI: {
    id: "HUJI",
    name: "Hebrew University of Jerusalem",
    logoSrc: "/images/logos/HUJI.jpg",
    alt: "Hebrew University of Jerusalem logo",
  },
  DESY: {
    id: "DESY",
    name: "DESY (Deutsches Elektronen-Synchrotron)",
    logoSrc: "/images/logos/desy.png", // TODO: Add DESY logo file to /public/images/logos/desy.png
    alt: "DESY logo",
  },
  WEIZMANN: {
    id: "WEIZMANN",
    name: "Weizmann Institute of Science",
    logoSrc: "/images/logos/weizmann.png", // TODO: Add Weizmann logo file to /public/images/logos/weizmann.png (not currently used in content)
    alt: "Weizmann Institute of Science logo",
  },
  MIT: {
    id: "MIT",
    name: "Massachusetts Institute of Technology",
    logoSrc: "/images/logos/mit.png",
    alt: "MIT logo",
  },
  APPSFLYER: {
    id: "APPSFLYER",
    name: "AppsFlyer",
    logoSrc: "/images/logos/appsflyer.png",
    alt: "AppsFlyer logo",
  },
  BML: {
    id: "BML",
    name: "BetterMind Labs",
    logoSrc: "/images/logos/better_mind_labs_logo.jpeg",
    alt: "BetterMind Labs logo",
  },
};

/**
 * Get an organization by its ID
 */
export function getOrgById(id: OrgId): Org | undefined {
  return ORGS[id];
}

/**
 * Get all organizations for a given array of orgIds
 */
export function getOrgsByIds(orgIds: OrgId[]): Org[] {
  return orgIds.map((id) => ORGS[id]).filter((org): org is Org => org !== undefined);
}

