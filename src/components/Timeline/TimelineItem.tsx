import type { CSSProperties } from "react";

import { COMMON_SKILL_TAGS } from "../../constants/skillTags";
import { getEducationTextKeys } from "../../utils/education";
import { getExperienceTextKeys } from "../../utils/experience";
import { TextWithLinks } from "../TextWithLinks";
import { Tag } from "../Tags/Tag";
import { TimelineExpandIcon } from "../icons/TimelineExpandIcon";
import { useI18n } from "../../hooks/useI18n";
import { ETranslationKey } from "../../i18n/types";

const COMMON_SKILL_TAG_SET = new Set<string>(COMMON_SKILL_TAGS);
const ACTIVE_ITEM_Z_INDEX = 30;
const INACTIVE_ITEM_Z_INDEX = 0;
const SORT_EQUAL = 0;
const SORT_LEFT_FIRST = -1;
const SORT_RIGHT_FIRST = 1;

export type TimelineDataItem = {
  id: string;
  companyUrl: string;
  companyLogoSrc: string;
  startDate: string;
  endDate: string | null;
  technologyTags: string[];
};

type TimelineItemProps<TItem extends TimelineDataItem> = {
  item: TItem;
  FirstRowComponent: React.ComponentType<{ item: TItem }>;
  SecondRowComponent: React.ComponentType<{ item: TItem }>;
  ThirdRowComponent: React.ComponentType<{ item: TItem }>;
  showToggle?: boolean;
  onSkillEnter: (skill: string) => void;
  onSkillLeave: () => void;
  shouldHideRightContent: boolean;
  hasActiveItem: boolean;
  isActiveItem: boolean;
  isExpanded: boolean;
  isFocused: boolean;
  isDimmed: boolean;
  itemIndex: number;
  focusShiftPx: number;
  animationDelayMs: number;
  isToggleDisabled: boolean;
  onToggle: () => void;
};

export function TimelineItem<TItem extends TimelineDataItem>(
  props: TimelineItemProps<TItem>,
) {
  const {
    item,
    FirstRowComponent,
    SecondRowComponent,
    ThirdRowComponent,
    showToggle = true,
    onSkillEnter,
    onSkillLeave,
    shouldHideRightContent,
    hasActiveItem,
    isActiveItem,
    isExpanded,
    isFocused,
    isDimmed,
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
  const itemHeightClass = showToggle
    ? isFocused
      ? "h-full"
      : "h-[25%] max-[1024px]:h-auto"
    : "h-auto";
  const contentAlignmentClass = isFocused ? "justify-center" : "justify-start";
  const contentVisibilityClass = shouldHideRightContent
    ? "pointer-events-none invisible opacity-0 transition-none"
    : "pointer-events-auto visible opacity-100 transition-opacity duration-200 ease-out";
  const timelineItemClassName = [
    "timeline-item relative min-h-[100px] pl-32 max-[768px]:pl-30 max-[640px]:min-h-[80px] max-[640px]:pl-24",
    itemHeightClass,
    isFocused ? "timeline-item--focused" : "",
    isDimmed ? "timeline-item--hidden" : "",
    isExpanded ? "timeline-item--expanded" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const contentClassName = [
    "flex h-full min-h-0 flex-col text-sm text-white/95 max-[1024px]:h-auto",
    contentAlignmentClass,
    contentVisibilityClass,
  ]
    .filter(Boolean)
    .join(" ");

  const isEducationItem = item.id.startsWith("education-");
  let companyName: string;
  let highlightKeys: ETranslationKey[];

  if (isEducationItem) {
    const educationTextKeys = getEducationTextKeys(item.id);
    companyName = i18n.t(educationTextKeys.institution);
    highlightKeys = educationTextKeys.highlights ?? [];
  } else {
    const experienceTextKeys = getExperienceTextKeys(item.id);
    companyName = i18n.t(experienceTextKeys.companyName);
    highlightKeys = experienceTextKeys.highlights;
  }

  const descriptionId = `${item.id}-description`;
  const localizedHighlights = highlightKeys.map(function (highlightKey) {
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
        <ul className="flex flex-wrap gap-x-2 gap-y-3">
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
  let toggleButton = null;

  if (isExpanded && showToggle) {
    expandedContent = (
      <div
        id={descriptionId}
        className="mt-3 min-h-0 flex-1 overflow-y-auto pr-4 [scrollbar-gutter:stable] text-[0.9625rem] text-white/90 max-[1024px]:overflow-visible max-[1024px]:pr-0"
      >
        {localizedHighlightsList}
        {technologyTagsList}
      </div>
    );
  }

  if (showToggle) {
    toggleButton = (
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
        } max-[640px]:hidden`}
      >
        <span>
          {isExpanded
            ? i18n.t(ETranslationKey.TimelineHideDetails)
            : i18n.t(ETranslationKey.TimelineExpandDetails)}
        </span>
        <TimelineExpandIcon
          className={`h-5 w-5 transition-transform duration-200 ease-out ${isExpanded ? "rotate-180" : "rotate-0"}`}
        />
      </button>
    );
  }

  return (
    <li
      className={timelineItemClassName}
      data-timeline-item-id={item.id}
      style={
        {
          "--timeline-delay": `${animationDelayMs}ms`,
          "--timeline-shift": `${focusShiftPx}px`,
          "--timeline-expanded-order": itemIndex,
          zIndex: itemZIndex,
        } as CSSProperties
      }
    >
      <a
        href={item.companyUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`${companyName} website`}
        data-timeline-circle
        className="absolute left-0 top-0 z-10 flex h-[100px] w-[100px] max-[640px]:h-[80px] max-[640px]:w-[80px] cursor-pointer items-center justify-center rounded-full border-2 border-[color:var(--color-accent)] bg-white"
      >
        <img
          src={item.companyLogoSrc}
          alt={`${companyName} logo`}
          className="h-12 w-12 max-[640px]:h-10 max-[640px]:w-10 object-contain"
          loading="lazy"
        />
      </a>

      <div className={contentClassName}>
        <div className="shrink-0 space-y-2">
          <FirstRowComponent item={item} />

          <SecondRowComponent item={item} />

          <div className="flex min-w-0 flex-nowrap items-center gap-2 overflow-hidden">
            <ThirdRowComponent item={item} />
            {toggleButton}
          </div>
        </div>
        {expandedContent}
      </div>
    </li>
  );
}
