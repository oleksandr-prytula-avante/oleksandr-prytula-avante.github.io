import { ESection } from "../enums/sections";

export { ESection } from "../enums/sections";

export type SectionHash = `#${ESection}`;

export function toSectionHash(sectionId: ESection): SectionHash {
  return `#${sectionId}` as SectionHash;
}
