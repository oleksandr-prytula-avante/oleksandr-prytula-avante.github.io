import { ESection } from "../enums/sections";

export { ESection } from "../enums/sections";

export type SectionHash = `#${ESection}`;

export function isSectionHash(
  value: string,
  validHashes: readonly string[],
): value is SectionHash {
  return validHashes.includes(value);
}

export function getCurrentHash(): string {
  return typeof window === "undefined" ? "" : window.location.hash;
}

export function toSectionHash(sectionId: ESection): SectionHash {
  return `#${sectionId}` as SectionHash;
}
