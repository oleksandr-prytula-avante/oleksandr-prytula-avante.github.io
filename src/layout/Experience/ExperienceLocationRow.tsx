import { getExperienceTextKeys } from "../../utils/experience";
import type { TimelineDataItem } from "../../components/Timeline/TimelineItem";
import { useI18n } from "../../hooks/useI18n";
import { PipeSeparatedText } from "../../components/PipeSeparatedText";
import { TimelineRow } from "../../components/Timeline/TimelineRow";
import { ExperienceLocationIcon } from "../../components/icons/ExperienceLocationIcon";

type ExperienceLocationRowProps<TItem extends TimelineDataItem> = {
  item: TItem;
};

export function ExperienceLocationRow<TItem extends TimelineDataItem>(
  props: ExperienceLocationRowProps<TItem>,
) {
  const { item } = props;
  const i18n = useI18n();
  const textKeys = getExperienceTextKeys(item.id);
  const locationText = i18n.t(textKeys.location);

  return (
    <TimelineRow icon={<ExperienceLocationIcon />}>
      <PipeSeparatedText
        value={locationText}
        hideLastPartOnMobile
        stackOnMobile
        inlineContent
      />
    </TimelineRow>
  );
}
