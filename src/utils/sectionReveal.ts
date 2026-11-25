export function getSectionRevealClassName(
  isAnimated: boolean,
  isVisible: boolean,
) {
  return [
    "flex h-full min-h-0 flex-col max-[1025px]:h-auto",
    isAnimated ? "transition-all duration-500 ease-out" : "",
    isVisible
      ? "translate-y-0 opacity-100"
      : `pointer-events-none opacity-0 ${isAnimated ? "min-[1025px]:translate-y-2" : ""}`,
  ]
    .filter(Boolean)
    .join(" ");
}
