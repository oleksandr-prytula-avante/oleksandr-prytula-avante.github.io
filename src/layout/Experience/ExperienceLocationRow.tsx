import type { ExperienceTimelineItem } from "../../constants/experience";
import { useI18n } from "../../hooks/useI18n";
import { PipeSeparatedText } from "../../components/PipeSeparatedText";
import { TimelineRow } from "../../components/Timeline/TimelineRow";
import { ExperienceLocationIcon } from "../../components/icons/ExperienceLocationIcon";

type ExperienceLocationRowProps<TItem extends ExperienceTimelineItem> = {
  item: TItem;
};

export function ExperienceLocationRow<TItem extends ExperienceTimelineItem>(
  props: ExperienceLocationRowProps<TItem>,
) {
  const { item } = props;
  const i18n = useI18n();
  const { textKeys } = item;
  const locationText = i18n.t(textKeys.location);

  return (
    <TimelineRow variant="meta" icon={<ExperienceLocationIcon />}>
      <PipeSeparatedText
        value={locationText}
        hideLastPartOnMobile
        stackOnMobile
        inlineContent
      />
    </TimelineRow>
  );
}
