import { ETranslationKey } from "../i18n/types";
import { EExperience } from "./experienceTimeline";

type ExperienceTextKeys = {
  companyName: ETranslationKey;
  jobTitle: ETranslationKey;
  location: ETranslationKey;
  description: ETranslationKey;
  highlights: ETranslationKey[];
};

const OMNORA_EXPERIENCE_TEXT_KEYS: ExperienceTextKeys = {
  companyName: ETranslationKey.ExperienceOmnoraCompanyName,
  jobTitle: ETranslationKey.ExperienceOmnoraJobTitle,
  location: ETranslationKey.ExperienceOmnoraLocation,
  description: ETranslationKey.ExperienceOmnoraDescription,
  highlights: [
    ETranslationKey.ExperienceOmnoraHighlight1,
    ETranslationKey.ExperienceOmnoraHighlight2,
    ETranslationKey.ExperienceOmnoraHighlight3,
    ETranslationKey.ExperienceOmnoraHighlight4,
    ETranslationKey.ExperienceOmnoraHighlight5,
    ETranslationKey.ExperienceOmnoraHighlight6,
    ETranslationKey.ExperienceOmnoraHighlight7,
    ETranslationKey.ExperienceOmnoraHighlight8,
    ETranslationKey.ExperienceOmnoraHighlight9,
  ],
};

const EXPERIENCE_TEXT_KEYS_BY_ID: Record<EExperience, ExperienceTextKeys> = {
  [EExperience.Omnora]: OMNORA_EXPERIENCE_TEXT_KEYS,
  [EExperience.Digitalsuits]: {
    companyName: ETranslationKey.ExperienceDigitalsuitsCompanyName,
    jobTitle: ETranslationKey.ExperienceDigitalsuitsJobTitle,
    location: ETranslationKey.ExperienceDigitalsuitsLocation,
    description: ETranslationKey.ExperienceDigitalsuitsDescription,
    highlights: [
      ETranslationKey.ExperienceDigitalsuitsHighlight1,
      ETranslationKey.ExperienceDigitalsuitsHighlight2,
      ETranslationKey.ExperienceDigitalsuitsHighlight3,
      ETranslationKey.ExperienceDigitalsuitsHighlight4,
      ETranslationKey.ExperienceDigitalsuitsHighlight5,
      ETranslationKey.ExperienceDigitalsuitsHighlight6,
      ETranslationKey.ExperienceDigitalsuitsHighlight7,
      ETranslationKey.ExperienceDigitalsuitsHighlight8,
    ],
  },
  [EExperience.CodeAndCare]: {
    companyName: ETranslationKey.ExperienceCodeAndCareCompanyName,
    jobTitle: ETranslationKey.ExperienceCodeAndCareJobTitle,
    location: ETranslationKey.ExperienceCodeAndCareLocation,
    description: ETranslationKey.ExperienceCodeAndCareDescription,
    highlights: [
      ETranslationKey.ExperienceCodeAndCareHighlight1,
      ETranslationKey.ExperienceCodeAndCareHighlight2,
      ETranslationKey.ExperienceCodeAndCareHighlight3,
      ETranslationKey.ExperienceCodeAndCareHighlight4,
      ETranslationKey.ExperienceCodeAndCareHighlight5,
      ETranslationKey.ExperienceCodeAndCareHighlight6,
    ],
  },
  [EExperience.Lanars]: {
    companyName: ETranslationKey.ExperienceLanarsCompanyName,
    jobTitle: ETranslationKey.ExperienceLanarsJobTitle,
    location: ETranslationKey.ExperienceLanarsLocation,
    description: ETranslationKey.ExperienceLanarsDescription,
    highlights: [
      ETranslationKey.ExperienceLanarsHighlight1,
      ETranslationKey.ExperienceLanarsHighlight2,
      ETranslationKey.ExperienceLanarsHighlight3,
      ETranslationKey.ExperienceLanarsHighlight4,
      ETranslationKey.ExperienceLanarsHighlight5,
      ETranslationKey.ExperienceLanarsHighlight6,
    ],
  },
};

function isExperienceItemId(itemId: string): itemId is EExperience {
  return Object.values(EExperience).includes(itemId as EExperience);
}

export function getExperienceTextKeys(itemId: string): ExperienceTextKeys {
  if (isExperienceItemId(itemId)) {
    return EXPERIENCE_TEXT_KEYS_BY_ID[itemId];
  }

  return OMNORA_EXPERIENCE_TEXT_KEYS;
}
