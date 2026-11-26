import { useEffect, useRef, useState, type RefObject } from "react";

import {
  TIMELINE_REVEAL_DURATION_MS,
  TIMELINE_REVEAL_STAGGER_MS,
} from "../constants/animations";
import { TIMELINE_VISIBILITY_OPACITY_THRESHOLD } from "../constants/timeline";

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
    const reveal = () => {
      hasPlayedRef.current = true;
      setShouldReveal(true);
    };

    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        reveal();
      },
      { threshold: TIMELINE_VISIBILITY_OPACITY_THRESHOLD },
    );

    observer.observe(list);
    return () => observer.disconnect();
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
