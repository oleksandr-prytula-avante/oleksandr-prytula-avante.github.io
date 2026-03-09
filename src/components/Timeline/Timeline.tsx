import { useEffect, useRef, useState } from "react";

import { EFocusPhase } from "../../enums/timeline";
import { DESKTOP_MIN_WIDTH_MEDIA_QUERY } from "../../constants/mediaQueries";
import { useActiveSectionHash } from "../../hooks/useActiveSectionHash";
import { ESection, toSectionHash } from "../../utils/sections";
import { TimelineItem } from "./TimelineItem";
import type { TimelineDataItem } from "./TimelineItem";

import "./Timeline.css";

const TIMELINE_REVEAL_STAGGER_MS = 240;
const TIMELINE_REVEAL_DURATION_MS = 460;
const TIMELINE_FOCUS_TRANSITION_MS = 460;
const TIMELINE_VISIBILITY_OPACITY_THRESHOLD = 0.35;
const TIMELINE_LINE_CIRCLE_OFFSET_PX = 25;
const TIMELINE_EMPTY_STATE_VALUE = 0;
const TIMELINE_FIRST_ITEM_INDEX = 0;
const TIMELINE_LAST_ITEM_OFFSET = 1;

type TimelineProps<TItem extends TimelineDataItem> = {
  items: TItem[];
  activeSectionHash: string;
  FirstRowComponent: React.ComponentType<{ item: TItem }>;
  SecondRowComponent: React.ComponentType<{ item: TItem }>;
  ThirdRowComponent: React.ComponentType<{ item: TItem }>;
  showToggle?: boolean;
  onSkillEnter: (skill: string) => void;
  onSkillLeave: () => void;
};

