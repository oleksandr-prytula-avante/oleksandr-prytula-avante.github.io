import {
  EXPERIENCE_TEXT_KEYS_BY_ID,
  OMNORA_EXPERIENCE_TEXT_KEYS,
  type ExperienceTextKeys,
  EExperience,
} from "../constants/experience";

function isExperienceItemId(itemId: string): itemId is EExperience {
  return Object.values(EExperience).includes(itemId as EExperience);
}

export function getExperienceTextKeys(itemId: string): ExperienceTextKeys {
  if (isExperienceItemId(itemId)) {
    return EXPERIENCE_TEXT_KEYS_BY_ID[itemId];
  }

  return OMNORA_EXPERIENCE_TEXT_KEYS;
}
