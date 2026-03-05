import type { CSSProperties } from "react";

import {
  EExperience,
  type ExperienceTimelineItem,
} from "../../constants/experienceTimeline";
import { getExperienceTextKeys } from "../../constants/experienceTextKeys";
import { PipeSeparatedText } from "../../components/PipeSeparatedText";
import { PipeSeparator } from "../../components/PipeSeparator";
import { Tag } from "../../components/Tags/Tag";
import { ExperienceCompanyIcon } from "../../components/icons/ExperienceCompanyIcon";
import { ExperienceExpandIcon } from "../../components/icons/ExperienceExpandIcon";
import { ExperienceJobTitleIcon } from "../../components/icons/ExperienceJobTitleIcon";
import { ExperienceLocationIcon } from "../../components/icons/ExperienceLocationIcon";
import { useI18n } from "../../hooks/useI18n";
import { ELocale, ETranslationKey } from "../../i18n/types";
import { buildPeriodLabel } from "../../utils/time";

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

function handleTagSelect(skill: string): void {
  void skill;
}

function handleTagClear(): void {}

export function ExperienceItem(props: ExperienceItemProps) {
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
  let localizedHighlightsList = null;

  if (localizedHighlights.length > 0) {
    localizedHighlightsList = (
      <ul className="mt-3 space-y-2 leading-relaxed">
        {localizedHighlights.map(function (highlight, highlightIndex) {
          return (
            <li key={`${item.id}-highlight-${highlightIndex}`}>
              {`- ${highlight}`}
            </li>
          );
        })}
      </ul>
    );
  }

  let technologyTagsList = null;

  if (item.technologyTags.length > 0) {
    technologyTagsList = (
      <ul className="flex flex-wrap gap-2">
        {item.technologyTags.map(function (tag) {
          return (
            <li key={`${item.id}-${tag}`}>
              <Tag
                label={tag}
                className="inline-flex rounded-full border border-white/40 px-3 py-1 text-xs uppercase tracking-[0.06em] text-white/90 transition-colors duration-200 ease-out hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
                onSelectSkill={handleTagSelect}
                onClearSkill={handleTagClear}
              />
            </li>
          );
        })}
      </ul>
    );
  }

  let expandedContent = null;

  if (isExpanded) {
    expandedContent = (
      <div
        id={descriptionId}
        className="mt-3 min-h-0 flex-1 overflow-y-auto pr-2 text-sm text-white/90"
      >
        {technologyTagsList}
        {localizedHighlightsList}
      </div>
    );
  }

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
          className={`${item.id === EExperience.Digitalsuits ? "w-1/3" : "h-12 w-12"} object-contain`}
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
            <PipeSeparator />
            <span>{periodLabel.dateRange}</span>
            <PipeSeparator />
            <span>{periodLabel.duration}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <ExperienceLocationIcon className="h-5 w-5 shrink-0 text-white" />
            <PipeSeparatedText
              value={locationText}
              className="inline-flex items-center gap-2"
            />
            <PipeSeparator />

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

        {expandedContent}
      </div>
    </li>
  );
}