export function Timeline<TItem extends TimelineDataItem>(
  props: TimelineProps<TItem>,
) {
  const {
    activeSectionHash,
    items,
    onSkillEnter,
    onSkillLeave,
    FirstRowComponent,
    SecondRowComponent,
    ThirdRowComponent,
    showToggle = true,
  } = props;
  const [focusedItemId, setFocusedItemId] = useState<string | null>(null);
  const [focusPhase, setFocusPhase] = useState<EFocusPhase>(EFocusPhase.Idle);
  const [isFocusExitActive, setIsFocusExitActive] = useState(false);
  const [shouldRevealItems, setShouldRevealItems] = useState(false);
  const [isInitialRevealComplete, setIsInitialRevealComplete] = useState(false);
  const [hasPlayedInitialReveal, setHasPlayedInitialReveal] = useState(false);
  const [lineHeight, setLineHeight] = useState(TIMELINE_EMPTY_STATE_VALUE);
  const [isDesktopViewport, setIsDesktopViewport] = useState(function () {
    if (typeof window === "undefined") {
      return true;
    }

    return window.matchMedia(DESKTOP_MIN_WIDTH_MEDIA_QUERY).matches;
  });
  const [focusShiftById, setFocusShiftById] = useState<Record<
    string,
    number
  > | null>(null);
  const articleRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const { activeHash } = useActiveSectionHash(toSectionHash(ESection.About));
  const isTimelineActive =
    !isDesktopViewport || activeHash === activeSectionHash;
  const hasFocusedItem = focusedItemId !== null;

  useEffect(function () {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(DESKTOP_MIN_WIDTH_MEDIA_QUERY);

    function handleViewportChange(event: MediaQueryListEvent) {
      setIsDesktopViewport(event.matches);
    }

    mediaQuery.addEventListener("change", handleViewportChange);

    return function () {
      mediaQuery.removeEventListener("change", handleViewportChange);
    };
  }, []);

  function resetFocusState() {
    setFocusedItemId(null);
    setFocusPhase(EFocusPhase.Idle);
    setIsFocusExitActive(false);
  }

  function measureFocusShiftFromLayout() {
    const listElement = listRef.current;

    if (!listElement) {
      setFocusShiftById(null);
      return;
    }

    const itemElements = Array.from(
      listElement.querySelectorAll<HTMLElement>("[data-timeline-item-id]"),
    );

    if (itemElements.length === TIMELINE_EMPTY_STATE_VALUE) {
      setFocusShiftById(null);
      return;
    }

    const firstTop =
      itemElements[TIMELINE_FIRST_ITEM_INDEX].getBoundingClientRect().top;
    const firstItemId =
      itemElements[TIMELINE_FIRST_ITEM_INDEX].dataset.timelineItemId;
    const nextShiftById: Record<string, number> = {};

    itemElements.forEach(function (itemElement) {
      const itemId = itemElement.dataset.timelineItemId;

      if (!itemId) {
        return;
      }

      const itemTop = itemElement.getBoundingClientRect().top;
      nextShiftById[itemId] = Math.round(itemTop - firstTop);
    });

    if (firstItemId) {
      nextShiftById[firstItemId] = TIMELINE_EMPTY_STATE_VALUE;
    }

    setFocusShiftById(nextShiftById);
  }

  useEffect(
    function () {
      if (!isTimelineActive) {
        resetFocusState();
        return;
      }

      const listElement = listRef.current;

      if (!listElement) {
        resetFocusState();
        return;
      }

      if (hasPlayedInitialReveal) {
        setShouldRevealItems(true);
        setIsInitialRevealComplete(true);
        return;
      }

      const observedList = listElement;

      function isActuallyVisible(element: HTMLElement): boolean {
        const rect = element.getBoundingClientRect();

        if (rect.width <= 0 || rect.height <= 0) {
          return false;
        }

        let node: HTMLElement | null = element;

        while (node) {
          const style = window.getComputedStyle(node);
          const opacity = Number(style.opacity);

          if (
            style.display === "none" ||
            style.visibility === "hidden" ||
            style.pointerEvents === "none" ||
            Number.isNaN(opacity) ||
            opacity < TIMELINE_VISIBILITY_OPACITY_THRESHOLD
          ) {
            return false;
          }

          node = node.parentElement;
        }

        return true;
      }

      let animationFrameId = TIMELINE_EMPTY_STATE_VALUE;
      let isCancelled = false;

      function waitUntilVisible() {
        if (isCancelled || !observedList.isConnected) {
          return;
        }

        if (isActuallyVisible(observedList)) {
          setShouldRevealItems(true);
          setHasPlayedInitialReveal(true);
          return;
        }

        animationFrameId = window.requestAnimationFrame(waitUntilVisible);
      }

      animationFrameId = window.requestAnimationFrame(waitUntilVisible);

      return function () {
        isCancelled = true;
        window.cancelAnimationFrame(animationFrameId);
      };
    },
    [activeSectionHash, hasPlayedInitialReveal, isTimelineActive],
  );

  useEffect(
    function () {
      if (!shouldRevealItems) {
        return;
      }

      if (isInitialRevealComplete) {
        return;
      }

      const lastItemDelay = (items.length - 1) * TIMELINE_REVEAL_STAGGER_MS;
      const totalRevealDuration = lastItemDelay + TIMELINE_REVEAL_DURATION_MS;

      const timeoutId = window.setTimeout(function () {
        setIsInitialRevealComplete(true);
      }, totalRevealDuration);

      return function () {
        window.clearTimeout(timeoutId);
      };
    },
    [isInitialRevealComplete, items.length, shouldRevealItems],
  );

  useEffect(
    function () {
      if (!focusedItemId || focusPhase !== EFocusPhase.Preparing) {
        return;
      }

      measureFocusShiftFromLayout();

      let secondRafId = TIMELINE_EMPTY_STATE_VALUE;
      const firstRafId = window.requestAnimationFrame(function () {
        measureFocusShiftFromLayout();
        secondRafId = window.requestAnimationFrame(function () {
          setFocusPhase(EFocusPhase.Entering);
        });
      });

      return function () {
        window.cancelAnimationFrame(firstRafId);
        window.cancelAnimationFrame(secondRafId);
      };
    },
    [focusedItemId, focusPhase],
  );

  useEffect(
    function () {
      if (!focusedItemId || focusPhase !== EFocusPhase.Entering) {
        return;
      }

      const timeoutId = window.setTimeout(function () {
        setFocusPhase(EFocusPhase.Focused);
      }, TIMELINE_FOCUS_TRANSITION_MS);

      return function () {
        window.clearTimeout(timeoutId);
      };
    },
    [focusedItemId, focusPhase],
  );

  useEffect(
    function () {
      if (!focusedItemId || focusPhase !== EFocusPhase.Exiting) {
        return;
      }

      setIsFocusExitActive(false);
      const rafId = window.requestAnimationFrame(function () {
        setIsFocusExitActive(true);
      });

      const timeoutId = window.setTimeout(function () {
        setFocusedItemId(null);
        setFocusPhase(EFocusPhase.Idle);
        setIsFocusExitActive(false);
      }, TIMELINE_FOCUS_TRANSITION_MS);

      return function () {
        window.cancelAnimationFrame(rafId);
        window.clearTimeout(timeoutId);
      };
    },
    [focusedItemId, focusPhase],
  );

  useEffect(
    function () {
      const listElement = listRef.current;

      if (!listElement) {
        setFocusShiftById(null);
        return;
      }

      measureFocusShiftFromLayout();
      const rafId = window.requestAnimationFrame(measureFocusShiftFromLayout);
      let previousViewportHeight = window.innerHeight;

      function handleVerticalResize() {
        const nextViewportHeight = window.innerHeight;

        if (nextViewportHeight === previousViewportHeight) {
          return;
        }

        previousViewportHeight = nextViewportHeight;
        measureFocusShiftFromLayout();
      }

      window.addEventListener("resize", handleVerticalResize);

      return function () {
        window.cancelAnimationFrame(rafId);
        window.removeEventListener("resize", handleVerticalResize);
      };
    },
    [shouldRevealItems],
  );

  useEffect(
    function () {
      const articleElement = articleRef.current;
      const listElement = listRef.current;

      if (!articleElement || !listElement) {
        setLineHeight(TIMELINE_EMPTY_STATE_VALUE);
        return;
      }

      const observedArticle = articleElement;
      const observedList = listElement;

      function measureLineGeometry() {
        if (!isDesktopViewport) {
          setLineHeight(observedList.scrollHeight);
          return;
        }

        const circleElements = Array.from(
          observedList.querySelectorAll<HTMLElement>(
            ".timeline-item [data-timeline-circle]",
          ),
        );

        if (circleElements.length === TIMELINE_EMPTY_STATE_VALUE) {
          setLineHeight(TIMELINE_EMPTY_STATE_VALUE);
          return;
        }

        const articleRect = observedArticle.getBoundingClientRect();
        const firstRect =
          circleElements[TIMELINE_FIRST_ITEM_INDEX].getBoundingClientRect();
        const lastRect =
          circleElements[
            circleElements.length - TIMELINE_LAST_ITEM_OFFSET
          ].getBoundingClientRect();
        const bottom =
          lastRect.bottom - articleRect.top + TIMELINE_LINE_CIRCLE_OFFSET_PX;
        const top =
          firstRect.top - articleRect.top - TIMELINE_LINE_CIRCLE_OFFSET_PX;
        const nextLineHeight = Math.max(
          bottom - top,
          TIMELINE_EMPTY_STATE_VALUE,
        );

        setLineHeight(nextLineHeight);
      }

      measureLineGeometry();

      const rafId = window.requestAnimationFrame(measureLineGeometry);
      let previousViewportHeight = window.innerHeight;

      function handleVerticalResize() {
        const nextViewportHeight = window.innerHeight;

        if (nextViewportHeight === previousViewportHeight) {
          return;
        }

        previousViewportHeight = nextViewportHeight;
        measureLineGeometry();
      }

      window.addEventListener("resize", handleVerticalResize);

      return function () {
        window.cancelAnimationFrame(rafId);
        window.removeEventListener("resize", handleVerticalResize);
      };
    },
    [focusedItemId, focusPhase, isDesktopViewport, shouldRevealItems],
  );

  const focusListClass =
    focusPhase === EFocusPhase.Entering
      ? "timeline-list--focus-entering"
      : focusPhase === EFocusPhase.Focused
        ? "timeline-list--focused"
        : focusPhase === EFocusPhase.Exiting
          ? `timeline-list--focus-exiting ${isFocusExitActive ? "timeline-list--focus-exit-active" : ""}`
          : "";
  const isFocusedPhase = focusPhase === EFocusPhase.Focused;
  const isTransitionPhase =
    focusPhase === EFocusPhase.Preparing ||
    focusPhase === EFocusPhase.Entering ||
    focusPhase === EFocusPhase.Exiting;

  function createHandleTimelineItemToggle(
    itemId: string,
    isTargetItem: boolean,
    isToggleLocked: boolean,
  ) {
    return function handleTimelineItemToggle() {
      if (isToggleLocked) {
        return;
      }

      if (focusPhase === EFocusPhase.Idle) {
        measureFocusShiftFromLayout();
        setFocusedItemId(itemId);
        setFocusPhase(EFocusPhase.Preparing);
        return;
      }

      if (focusPhase === EFocusPhase.Focused && isTargetItem) {
        setFocusPhase(EFocusPhase.Exiting);
      }
    };
  }

  return (
    <article
      ref={articleRef}
      className={`relative px-5 max-[1024px]:px-0 text-white ${isDesktopViewport ? "h-full" : "h-auto"}`}
    >
      <span
        className="pointer-events-none absolute top-0 left-[calc(70px+0.25rem)] max-[1024px]:left-[calc(50px+0.25rem)] max-[640px]:left-[calc(40px+0.25rem)] z-0 w-[2px] bg-[color:var(--color-accent)]/70"
        style={{ height: `${lineHeight}px` }}
      />

      <ul
        ref={listRef}
        className={`timeline-list relative z-10 px-1 pt-[25px] pb-[25px] ${isDesktopViewport ? "h-full" : "h-auto"} ${shouldRevealItems ? "timeline-list--active" : ""} ${focusListClass} flex flex-col justify-start max-[1024px]:gap-4`}
      >
        {items.map(function (item, index) {
          const isTargetItem = hasFocusedItem && focusedItemId === item.id;
          const isFocused = isFocusedPhase && isTargetItem;
          const isExpanded = isFocused;
          const isDimmed = isFocusedPhase && hasFocusedItem && !isTargetItem;
          const isTargetItemMoving = isTargetItem && isTransitionPhase;
          const shouldHideRightContent =
            (hasFocusedItem && !isTargetItem) || isTargetItemMoving;
          const isToggleLocked =
            !isInitialRevealComplete ||
            isTransitionPhase ||
            (isFocusedPhase && !isTargetItem);

          return (
            <TimelineItem
              key={item.id}
              item={item}
              FirstRowComponent={FirstRowComponent}
              SecondRowComponent={SecondRowComponent}
              ThirdRowComponent={ThirdRowComponent}
              showToggle={showToggle}
              onSkillEnter={onSkillEnter}
              onSkillLeave={onSkillLeave}
              shouldHideRightContent={shouldHideRightContent}
              hasActiveItem={hasFocusedItem}
              isActiveItem={isTargetItem}
              isExpanded={isExpanded}
              isFocused={isFocused}
              isDimmed={isDimmed}
              isInFocusedMode={isFocused}
              itemIndex={index}
              focusShiftPx={
                focusShiftById?.[item.id] ?? TIMELINE_EMPTY_STATE_VALUE
              }
              animationDelayMs={index * TIMELINE_REVEAL_STAGGER_MS}
              isToggleDisabled={isToggleLocked}
              onToggle={createHandleTimelineItemToggle(
                item.id,
                isTargetItem,
                isToggleLocked,
              )}
            />
          );
        })}
      </ul>
    </article>
  );
}
