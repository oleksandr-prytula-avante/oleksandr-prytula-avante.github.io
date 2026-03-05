import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import {
  EXPERIENCE_TIMELINE_ITEMS,
  type ExperienceTimelineItem,
} from "../../constants/experienceTimeline";
import { Tag } from "../../components/Tags/Tag";
import { ExperienceCompanyIcon } from "../../components/icons/ExperienceCompanyIcon";
import { ExperienceExpandIcon } from "../../components/icons/ExperienceExpandIcon";
import { ExperienceJobTitleIcon } from "../../components/icons/ExperienceJobTitleIcon";
import { ExperienceLocationIcon } from "../../components/icons/ExperienceLocationIcon";
import { PipeSeparatedText } from "../../components/PipeSeparatedText";
import { useActiveSectionHash } from "../../hooks/useActiveSectionHash";
import { useI18n } from "../../hooks/useI18n";
import { ELocale, ETranslationKey } from "../../i18n/types";
import { ESectionId, toSectionHash } from "../../utils/sections";
import { buildPeriodLabel } from "../../utils/time";

import "./Experience.css";

const EXPERIENCE_REVEAL_STAGGER_MS = 240;
const EXPERIENCE_REVEAL_DURATION_MS = 460;
const EXPERIENCE_FOCUS_TRANSITION_MS = 460;

type ExperienceTextKeys = {
  companyName: ETranslationKey;
  jobTitle: ETranslationKey;
  location: ETranslationKey;
  description: ETranslationKey;
  highlights: ETranslationKey[];
};

function getExperienceTextKeys(itemId: string): ExperienceTextKeys {
  switch (itemId) {
    case "omnora":
      return {
        companyName: ETranslationKey.ExperienceOmnoraCompanyName,
        jobTitle: ETranslationKey.ExperienceOmnoraJobTitle,
        location: ETranslationKey.ExperienceOmnoraLocation,
        description: ETranslationKey.ExperienceOmnoraDescription,
        highlights: [
          ETranslationKey.ExperienceOmnoraHighlight1,
          ETranslationKey.ExperienceOmnoraHighlight2,
          ETranslationKey.ExperienceOmnoraHighlight3,
          ETranslationKey.ExperienceOmnoraHighlight4,
          ETranslationKey.ExperienceOmnoraHighlight5,
          ETranslationKey.ExperienceOmnoraHighlight6,
          ETranslationKey.ExperienceOmnoraHighlight7,
          ETranslationKey.ExperienceOmnoraHighlight8,
          ETranslationKey.ExperienceOmnoraHighlight9,
        ],
      };
    case "digitalsuits":
      return {
        companyName: ETranslationKey.ExperienceDigitalsuitsCompanyName,
        jobTitle: ETranslationKey.ExperienceDigitalsuitsJobTitle,
        location: ETranslationKey.ExperienceDigitalsuitsLocation,
        description: ETranslationKey.ExperienceDigitalsuitsDescription,
        highlights: [
          ETranslationKey.ExperienceDigitalsuitsHighlight1,
          ETranslationKey.ExperienceDigitalsuitsHighlight2,
          ETranslationKey.ExperienceDigitalsuitsHighlight3,
          ETranslationKey.ExperienceDigitalsuitsHighlight4,
          ETranslationKey.ExperienceDigitalsuitsHighlight5,
          ETranslationKey.ExperienceDigitalsuitsHighlight6,
          ETranslationKey.ExperienceDigitalsuitsHighlight7,
          ETranslationKey.ExperienceDigitalsuitsHighlight8,
        ],
      };
    case "code-and-care":
      return {
        companyName: ETranslationKey.ExperienceCodeAndCareCompanyName,
        jobTitle: ETranslationKey.ExperienceCodeAndCareJobTitle,
        location: ETranslationKey.ExperienceCodeAndCareLocation,
        description: ETranslationKey.ExperienceCodeAndCareDescription,
        highlights: [
          ETranslationKey.ExperienceCodeAndCareHighlight1,
          ETranslationKey.ExperienceCodeAndCareHighlight2,
          ETranslationKey.ExperienceCodeAndCareHighlight3,
          ETranslationKey.ExperienceCodeAndCareHighlight4,
          ETranslationKey.ExperienceCodeAndCareHighlight5,
          ETranslationKey.ExperienceCodeAndCareHighlight6,
        ],
      };
    case "lanars":
      return {
        companyName: ETranslationKey.ExperienceLanarsCompanyName,
        jobTitle: ETranslationKey.ExperienceLanarsJobTitle,
        location: ETranslationKey.ExperienceLanarsLocation,
        description: ETranslationKey.ExperienceLanarsDescription,
        highlights: [
          ETranslationKey.ExperienceLanarsHighlight1,
          ETranslationKey.ExperienceLanarsHighlight2,
          ETranslationKey.ExperienceLanarsHighlight3,
          ETranslationKey.ExperienceLanarsHighlight4,
          ETranslationKey.ExperienceLanarsHighlight5,
          ETranslationKey.ExperienceLanarsHighlight6,
        ],
      };
    default:
      return {
        companyName: ETranslationKey.ExperienceOmnoraCompanyName,
        jobTitle: ETranslationKey.ExperienceOmnoraJobTitle,
        location: ETranslationKey.ExperienceOmnoraLocation,
        description: ETranslationKey.ExperienceOmnoraDescription,
        highlights: [
          ETranslationKey.ExperienceOmnoraHighlight1,
          ETranslationKey.ExperienceOmnoraHighlight2,
          ETranslationKey.ExperienceOmnoraHighlight3,
          ETranslationKey.ExperienceOmnoraHighlight4,
          ETranslationKey.ExperienceOmnoraHighlight5,
          ETranslationKey.ExperienceOmnoraHighlight6,
          ETranslationKey.ExperienceOmnoraHighlight7,
          ETranslationKey.ExperienceOmnoraHighlight8,
          ETranslationKey.ExperienceOmnoraHighlight9,
        ],
      };
  }
}

