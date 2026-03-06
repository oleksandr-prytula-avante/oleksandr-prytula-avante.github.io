import { ETranslationKey } from "../i18n/types";
import { ESectionId, toSectionHash } from "../utils/sections";

export const SECTION_NAV_ITEMS = [
  {
    href: toSectionHash(ESectionId.About),
    labelKey: ETranslationKey.NavAbout,
    isDisabled: false,
  },
  {
    href: toSectionHash(ESectionId.Experience),
    labelKey: ETranslationKey.NavExperience,
    isDisabled: false,
  },
  {
    href: toSectionHash(ESectionId.Education),
    labelKey: ETranslationKey.NavEducation,
    isDisabled: false,
  },
  {
    href: toSectionHash(ESectionId.Projects),
    labelKey: ETranslationKey.NavProjects,
    isDisabled: true,
  },
] as const;
