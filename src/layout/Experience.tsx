import { Fragment, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import {
  EXPERIENCE_TIMELINE_ITEMS,
  type ExperienceTimelineItem,
} from "../constants/experienceTimeline";
import { ExperienceCompanyIcon } from "../components/icons/ExperienceCompanyIcon";
import { ExperienceExpandIcon } from "../components/icons/ExperienceExpandIcon";
import { ExperienceJobTitleIcon } from "../components/icons/ExperienceJobTitleIcon";
import { ExperienceLocationIcon } from "../components/icons/ExperienceLocationIcon";
import { useActiveSectionHash } from "../hooks/useActiveSectionHash";
import { useI18n } from "../hooks/useI18n";
import { ELocale, ETranslationKey } from "../i18n/types";
import { ESectionId, toSectionHash } from "../utils/sections";

import "./Experience.css";

const EXPERIENCE_REVEAL_STAGGER_MS = 240;
const EXPERIENCE_REVEAL_DURATION_MS = 460;
const EXPERIENCE_FOCUS_TRANSITION_MS = 460;

type YearMonth = {
  year: number;
  month: number;
};

type ExperienceTextKeys = {
  companyName: ETranslationKey;
  jobTitle: ETranslationKey;
  location: ETranslationKey;
  description: ETranslationKey;
};

function getExperienceTextKeys(itemId: string): ExperienceTextKeys {
  switch (itemId) {
    case "omnora":
      return {
        companyName: ETranslationKey.ExperienceOmnoraCompanyName,
        jobTitle: ETranslationKey.ExperienceOmnoraJobTitle,
        location: ETranslationKey.ExperienceOmnoraLocation,
        description: ETranslationKey.ExperienceOmnoraDescription,
      };
    case "digitalsuits":
      return {
        companyName: ETranslationKey.ExperienceDigitalsuitsCompanyName,
        jobTitle: ETranslationKey.ExperienceDigitalsuitsJobTitle,
        location: ETranslationKey.ExperienceDigitalsuitsLocation,
        description: ETranslationKey.ExperienceDigitalsuitsDescription,
      };
    case "code-and-care":
      return {
        companyName: ETranslationKey.ExperienceCodeAndCareCompanyName,
        jobTitle: ETranslationKey.ExperienceCodeAndCareJobTitle,
        location: ETranslationKey.ExperienceCodeAndCareLocation,
        description: ETranslationKey.ExperienceCodeAndCareDescription,
      };
    case "lanars":
      return {
        companyName: ETranslationKey.ExperienceLanarsCompanyName,
        jobTitle: ETranslationKey.ExperienceLanarsJobTitle,
        location: ETranslationKey.ExperienceLanarsLocation,
        description: ETranslationKey.ExperienceLanarsDescription,
      };
    default:
      return {
        companyName: ETranslationKey.ExperienceOmnoraCompanyName,
        jobTitle: ETranslationKey.ExperienceOmnoraJobTitle,
        location: ETranslationKey.ExperienceOmnoraLocation,
        description: ETranslationKey.ExperienceOmnoraDescription,
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

function parseYearMonth(value: string): YearMonth {
  const [yearPart, monthPart] = value.split("-");
  const year = Number(yearPart);
  const month = Number(monthPart);

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    month < 1 ||
    month > 12
  ) {
    throw new Error(`Invalid date format: ${value}. Expected YYYY-MM.`);
  }

  return { year, month };
}

function formatMonthYear(value: YearMonth, locale: string): string {
  const date = new Date(value.year, value.month - 1, 1);
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatDuration(totalMonths: number): string {
  if (totalMonths <= 0) {
    return "0 mos";
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  }

  if (months > 0) {
    parts.push(`${months} ${months === 1 ? "mo" : "mos"}`);
  }

  return parts.join(" ");
}

function buildPeriodLabel(
  startDate: string,
  endDate: string | null,
  presentLabel: string,
  locale: string,
): { dateRange: string; duration: string } {
  const parsedStart = parseYearMonth(startDate);

  let parsedEnd: YearMonth;

  if (endDate === null) {
    const now = new Date();
    parsedEnd = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
    };
  } else {
    parsedEnd = parseYearMonth(endDate);
  }

  const monthDiff =
    (parsedEnd.year - parsedStart.year) * 12 +
    (parsedEnd.month - parsedStart.month) +
    1;

  const safeMonthDiff = Math.max(monthDiff, 0);
  const startLabel = formatMonthYear(parsedStart, locale);
  const endLabel =
    endDate === null ? presentLabel : formatMonthYear(parsedEnd, locale);

  return {
    dateRange: `${startLabel} - ${endLabel}`,
    duration: formatDuration(safeMonthDiff),
  };
}

function PipeSeparatedText({
  value,
  className,
  separatorClassName,
}: {
  value: string;
  className?: string;
  separatorClassName?: string;
}) {
  const parts = value
    .split("|")
    .map(function (part) {
      return part.trim();
    })
    .filter(function (part) {
      return part.length > 0;
    });

  return (
    <span className={className}>
      {parts.map(function (part, index) {
        return (
          <Fragment key={`${part}-${index}`}>
            {index > 0 ? (
              <span className={separatorClassName ?? "text-white/60"}>|</span>
            ) : null}
            <span>{part}</span>
          </Fragment>
        );
      })}
    </span>
  );
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

function ExperienceItem({
  item,
  isExpanded,
  isFocused,
  isDimmed,
  isInFocusedMode,
  focusShiftPx,
  animationDelayMs,
  isToggleDisabled,
  onToggle,
}: ExperienceItemProps) {
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

  return (
    <li
      className={`experience-item relative pl-32 ${isInFocusedMode ? "h-auto" : "h-[25%]"} ${isFocused ? "experience-item--focused" : ""} ${isDimmed ? "experience-item--hidden" : ""}`}
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

      <div className="pb-8 text-sm text-white/95">
        <div className="flex min-h-[100px] flex-col justify-center space-y-2">
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
          <p
            id={descriptionId}
            className="pt-3 text-sm leading-relaxed text-white/90"
          >
            {i18n.t(textKeys.description)}
          </p>
        ) : null}
      </div>
    </li>
  );
}

type FocusPhase = "idle" | "entering" | "focused" | "exiting";

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

      const observedList = listElement;

      function measureFocusShift() {
        const itemElements = Array.from(
          observedList.querySelectorAll<HTMLElement>("[data-experience-item-id]"),
        );

        if (itemElements.length === 0) {
          setFocusShiftById({});
          return;
        }

        const firstTop = itemElements[0].getBoundingClientRect().top;
        const nextShiftById: Record<string, number> = {};

        itemElements.forEach(function (itemElement) {
          const itemId = itemElement.dataset.experienceItemId;

          if (!itemId) {
            return;
          }

          const itemTop = itemElement.getBoundingClientRect().top;
          nextShiftById[itemId] = itemTop - firstTop;
        });

        setFocusShiftById(nextShiftById);
      }

      measureFocusShift();
      const rafId = window.requestAnimationFrame(measureFocusShift);
      window.addEventListener("resize", measureFocusShift);

      return function () {
        window.cancelAnimationFrame(rafId);
        window.removeEventListener("resize", measureFocusShift);
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
    <article
      ref={articleRef}
      className="relative h-full overflow-y-auto pr-2 text-white"
    >
      <span
        className="pointer-events-none absolute top-0 left-[calc(50px+0.25rem)] z-0 w-[2px] bg-[color:var(--color-accent)]/70"
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
            focusPhase === "entering" || focusPhase === "exiting";
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
              isInFocusedMode={focusPhase === "focused"}
              focusShiftPx={focusShiftById[item.id] ?? 0}
              animationDelayMs={index * EXPERIENCE_REVEAL_STAGGER_MS}
              isToggleDisabled={isToggleLocked}
              onToggle={function () {
                if (isToggleLocked) {
                  return;
                }

                if (focusPhase === "idle") {
                  setFocusedItemId(item.id);
                  setFocusPhase("entering");
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
