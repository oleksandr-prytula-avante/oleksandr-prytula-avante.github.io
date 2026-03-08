import {
  EDUCATION_TEXT_KEYS_BY_ID,
  EEducation,
  type EducationTextKeys,
} from "../constants/education";

export function getEducationTextKeys(itemId: string): EducationTextKeys {
  return EDUCATION_TEXT_KEYS_BY_ID[itemId as EEducation];
}
