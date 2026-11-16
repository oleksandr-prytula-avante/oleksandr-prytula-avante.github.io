import type { ExperienceTimelineItem } from "../../constants/experience";
import { useI18n } from "../../hooks/useI18n";
import { TimelineRow } from "../../components/Timeline/TimelineRow";
import { ExperienceJobTitleIcon } from "../../components/icons/ExperienceJobTitleIcon";
import { TimelinePeriod } from "../../components/Timeline/TimelinePeriod";

type ExperienceJobRowProps<TItem extends ExperienceTimelineItem> = {
  item: TItem;
};

export function ExperienceJobRow<TItem extends ExperienceTimelineItem>({
  item,
}: ExperienceJobRowProps<TItem>) {
  const i18n = useI18n();
  return (
    <TimelineRow icon={<ExperienceJobTitleIcon />}>
      <div className="timeline-item__role-group">
        <p>{i18n.t(item.textKeys.jobTitle)}</p>
        <div className="timeline-item__period-row">
          <TimelinePeriod item={item} hideDurationOnMobile />
        </div>
      </div>
    </TimelineRow>
  );
}
