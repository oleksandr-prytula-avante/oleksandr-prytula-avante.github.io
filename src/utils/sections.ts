import { ESection } from "../enums/sections";
import { ETranslationKey } from "../i18n/types";

export { ESection } from "../enums/sections";

export type SectionHash = `#${ESection}`;

export function toSectionHash(sectionId: ESection): SectionHash {
  return `#${sectionId}` as SectionHash;
}

export function getSectionTitleTranslationKey(
  sectionId: ESection,
): ETranslationKey {
  if (sectionId === ESection.About) {
    return ETranslationKey.NavAbout;
  }

  if (sectionId === ESection.Experience) {
    return ETranslationKey.NavExperience;
  }

  if (sectionId === ESection.Education) {
    return ETranslationKey.NavEducation;
  }

  return ETranslationKey.NavProjects;
}
