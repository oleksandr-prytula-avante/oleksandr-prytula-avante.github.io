import { getExperienceTextKeys } from "../../utils/experience";
import type { TimelineDataItem } from "../../components/Timeline/TimelineItem";
import { useI18n } from "../../hooks/useI18n";
import { PipeSeparatedText } from "../../components/PipeSeparatedText";
import {
  TimelineRow,
  TIMELINE_ROW_ICON_CLASS,
  TIMELINE_ROW_INLINE_CONTENT_CLASS,
} from "../../components/Timeline/TimelineRow";
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
    <TimelineRow
      icon={<ExperienceLocationIcon className={TIMELINE_ROW_ICON_CLASS} />}
    >
      <PipeSeparatedText
        value={locationText}
        hideLastPartOnMobile
        stackOnMobile
        className={TIMELINE_ROW_INLINE_CONTENT_CLASS}
      />
    </TimelineRow>
  );
}
