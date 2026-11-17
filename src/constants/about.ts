import { ETranslationKey } from "../i18n/types";

export type AboutStoryBlock = {
  titleKey: ETranslationKey;
  bodyKey: ETranslationKey;
};

export const ABOUT_STORY_BLOCKS: AboutStoryBlock[] = [
  {
    titleKey: ETranslationKey.AboutProfileTitle,
    bodyKey: ETranslationKey.AboutParagraph1,
  },
  {
    titleKey: ETranslationKey.AboutLargeScaleTitle,
    bodyKey: ETranslationKey.AboutLargeScaleText,
  },
  {
    titleKey: ETranslationKey.AboutInteractiveTitle,
    bodyKey: ETranslationKey.AboutInteractiveText,
  },
  {
    titleKey: ETranslationKey.AboutStakeholderTitle,
    bodyKey: ETranslationKey.AboutStakeholderText,
  },
  {
    titleKey: ETranslationKey.AboutQualityTitle,
    bodyKey: ETranslationKey.AboutQualityText,
  },
  {
    titleKey: ETranslationKey.AboutMentoringTitle,
    bodyKey: ETranslationKey.AboutMentoringText,
  },
  {
    titleKey: ETranslationKey.AboutEducationTitle,
    bodyKey: ETranslationKey.AboutParagraph4,
  },
  {
    titleKey: ETranslationKey.AboutCareerTitle,
    bodyKey: ETranslationKey.AboutCareerText,
  },
  {
    titleKey: ETranslationKey.AboutTechnicalFocusTitle,
    bodyKey: ETranslationKey.AboutTechnicalFocusText,
  },
  {
    titleKey: ETranslationKey.AboutProjectPreferencesTitle,
    bodyKey: ETranslationKey.AboutProjectPreferencesText,
  },
];
