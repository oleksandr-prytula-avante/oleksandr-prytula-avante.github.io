import type { ProjectTimelineItem } from "../../constants/projects";
import { useI18n } from "../../hooks/useI18n";
import { ETranslationKey } from "../../i18n/types";
import { TimelineRow } from "../../components/Timeline/TimelineRow";
import { ProjectScreenshotsIcon } from "../../components/icons/ProjectScreenshotsIcon";

type ProjectScreenshotsRowProps = {
  item: ProjectTimelineItem;
};

export function ProjectScreenshotsRow({ item }: ProjectScreenshotsRowProps) {
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
