import { PIPE_TEXT_DELIMITER } from "../constants/text";

const EM_DASH = "\u2014";
const SPACED_EN_DASH = " – ";

export function toDisplayText(value: string): string {
  return value.replaceAll(EM_DASH, SPACED_EN_DASH);
}

export function splitPipeSeparatedText(value: string) {
  return value
    .split(PIPE_TEXT_DELIMITER)
    .map((part) => part.trim())
    .filter(Boolean);
}
