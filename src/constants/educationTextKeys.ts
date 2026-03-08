import { EEducation } from "./educationTimeline";
import { ETranslationKey } from "../i18n/types";

type EducationTextKeys = {
  firstRow: ETranslationKey;
  secondRow: ETranslationKey;
};

const EDUCATION_TEXT_KEYS_BY_ID: Record<EEducation, EducationTextKeys> = {
  [EEducation.Duet]: {
    firstRow: ETranslationKey.EducationDuetUniversityName,
    secondRow: ETranslationKey.EducationDuetDegree,
  },
  [EEducation.BinaryStudio]: {
    firstRow: ETranslationKey.EducationBinaryStudioTitle,
    secondRow: ETranslationKey.EducationBinaryStudioProgram,
  },
  [EEducation.Knu]: {
    firstRow: ETranslationKey.EducationKnuUniversityName,
    secondRow: ETranslationKey.EducationKnuDegree,
  },
};

export function getEducationTextKeys(itemId: string): EducationTextKeys {
  return EDUCATION_TEXT_KEYS_BY_ID[itemId as EEducation];
}
