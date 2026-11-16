import type { ExperienceTimelineItem } from "../../constants/experience";
import { useI18n } from "../../hooks/useI18n";
import { PipeSeparator } from "../../components/PipeSeparator";
import { TimelineRow } from "../../components/Timeline/TimelineRow";
import { PipeSeparatedText } from "../../components/PipeSeparatedText";
import { ExperienceJobTitleIcon } from "../../components/icons/ExperienceJobTitleIcon";
import { InlineContent } from "../../components/InlineContent";
import { TimelinePeriod } from "../../components/Timeline/TimelinePeriod";

type ExperienceJobRowProps<TItem extends ExperienceTimelineItem> = {
  item: TItem;
};

export function ExperienceJobRow<TItem extends ExperienceTimelineItem>(
  props: ExperienceJobRowProps<TItem>,
) {
  const { item } = props;
  const i18n = useI18n();
  const { textKeys } = item;
  const jobTitle = i18n.t(textKeys.jobTitle);

  return (
    <TimelineRow icon={<ExperienceJobTitleIcon />}>
      <InlineContent stackOnMobile>
        <PipeSeparatedText value={jobTitle} stackOnMobile />
        <PipeSeparator hideOnMobileStack hideBetween1024And1440 />
        <TimelinePeriod item={item} hideDateOnCompact hideDurationOnMobile />
      </InlineContent>
    </TimelineRow>
  );
}
