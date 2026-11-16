import type { EducationTimelineItem } from "../../constants/education";
import { InlineContent } from "../../components/InlineContent";
import { TimelineRow } from "../../components/Timeline/TimelineRow";
import { TimelinePeriod } from "../../components/Timeline/TimelinePeriod";
import { EducationStatusIcon } from "../../components/icons/EducationStatusIcon";

type EducationStatusRowProps = {
  item: EducationTimelineItem;
};

export function EducationStatusRow({ item }: EducationStatusRowProps) {
  return (
    <TimelineRow variant="meta" icon={<EducationStatusIcon />}>
      <InlineContent stackOnMobile>
        <TimelinePeriod item={item} />
      </InlineContent>
    </TimelineRow>
  );
}
