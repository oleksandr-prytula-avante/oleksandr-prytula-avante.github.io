import { useEffect, useRef, useState } from "react";

import { EXPERIENCE_TIMELINE_ITEMS } from "../../constants/experienceTimeline";
import { useActiveSectionHash } from "../../hooks/useActiveSectionHash";
import { ESectionId, toSectionHash } from "../../utils/sections";
import { ExperienceItem } from "./ExperienceItem";

import "./Experience.css";

const EXPERIENCE_REVEAL_STAGGER_MS = 240;
const EXPERIENCE_REVEAL_DURATION_MS = 460;
const EXPERIENCE_FOCUS_TRANSITION_MS = 460;
const EXPERIENCE_VISIBILITY_OPACITY_THRESHOLD = 0.35;
const EXPERIENCE_LINE_CIRCLE_OFFSET_PX = 25;
const EXPERIENCE_EMPTY_STATE_VALUE = 0;
const EXPERIENCE_FIRST_ITEM_INDEX = 0;
const EXPERIENCE_LAST_ITEM_OFFSET = 1;

enum EFocusPhase {
  Idle = "idle",
  Preparing = "preparing",
  Entering = "entering",
  Focused = "focused",
  Exiting = "exiting",
}

type ExperienceProps = {
  onSkillEnter: (skill: string) => void;
  onSkillLeave: () => void;
};

