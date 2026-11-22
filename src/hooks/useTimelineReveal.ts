import { useEffect, useRef, useState, type RefObject } from "react";

import {
  TIMELINE_REVEAL_DURATION_MS,
  TIMELINE_REVEAL_STAGGER_MS,
} from "../constants/animations";
import { TIMELINE_VISIBILITY_OPACITY_THRESHOLD } from "../constants/timeline";
import { isElementVisible } from "../utils/dom";

export function useTimelineReveal(
  listRef: RefObject<HTMLUListElement | null>,
  isActive: boolean,
  itemCount: number,
) {
  const hasPlayedRef = useRef(false);
  const [shouldReveal, setShouldReveal] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const list = listRef.current;

    if (!isActive || !list || hasPlayedRef.current) return;
    const timelineList = list;

    let animationFrameId = 0;
    let isCancelled = false;

    function revealWhenVisible() {
      if (isCancelled || !timelineList.isConnected) return;

      if (
        isElementVisible(timelineList, TIMELINE_VISIBILITY_OPACITY_THRESHOLD)
      ) {
        hasPlayedRef.current = true;
        setShouldReveal(true);
        return;
      }

      animationFrameId = window.requestAnimationFrame(revealWhenVisible);
    }

    animationFrameId = window.requestAnimationFrame(revealWhenVisible);

    return () => {
      isCancelled = true;
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [isActive, listRef]);

  useEffect(() => {
    if (!shouldReveal || isComplete) return;

    const lastItemDelay =
      Math.max(0, itemCount - 1) * TIMELINE_REVEAL_STAGGER_MS;
    const timeoutId = window.setTimeout(
      () => setIsComplete(true),
      lastItemDelay + TIMELINE_REVEAL_DURATION_MS,
    );

    return () => window.clearTimeout(timeoutId);
  }, [isComplete, itemCount, shouldReveal]);

  return { shouldReveal, isComplete };
}
