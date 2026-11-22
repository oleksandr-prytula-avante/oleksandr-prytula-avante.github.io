import { useEffect, useRef, useState, type RefObject } from "react";

import {
  TAG_REVEAL_STAGGER_MS,
  TAG_SCROLL_BOTTOM_INSET_PX,
} from "../constants/animations";

const TAG_SELECTOR = "[data-tag-label]";

export function useTagRevealAnimation(
  labels: readonly string[],
  isEnabled: boolean,
): [RefObject<HTMLUListElement | null>, ReadonlySet<string>] {
  const listRef = useRef<HTMLUListElement>(null);
  const revealedRef = useRef(new Set<string>());
  const [revealed, setRevealed] = useState<ReadonlySet<string>>(
    () => new Set(),
  );

  useEffect(() => {
    if (!isEnabled) return;

    const container = listRef.current;
    if (!container) return;
    const tagsContainer = container;

    if (typeof IntersectionObserver === "undefined") {
      const allLabels = new Set(labels);
      revealedRef.current = allLabels;
      const timeoutId = window.setTimeout(() => setRevealed(allLabels), 0);
      return () => window.clearTimeout(timeoutId);
    }

    let timeoutId: number | undefined;
    let isSequenceRunning = false;
    const order = new Map(labels.map((label, index) => [label, index]));
    const getElements = () =>
      Array.from(tagsContainer.querySelectorAll<HTMLElement>(TAG_SELECTOR));
    const isRevealed = (element: HTMLElement) =>
      revealedRef.current.has(element.dataset.tagLabel ?? "");
    const getRow = (rowTop: number) =>
      getElements()
        .filter((element) => Math.abs(element.offsetTop - rowTop) <= 1)
        .sort((left, right) =>
          left.offsetTop !== right.offsetTop
            ? left.offsetTop - right.offsetTop
            : (order.get(left.dataset.tagLabel ?? "") ?? 0) -
              (order.get(right.dataset.tagLabel ?? "") ?? 0),
        );

    function revealRow(rowTop: number) {
      const next = getRow(rowTop).find((element) => !isRevealed(element));

      if (next) {
        const label = next.dataset.tagLabel;
        if (label) {
          const nextRevealed = new Set(revealedRef.current).add(label);
          revealedRef.current = nextRevealed;
          setRevealed(nextRevealed);
        }
        timeoutId = window.setTimeout(
          () => revealRow(rowTop),
          TAG_REVEAL_STAGGER_MS,
        );
        return;
      }

      const nextElement = getElements().find((element) => !isRevealed(element));
      if (!nextElement) {
        isSequenceRunning = false;
        return;
      }

      const nextRowTop = nextElement.offsetTop;
      const nextRowBottom = getRow(nextRowTop).reduce(
        (bottom, element) =>
          Math.max(bottom, element.offsetTop + element.offsetHeight),
        nextRowTop,
      );
      const isScrollable =
        tagsContainer.scrollHeight > tagsContainer.clientHeight + 1 &&
        window.getComputedStyle(tagsContainer).overflowY !== "visible";
      const shouldScroll =
        isScrollable &&
        nextRowBottom >
          tagsContainer.scrollTop +
            tagsContainer.clientHeight -
            TAG_SCROLL_BOTTOM_INSET_PX;

      if (shouldScroll) {
        tagsContainer.scrollTo({
          top: Math.min(
            tagsContainer.scrollHeight - tagsContainer.clientHeight,
            tagsContainer.scrollTop +
              Math.max(TAG_SCROLL_BOTTOM_INSET_PX, nextRowTop - rowTop),
          ),
          behavior: "smooth",
        });
      }

      timeoutId = window.setTimeout(
        () => revealRow(nextRowTop),
        shouldScroll ? 140 : TAG_REVEAL_STAGGER_MS,
      );
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (isSequenceRunning) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target as HTMLElement)
          .filter((element) => !isRevealed(element));

        if (visible.length === 0) return;

        isSequenceRunning = true;
        revealRow(Math.min(...visible.map((element) => element.offsetTop)));
      },
      { root: tagsContainer, threshold: 0.01 },
    );

    getElements().forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      window.clearTimeout(timeoutId);
    };
  }, [isEnabled, labels]);

  return [listRef, revealed];
}