export function Experience(props: ExperienceProps) {
  const { onSkillEnter, onSkillLeave } = props;
  const [focusedItemId, setFocusedItemId] = useState<string | null>(null);
  const [focusPhase, setFocusPhase] = useState<EFocusPhase>(EFocusPhase.Idle);
  const [isFocusExitActive, setIsFocusExitActive] = useState(false);
  const [shouldRevealItems, setShouldRevealItems] = useState(false);
  const [isInitialRevealComplete, setIsInitialRevealComplete] = useState(false);
  const [lineHeight, setLineHeight] = useState(EXPERIENCE_EMPTY_STATE_VALUE);
  const [focusShiftById, setFocusShiftById] = useState<Record<
    string,
    number
  > | null>(null);
  const articleRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const { activeHash } = useActiveSectionHash(toSectionHash(ESectionId.About));
  const isExperienceActive =
    activeHash === toSectionHash(ESectionId.Expirience);
  const hasFocusedItem = focusedItemId !== null;

  function resetExperienceState() {
    setShouldRevealItems(false);
    setIsInitialRevealComplete(false);
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
      listElement.querySelectorAll<HTMLElement>("[data-experience-item-id]"),
    );

    if (itemElements.length === EXPERIENCE_EMPTY_STATE_VALUE) {
      setFocusShiftById(null);
      return;
    }

    const firstTop =
      itemElements[EXPERIENCE_FIRST_ITEM_INDEX].getBoundingClientRect().top;
    const firstItemId =
      itemElements[EXPERIENCE_FIRST_ITEM_INDEX].dataset.experienceItemId;
    const nextShiftById: Record<string, number> = {};

    itemElements.forEach(function (itemElement) {
      const itemId = itemElement.dataset.experienceItemId;

      if (!itemId) {
        return;
      }

      const itemTop = itemElement.getBoundingClientRect().top;
      nextShiftById[itemId] = Math.round(itemTop - firstTop);
    });

    if (firstItemId) {
      nextShiftById[firstItemId] = EXPERIENCE_EMPTY_STATE_VALUE;
    }

    setFocusShiftById(nextShiftById);
  }

  useEffect(
    function () {
      if (!isExperienceActive) {
        resetExperienceState();
        return;
      }

      const listElement = listRef.current;

      if (!listElement) {
        resetExperienceState();
        return;
      }

      const observedList = listElement;

      setShouldRevealItems(false);
      setIsInitialRevealComplete(false);

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
            opacity < EXPERIENCE_VISIBILITY_OPACITY_THRESHOLD
          ) {
            return false;
          }

          node = node.parentElement;
        }

        return true;
      }

      let animationFrameId = EXPERIENCE_EMPTY_STATE_VALUE;
      let isCancelled = false;

      function waitUntilVisible() {
        if (isCancelled || !observedList.isConnected) {
          return;
        }

        if (isActuallyVisible(observedList)) {
          setShouldRevealItems(true);
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
    [isExperienceActive],
  );

  useEffect(
    function () {
      if (!shouldRevealItems) {
        return;
      }

      const lastItemDelay =
        (EXPERIENCE_TIMELINE_ITEMS.length - 1) * EXPERIENCE_REVEAL_STAGGER_MS;
      const totalRevealDuration = lastItemDelay + EXPERIENCE_REVEAL_DURATION_MS;

      const timeoutId = window.setTimeout(function () {
        setIsInitialRevealComplete(true);
      }, totalRevealDuration);

      return function () {
        window.clearTimeout(timeoutId);
      };
    },
    [shouldRevealItems],
  );

  useEffect(
    function () {
      if (!focusedItemId || focusPhase !== EFocusPhase.Preparing) {
        return;
      }

      measureFocusShiftFromLayout();

      let secondRafId = EXPERIENCE_EMPTY_STATE_VALUE;
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
      }, EXPERIENCE_FOCUS_TRANSITION_MS);

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
      }, EXPERIENCE_FOCUS_TRANSITION_MS);

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
        setLineHeight(EXPERIENCE_EMPTY_STATE_VALUE);
        return;
      }

      const observedArticle = articleElement;
      const observedList = listElement;

      function measureLineGeometry() {
        const circleElements = Array.from(
          observedList.querySelectorAll<HTMLElement>(
            ".experience-item [data-experience-circle]",
          ),
        );

        if (circleElements.length === EXPERIENCE_EMPTY_STATE_VALUE) {
          setLineHeight(EXPERIENCE_EMPTY_STATE_VALUE);
          return;
        }

        const articleRect = observedArticle.getBoundingClientRect();
        const firstRect =
          circleElements[EXPERIENCE_FIRST_ITEM_INDEX].getBoundingClientRect();
        const lastRect =
          circleElements[
            circleElements.length - EXPERIENCE_LAST_ITEM_OFFSET
          ].getBoundingClientRect();
        const bottom =
          lastRect.bottom - articleRect.top + EXPERIENCE_LINE_CIRCLE_OFFSET_PX;
        const top =
          firstRect.top - articleRect.top - EXPERIENCE_LINE_CIRCLE_OFFSET_PX;
        const nextLineHeight = Math.max(
          bottom - top,
          EXPERIENCE_EMPTY_STATE_VALUE,
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
    [shouldRevealItems],
  );

  const focusListClass =
    focusPhase === EFocusPhase.Entering
      ? "experience-list--focus-entering"
      : focusPhase === EFocusPhase.Focused
        ? "experience-list--focused"
        : focusPhase === EFocusPhase.Exiting
          ? `experience-list--focus-exiting ${isFocusExitActive ? "experience-list--focus-exit-active" : ""}`
          : "";
  const isFocusedPhase = focusPhase === EFocusPhase.Focused;
  const isTransitionPhase =
    focusPhase === EFocusPhase.Preparing ||
    focusPhase === EFocusPhase.Entering ||
    focusPhase === EFocusPhase.Exiting;

  function createHandleExperienceItemToggle(
    itemId: string,
    isTargetItem: boolean,
    isToggleLocked: boolean,
  ) {
    return function handleExperienceItemToggle() {
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
    <article ref={articleRef} className="relative h-full px-5 text-white">
      <span
        className="pointer-events-none absolute top-0 left-[calc(70px+0.25rem)] z-0 w-[2px] bg-[color:var(--color-accent)]/70"
        style={{ height: `${lineHeight}px` }}
      />

      <ul
        ref={listRef}
        className={`experience-list relative z-10 h-full px-1 pt-[25px] pb-[25px] ${shouldRevealItems ? "experience-list--active" : ""} ${focusListClass} flex flex-col justify-start`}
      >
        {EXPERIENCE_TIMELINE_ITEMS.map(function (item, index) {
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
            <ExperienceItem
              key={item.id}
              item={item}
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
                focusShiftById?.[item.id] ?? EXPERIENCE_EMPTY_STATE_VALUE
              }
              animationDelayMs={index * EXPERIENCE_REVEAL_STAGGER_MS}
              isToggleDisabled={isToggleLocked}
              onToggle={createHandleExperienceItemToggle(
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
