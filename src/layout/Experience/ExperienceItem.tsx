import type { CSSProperties } from "react";

import {
  EExperience,
  type ExperienceTimelineItem,
} from "../../constants/experienceTimeline";
import { COMMON_SKILL_TAGS } from "../../constants/skillTags";
import { getExperienceTextKeys } from "../../constants/experienceTextKeys";
import { PipeSeparatedText } from "../../components/PipeSeparatedText";
import { PipeSeparator } from "../../components/PipeSeparator";
import { TextWithLinks } from "../../components/TextWithLinks";
import { Tag } from "../../components/Tags/Tag";
import { ExperienceCompanyIcon } from "../../components/icons/ExperienceCompanyIcon";
import { ExperienceExpandIcon } from "../../components/icons/ExperienceExpandIcon";
import { ExperienceJobTitleIcon } from "../../components/icons/ExperienceJobTitleIcon";
import { ExperienceLocationIcon } from "../../components/icons/ExperienceLocationIcon";
import { useI18n } from "../../hooks/useI18n";
import { ETranslationKey } from "../../i18n/types";
import { buildPeriodLabel } from "../../utils/time";

const COMMON_SKILL_TAG_SET = new Set(COMMON_SKILL_TAGS);
const ACTIVE_ITEM_Z_INDEX = 30;
const INACTIVE_ITEM_Z_INDEX = 0;
const SORT_EQUAL = 0;
const SORT_LEFT_FIRST = -1;
const SORT_RIGHT_FIRST = 1;

type ExperienceItemProps = {
  item: ExperienceTimelineItem;
  onSkillEnter: (skill: string) => void;
  onSkillLeave: () => void;
  shouldHideRightContent: boolean;
  hasActiveItem: boolean;
  isActiveItem: boolean;
  isExpanded: boolean;
  isFocused: boolean;
  isDimmed: boolean;
  isInFocusedMode: boolean;
  itemIndex: number;
  focusShiftPx: number;
  animationDelayMs: number;
  isToggleDisabled: boolean;
  onToggle: () => void;
};

export function ExperienceItem(props: ExperienceItemProps) {
  const {
    item,
    onSkillEnter,
    onSkillLeave,
    shouldHideRightContent,
    hasActiveItem,
    isActiveItem,
    isExpanded,
    isFocused,
    isDimmed,
    isInFocusedMode,
    itemIndex,
    focusShiftPx,
    animationDelayMs,
    isToggleDisabled,
    onToggle,
  } = props;
  const i18n = useI18n();
  const itemZIndex = hasActiveItem
    ? isActiveItem
      ? ACTIVE_ITEM_Z_INDEX
      : INACTIVE_ITEM_Z_INDEX
    : undefined;
  const textKeys = getExperienceTextKeys(item.id);
  const companyName = i18n.t(textKeys.companyName);
  const descriptionId = `${item.id}-description`;
  const periodLabel = buildPeriodLabel(
    item.startDate,
    item.endDate,
    i18n.t(ETranslationKey.ExperiencePresent),
    String(i18n.locale),
  );
  const locationText = i18n.t(textKeys.location);
  const localizedHighlights = textKeys.highlights.map(function (highlightKey) {
    return i18n.t(highlightKey);
  });
  const prioritizedTechnologyTags = item.technologyTags
    .slice()
    .sort(function (left, right) {
      const leftIsCommon = COMMON_SKILL_TAG_SET.has(left);
      const rightIsCommon = COMMON_SKILL_TAG_SET.has(right);

      if (leftIsCommon === rightIsCommon) {
        return SORT_EQUAL;
      }

      return leftIsCommon ? SORT_LEFT_FIRST : SORT_RIGHT_FIRST;
    });
  let localizedHighlightsList = null;

  if (localizedHighlights.length > 0) {
    localizedHighlightsList = (
      <ul className="mt-3 space-y-2 leading-relaxed">
        {localizedHighlights.map(function (highlight, highlightIndex) {
          return (
            <li
              key={`${item.id}-highlight-${highlightIndex}`}
              className="relative pl-4"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-[0.8125em] h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[color:var(--color-accent)]"
              />
              <span>
                <TextWithLinks value={highlight} />
              </span>
            </li>
          );
        })}
      </ul>
    );
  }

  let technologyTagsList = null;

  if (item.technologyTags.length > 0) {
    technologyTagsList = (
      <>
        <p className="mt-4 mb-4 text-[1rem] uppercase text-[color:var(--color-accent)] max-[1366px]:text-sm">
          {i18n.t(ETranslationKey.ExperienceToolsAndTechnologies)} :
        </p>
        <ul className="flex flex-wrap gap-2">
          {prioritizedTechnologyTags.map(function (tag) {
            return (
              <li key={`${item.id}-${tag}`}>
                <Tag
                  label={tag}
                  variant="experience"
                  onSelectSkill={onSkillEnter}
                  onClearSkill={onSkillLeave}
                />
              </li>
            );
          })}
        </ul>
      </>
    );
  }

  let expandedContent = null;

  if (isExpanded) {
    expandedContent = (
      <div
        id={descriptionId}
        className="mt-3 min-h-0 flex-1 overflow-y-auto pr-4 [scrollbar-gutter:stable] text-[0.9625rem] text-white/90"
      >
        {localizedHighlightsList}
        {technologyTagsList}
      </div>
    );
  }

  return (
    <li
      className={`experience-item relative pl-32 ${isInFocusedMode ? "h-full" : "h-[25%]"} ${isFocused ? "experience-item--focused" : ""} ${isDimmed ? "experience-item--hidden" : ""} ${isExpanded ? "experience-item--expanded" : ""}`}
      data-experience-item-id={item.id}
      style={
        {
          "--experience-delay": `${animationDelayMs}ms`,
          "--focus-shift": `${focusShiftPx}px`,
          "--expanded-order": itemIndex,
          zIndex: itemZIndex,
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

      <div
        className={`flex h-full min-h-0 flex-col pb-8 text-sm text-white/95 ${
          shouldHideRightContent
            ? "pointer-events-none invisible opacity-0 transition-none"
            : "pointer-events-auto visible opacity-100 transition-opacity duration-200 ease-out"
        }`}
      >
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
