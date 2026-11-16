import { ETranslationKey } from "../i18n/types";
import { ESection, toSectionHash } from "../utils/sections";

export const NOT_FOUND_INDEX = -1;
export const FIRST_SLIDE_INDEX = 0;

export const SCALE_X_VISIBLE = "scaleX(1)";
export const SCALE_X_HIDDEN = "scaleX(0)";

export const SECTION_NAV_ITEMS = (
  [
    {
      id: ESection.About,
      labelKey: ETranslationKey.NavAbout,
      isDisabled: false,
    },
    {
      id: ESection.Experience,
      labelKey: ETranslationKey.NavExperience,
      isDisabled: false,
    },
    {
      id: ESection.Projects,
      labelKey: ETranslationKey.NavProjects,
      isDisabled: false,
    },
    {
      id: ESection.Education,
      labelKey: ETranslationKey.NavEducation,
      isDisabled: false,
    },
  ] as const
).map((section) => ({ ...section, href: toSectionHash(section.id) }));

export const VALID_HASHES = SECTION_NAV_ITEMS.map(({ href }) => href);
