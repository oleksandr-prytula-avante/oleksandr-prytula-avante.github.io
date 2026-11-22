import { useEffect, useRef, type RefObject } from "react";

import { ABOUT_REVEAL_SCROLL_FALLBACK_MS } from "../constants/animations";

type AboutRevealScrollRefs = {
  panelRef: RefObject<HTMLElement | null>;
  storyClipRef: RefObject<HTMLDivElement | null>;
  revealRef: RefObject<HTMLDivElement | null>;
};

export function useAboutRevealScroll(
  isDesktopViewport: boolean,
  isExpanded: boolean,
): AboutRevealScrollRefs {
  const panelRef = useRef<HTMLElement | null>(null);
  const storyClipRef = useRef<HTMLDivElement | null>(null);
  const revealRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isDesktopViewport) return;

    const panel = panelRef.current;

    if (!isExpanded) {
      panel?.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    function scrollToStory() {
      const storyClip = storyClipRef.current;

      if (!panel || !storyClip) return;

      const panelRect = panel.getBoundingClientRect();
      const storyRect = storyClip.getBoundingClientRect();

      panel.scrollTo({
        top: Math.max(0, panel.scrollTop + storyRect.top - panelRect.top),
        behavior: "smooth",
      });
    }

    function handleTransitionEnd(event: TransitionEvent) {
      if (event.propertyName === "grid-template-rows") scrollToStory();
    }

    const reveal = revealRef.current;
    reveal?.addEventListener("transitionend", handleTransitionEnd);
    const timeoutId = window.setTimeout(
      scrollToStory,
      ABOUT_REVEAL_SCROLL_FALLBACK_MS,
    );

    return () => {
      reveal?.removeEventListener("transitionend", handleTransitionEnd);
      window.clearTimeout(timeoutId);
    };
  }, [isDesktopViewport, isExpanded]);

  return { panelRef, storyClipRef, revealRef };
}
