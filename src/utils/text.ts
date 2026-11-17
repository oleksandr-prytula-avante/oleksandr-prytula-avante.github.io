const SHORT_DASH = "-";
const EM_DASH = "—";

export function toDisplayText(value: string): string {
  return value.replaceAll(SHORT_DASH, EM_DASH);
}
