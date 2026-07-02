import { ETranslationKey } from "../i18n/types";
import { ESection, toSectionHash } from "../utils/sections";

export const NOT_FOUND_INDEX = -1;
export const FIRST_SLIDE_INDEX = 0;
export const SLIDE_WIDTH_PERCENT = 100;

export const SCALE_X_VISIBLE = "scaleX(1)";
export const SCALE_X_HIDDEN = "scaleX(0)";

export const VALID_HASHES = [
  toSectionHash(ESection.About),
  toSectionHash(ESection.Experience),
  toSectionHash(ESection.Education),
  toSectionHash(ESection.Projects),
] as const;

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