function getDateLocale(locale: ELocale): string {
  switch (locale) {
    case ELocale.Ru:
      return "ru";
    case ELocale.De:
      return "de";
    case ELocale.Sp:
      return "es";
    default:
      return "en";
  }
}

type ExperienceItemProps = {
  item: ExperienceTimelineItem;
  isExpanded: boolean;
  isFocused: boolean;
  isDimmed: boolean;
  isInFocusedMode: boolean;
  focusShiftPx: number;
  animationDelayMs: number;
  isToggleDisabled: boolean;
  onToggle: () => void;
};

function ExperienceItem(props: ExperienceItemProps) {
  const {
    item,
    isExpanded,
    isFocused,
    isDimmed,
    isInFocusedMode,
    focusShiftPx,
    animationDelayMs,
    isToggleDisabled,
    onToggle,
  } = props;
  const i18n = useI18n();
  const textKeys = getExperienceTextKeys(item.id);
  const companyName = i18n.t(textKeys.companyName);
  const descriptionId = `${item.id}-description`;
  const periodLabel = buildPeriodLabel(
    item.startDate,
    item.endDate,
    i18n.t(ETranslationKey.ExperiencePresent),
    getDateLocale(i18n.locale),
  );
  const locationText = i18n.t(textKeys.location);
  const localizedHighlights = textKeys.highlights.map(function (highlightKey) {
    return i18n.t(highlightKey);
  });

  return (
    <li
      className={`experience-item relative pl-32 ${isInFocusedMode ? "h-full" : "h-[25%]"} ${isFocused ? "experience-item--focused" : ""} ${isDimmed ? "experience-item--hidden" : ""}`}
      data-experience-item-id={item.id}
      style={
        {
          "--experience-delay": `${animationDelayMs}ms`,
          "--focus-shift": `${focusShiftPx}px`,
        } as CSSProperties
      }
    >
      <a
        href={item.companyUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`${companyName} website`}
        data-experience-circle
        className="absolute left-0 top-0 z-10 flex h-[100px] w-[100px] cursor-pointer items-center justify-center rounded-full border-2 border-[color:var(--color-accent)] bg-white"
      >
        <img
          src={item.companyLogoSrc}
          alt={`${companyName} logo`}
          className={`${item.id === "digitalsuits" ? "w-1/2" : "h-12 w-12"} object-contain`}
          loading="lazy"
        />
      </a>

      <div className="flex h-full min-h-0 flex-col pb-8 text-sm text-white/95">
        <div className="shrink-0 space-y-2">
          <div className="flex items-center gap-2">
            <ExperienceCompanyIcon className="h-5 w-5 shrink-0 text-white" />
            <a
              href={item.companyUrl}
              target="_blank"
              rel="noreferrer"
              className="truncate text-[1.09375rem] uppercase transition-colors duration-200 ease-out hover:text-[color:var(--color-accent)]"
            >
              <PipeSeparatedText
                value={companyName}
                className="inline-flex items-center gap-2"
              />
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <ExperienceJobTitleIcon className="h-5 w-5 shrink-0 text-white" />
            <span>{i18n.t(textKeys.jobTitle)}</span>
            <span className="text-white/60">|</span>
            <span>{periodLabel.dateRange}</span>
            <span className="text-white/60">|</span>
            <span>{periodLabel.duration}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <ExperienceLocationIcon className="h-5 w-5 shrink-0 text-white" />
            <PipeSeparatedText
              value={locationText}
              className="inline-flex items-center gap-2"
            />
            <span className="text-white/60">|</span>

            <button
              type="button"
              onClick={onToggle}
              disabled={isToggleDisabled}
              aria-expanded={isExpanded}
              aria-controls={descriptionId}
              className={`inline-flex items-center gap-1 text-sm uppercase text-[color:var(--color-accent)] transition-colors duration-200 ease-out ${
                isToggleDisabled
                  ? "cursor-not-allowed opacity-60"
                  : "cursor-pointer hover:text-white"
              }`}
            >
              <span>
                {isExpanded
                  ? i18n.t(ETranslationKey.ExperienceHideDetails)
                  : i18n.t(ETranslationKey.ExperienceExpandDetails)}
              </span>
              <ExperienceExpandIcon
                className={`h-5 w-5 transition-transform duration-200 ease-out ${isExpanded ? "rotate-180" : "rotate-0"}`}
              />
            </button>
          </div>
        </div>

        {isExpanded ? (
          <div
            id={descriptionId}
            className="mt-3 min-h-0 flex-1 overflow-y-auto pr-2 text-sm text-white/90"
          >
            {item.technologyTags.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {item.technologyTags.map(function (tag) {
                  return (
                    <li key={`${item.id}-${tag}`}>
                      <Tag
                        label={tag}
                        className="inline-flex rounded-full border border-white/40 px-3 py-1 text-xs uppercase tracking-[0.06em] text-white/90 transition-colors duration-200 ease-out hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
                        onSelectSkill={function (skill: string): void {
                          void skill;
                        }}
                        onClearSkill={function (): void {}}
                      />
                    </li>
                  );
                })}
              </ul>
            ) : null}

            {localizedHighlights.length > 0 ? (
              <ul className="mt-3 space-y-2 leading-relaxed">
                {localizedHighlights.map(function (highlight, highlightIndex) {
                  return (
                    <li key={`${item.id}-highlight-${highlightIndex}`}>
                      {`- ${highlight}`}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        ) : null}
      </div>
    </li>
  );
}

type FocusPhase = "idle" | "preparing" | "entering" | "focused" | "exiting";

export function Experience() {
  const [focusedItemId, setFocusedItemId] = useState<string | null>(null);
  const [focusPhase, setFocusPhase] = useState<FocusPhase>("idle");
  const [isFocusExitActive, setIsFocusExitActive] = useState(false);
  const [shouldRevealItems, setShouldRevealItems] = useState(false);
  const [isInitialRevealComplete, setIsInitialRevealComplete] = useState(false);
  const [lineHeight, setLineHeight] = useState(0);
  const [focusShiftById, setFocusShiftById] = useState<Record<string, number>>(
    {},
  );
  const articleRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const { activeHash } = useActiveSectionHash(toSectionHash(ESectionId.About));
  const isExperienceActive =
    activeHash === toSectionHash(ESectionId.Expirience);
  const hasFocusedItem = focusedItemId !== null;

  function measureFocusShiftFromLayout() {
    const listElement = listRef.current;

    if (!listElement) {
      setFocusShiftById({});
      return;
    }

    const itemElements = Array.from(
      listElement.querySelectorAll<HTMLElement>("[data-experience-item-id]"),
    );

    if (itemElements.length === 0) {
      setFocusShiftById({});
      return;
    }

    const firstTop = itemElements[0].getBoundingClientRect().top;
    const firstItemId = itemElements[0].dataset.experienceItemId;
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
      nextShiftById[firstItemId] = 0;
    }

    setFocusShiftById(nextShiftById);
  }

  useEffect(
    function () {
      if (!isExperienceActive) {
        setShouldRevealItems(false);
        setIsInitialRevealComplete(false);
        setFocusedItemId(null);
        setFocusPhase("idle");
        setIsFocusExitActive(false);
        return;
      }

      const listElement = listRef.current;

      if (!listElement) {
        setShouldRevealItems(false);
        setIsInitialRevealComplete(false);
        setFocusedItemId(null);
        setFocusPhase("idle");
        setIsFocusExitActive(false);
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
            opacity < 0.35
          ) {
            return false;
          }

          node = node.parentElement;
        }

        return true;
      }

      let animationFrameId = 0;
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
      if (!focusedItemId || focusPhase !== "preparing") {
        return;
      }

      measureFocusShiftFromLayout();

      let secondRafId = 0;
      const firstRafId = window.requestAnimationFrame(function () {
        measureFocusShiftFromLayout();
        secondRafId = window.requestAnimationFrame(function () {
          setFocusPhase("entering");
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
      if (!focusedItemId || focusPhase !== "entering") {
        return;
      }

      const timeoutId = window.setTimeout(function () {
        setFocusPhase("focused");
      }, EXPERIENCE_FOCUS_TRANSITION_MS);

      return function () {
        window.clearTimeout(timeoutId);
      };
    },
    [focusedItemId, focusPhase],
  );

  useEffect(
    function () {
      if (!focusedItemId || focusPhase !== "exiting") {
        return;
      }

      setIsFocusExitActive(false);
      const rafId = window.requestAnimationFrame(function () {
        setIsFocusExitActive(true);
      });

      const timeoutId = window.setTimeout(function () {
        setFocusedItemId(null);
        setFocusPhase("idle");
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
        setFocusShiftById({});
        return;
      }

      measureFocusShiftFromLayout();
      const rafId = window.requestAnimationFrame(measureFocusShiftFromLayout);
      window.addEventListener("resize", measureFocusShiftFromLayout);

      return function () {
        window.cancelAnimationFrame(rafId);
        window.removeEventListener("resize", measureFocusShiftFromLayout);
      };
    },
    [shouldRevealItems],
  );

  useEffect(
    function () {
      const articleElement = articleRef.current;
      const listElement = listRef.current;

      if (!articleElement || !listElement) {
        setLineHeight(0);
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

        if (circleElements.length === 0) {
          setLineHeight(0);
          return;
        }

        const articleRect = observedArticle.getBoundingClientRect();
        const firstRect = circleElements[0].getBoundingClientRect();
        const lastRect =
          circleElements[circleElements.length - 1].getBoundingClientRect();
        const bottom = lastRect.bottom - articleRect.top + 25;
        const top = firstRect.top - articleRect.top - 25;
        const nextLineHeight = Math.max(bottom - top, 0);

        setLineHeight(nextLineHeight);
      }

      measureLineGeometry();
      const rafId = window.requestAnimationFrame(measureLineGeometry);
      window.addEventListener("resize", measureLineGeometry);

      return function () {
        window.cancelAnimationFrame(rafId);
        window.removeEventListener("resize", measureLineGeometry);
      };
    },
    [shouldRevealItems],
  );

  const focusListClass =
    focusPhase === "entering"
      ? "experience-list--focus-entering"
      : focusPhase === "focused"
        ? "experience-list--focused"
        : focusPhase === "exiting"
          ? `experience-list--focus-exiting ${isFocusExitActive ? "experience-list--focus-exit-active" : ""}`
          : "";

  return (
    <article ref={articleRef} className="relative h-full px-5 text-white">
      <span
        className="pointer-events-none absolute top-0 left-[calc(70px+0.25rem)] z-0 w-[2px] bg-[color:var(--color-accent)]/70"
        style={{ height: `${lineHeight}px` }}
      />

      <ul
        ref={listRef}
        className={`experience-list relative z-10 h-full px-1 pt-[25px] pb-[25px] ${shouldRevealItems ? "experience-list--active" : ""} ${focusListClass} flex flex-col justify-start gap-2`}
      >
        {EXPERIENCE_TIMELINE_ITEMS.map(function (item, index) {
          const isTargetItem = hasFocusedItem && focusedItemId === item.id;
          const isFocused = focusPhase === "focused" && isTargetItem;
          const isExpanded = focusPhase === "focused" && isTargetItem;
          const isDimmed =
            focusPhase === "focused" && hasFocusedItem && !isTargetItem;
          const isAnimationLocked =
            focusPhase === "preparing" ||
            focusPhase === "entering" ||
            focusPhase === "exiting";
          const isToggleLocked =
            !isInitialRevealComplete ||
            isAnimationLocked ||
            (focusPhase === "focused" && !isTargetItem);

          return (
            <ExperienceItem
              key={item.id}
              item={item}
              isExpanded={isExpanded}
              isFocused={isFocused}
              isDimmed={isDimmed}
              isInFocusedMode={focusPhase === "focused" && isTargetItem}
              focusShiftPx={focusShiftById[item.id] ?? 0}
              animationDelayMs={index * EXPERIENCE_REVEAL_STAGGER_MS}
              isToggleDisabled={isToggleLocked}
              onToggle={function () {
                if (isToggleLocked) {
                  return;
                }

                if (focusPhase === "idle") {
                  measureFocusShiftFromLayout();
                  setFocusedItemId(item.id);
                  setFocusPhase("preparing");
                  return;
                }

                if (focusPhase === "focused" && isTargetItem) {
                  setFocusPhase("exiting");
                }
              }}
            />
          );
        })}
      </ul>
    </article>
  );
}
