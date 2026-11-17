import type { ProjectTimelineItem } from "../../constants/projects";
import { useI18n } from "../../hooks/useI18n";
import { TimelineRow } from "../../components/Timeline/TimelineRow";
import { ProjectAppIcon } from "../../components/icons/ProjectAppIcon";

type ProjectNameRowProps = {
  item: ProjectTimelineItem;
};

export function ProjectNameRow({ item }: ProjectNameRowProps) {
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
