const EM_DASH = "\u2014";
const SPACED_HYPHEN = " - ";

export function toDisplayText(value: string): string {
  return value.replaceAll(EM_DASH, SPACED_HYPHEN);
}
