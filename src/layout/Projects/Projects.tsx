import { Timeline } from "../../components/Timeline/Timeline";
import { TimelineRow } from "../../components/Timeline/TimelineRow";
import { ExperienceCompanyIcon } from "../../components/icons/ExperienceCompanyIcon";
import { ExperienceJobTitleIcon } from "../../components/icons/ExperienceJobTitleIcon";
import {
  PROJECT_TIMELINE_ITEMS,
  type ProjectTimelineItem,
} from "../../constants/projects";
import { useI18n } from "../../hooks/useI18n";
import { ETranslationKey } from "../../i18n/types";
import { ESection, toSectionHash } from "../../utils/sections";
import { ProjectGallery } from "./ProjectGallery";

type ProjectsProps = {
  onSkillEnter: (skill: string) => void;
  onSkillLeave: () => void;
};

type ProjectRowProps = {
  item: ProjectTimelineItem;
};

function ProjectNameRow({ item }: ProjectRowProps) {
  const i18n = useI18n();

  return (
    <TimelineRow icon={<ExperienceCompanyIcon />}>
      <a
        href={item.companyUrl}
        target="_blank"
        rel="noreferrer"
        className="block min-w-0 flex-1 text-[1.09375rem] uppercase transition-colors duration-200 ease-out hover:text-[color:var(--color-accent)] max-[640px]:text-sm"
      >
        {i18n.t(item.textKeys.name)}
      </a>
    </TimelineRow>
  );
}

function ProjectCategoryRow({ item }: ProjectRowProps) {
  const i18n = useI18n();

  return (
    <TimelineRow icon={<ExperienceJobTitleIcon />}>
      <span className="min-w-0 min-[1025px]:max-h-[min(30vh,240px)] min-[1025px]:overflow-y-auto">
        {i18n.t(item.categoryKey)}
      </span>
    </TimelineRow>
  );
}

function ProjectScreenshotsRow({ item }: ProjectRowProps) {
  const i18n = useI18n();

  return (
    <TimelineRow
      icon={
        <svg
          aria-hidden="true"
          className="h-5 w-5 shrink-0 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
      }
    >
      <span className="min-w-0 truncate">
        {`${i18n.t(ETranslationKey.ProjectsScreenshots)} (${item.screenshots.length})`}
      </span>
    </TimelineRow>
  );
}

export function Projects(props: ProjectsProps) {
  return (
    <Timeline
      items={PROJECT_TIMELINE_ITEMS}
      activeSectionHash={toSectionHash(ESection.Projects)}
      FirstRowComponent={ProjectNameRow}
      SecondRowComponent={ProjectCategoryRow}
      ThirdRowComponent={ProjectScreenshotsRow}
      DetailsComponent={ProjectGallery}
      showMobileToggle
      {...props}
    />
  );
}
