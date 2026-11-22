export function isElementVisible(element: HTMLElement, opacityThreshold = 0) {
  const rect = element.getBoundingClientRect();

  if (rect.width <= 0 || rect.height <= 0) return false;

  let current: HTMLElement | null = element;

  while (current) {
    const style = window.getComputedStyle(current);
    const opacity = Number(style.opacity);

    if (
      style.display === "none" ||
      style.visibility === "hidden" ||
      style.pointerEvents === "none" ||
      Number.isNaN(opacity) ||
      opacity < opacityThreshold
    ) {
      return false;
    }

    current = current.parentElement;
  }

  return true;
}
