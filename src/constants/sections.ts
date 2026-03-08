import { ETranslationKey } from "../i18n/types";
import { ESection, toSectionHash } from "../utils/sections";

export const SECTION_NAV_ITEMS = [
  {
    href: toSectionHash(ESection.About),
    labelKey: ETranslationKey.NavAbout,
    isDisabled: false,
  },
  {
    href: toSectionHash(ESection.Experience),
    labelKey: ETranslationKey.NavExperience,
    isDisabled: false,
  },
  {
    href: toSectionHash(ESection.Education),
    labelKey: ETranslationKey.NavEducation,
    isDisabled: false,
  },
  {
    href: toSectionHash(ESection.Projects),
    labelKey: ETranslationKey.NavProjects,
    isDisabled: true,
  },
] as const;
