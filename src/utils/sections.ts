export const enum ESectionId {
  About = "about",
  Experience = "experience",
  Education = "education",
  Projects = "projects",
}

export type SectionHash = `#${ESectionId}`;

export function toSectionHash(sectionId: ESectionId): SectionHash {
  return `#${sectionId}` as SectionHash;
}
