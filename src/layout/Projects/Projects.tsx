import { Timeline } from "../../components/Timeline/Timeline";
import { TimelineRow } from "../../components/Timeline/TimelineRow";
import { ProjectAppIcon } from "../../components/icons/ProjectAppIcon";
import { ProjectCodeIcon } from "../../components/icons/ProjectCodeIcon";
import { ProjectScreenshotsIcon } from "../../components/icons/ProjectScreenshotsIcon";
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
    <TimelineRow variant="heading" icon={<ProjectAppIcon />}>
      <a
        href={item.companyUrl}
        target="_blank"
        rel="noreferrer"
        className="timeline-item__title"
      >
        {i18n.t(item.textKeys.name)}
      </a>
    </TimelineRow>
  );
}

function ProjectCategoryRow({ item }: ProjectRowProps) {
  const i18n = useI18n();

  return (
    <TimelineRow
      className="timeline-item__project-description"
      icon={<ProjectCodeIcon />}
    >
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
      variant="meta"
      className="max-[1024px]:hidden"
      icon={<ProjectScreenshotsIcon />}
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
      {...props}
    />
  );
}
