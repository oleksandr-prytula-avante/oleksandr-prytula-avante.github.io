export const enum ESectionId {
  About = "about",
  Expirience = "expirience",
  Education = "education",
  Projects = "projects",
}

export type SectionHash = `#${ESectionId}`;

export function toSectionHash(sectionId: ESectionId): SectionHash {
  return `#${sectionId}` as SectionHash;
}
