import type { ProjectTimelineItem } from "../../constants/projects";
import { useI18n } from "../../hooks/useI18n";
import { TimelineRow } from "../../components/Timeline/TimelineRow";
import { ProjectCodeIcon } from "../../components/icons/ProjectCodeIcon";

type ProjectCategoryRowProps = {
  item: ProjectTimelineItem;
};

export function ProjectCategoryRow({ item }: ProjectCategoryRowProps) {
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
