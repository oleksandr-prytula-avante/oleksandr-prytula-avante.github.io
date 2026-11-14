import { ETranslationKey } from "../i18n/types";
import { ESection, toSectionHash } from "../utils/sections";

export const NOT_FOUND_INDEX = -1;
export const FIRST_SLIDE_INDEX = 0;

export const SCALE_X_VISIBLE = "scaleX(1)";
export const SCALE_X_HIDDEN = "scaleX(0)";

export const VALID_HASHES = [
  toSectionHash(ESection.Home),
  toSectionHash(ESection.About),
  toSectionHash(ESection.Experience),
  toSectionHash(ESection.Projects),
  toSectionHash(ESection.Education),
] as const;

export const SECTION_NAV_ITEMS = [
  {
    href: toSectionHash(ESection.Home),
    labelKey: ETranslationKey.NavHome,
    isDisabled: false,
  },
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
    href: toSectionHash(ESection.Projects),
    labelKey: ETranslationKey.NavProjects,
    isDisabled: false,
  },
  {
    href: toSectionHash(ESection.Education),
    labelKey: ETranslationKey.NavEducation,
    isDisabled: false,
  },
] as const;

export const MOBILE_SECTION_NAV_ITEMS = SECTION_NAV_ITEMS.filter(
  ({ href }) => href !== toSectionHash(ESection.Home),
);
