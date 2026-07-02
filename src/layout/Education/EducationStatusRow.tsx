import type { TimelineDataItem } from "../../components/Timeline/TimelineItem";
import { PipeSeparator } from "../../components/PipeSeparator";
import { TimelineRow } from "../../components/Timeline/TimelineRow";
import {
  TIMELINE_ROW_INLINE_CONTENT_CLASS,
  MOBILE_STACK_ITEM_CLASS,
  MOBILE_STACK_CONTAINER_SUFFIX,
} from "../../constants/ui";
import { EducationStatusIcon } from "../../components/icons/EducationStatusIcon";
import { useI18n } from "../../hooks/useI18n";
import { ETranslationKey } from "../../i18n/types";
import { buildPeriodLabel } from "../../utils/time";

type EducationStatusRowProps<TItem extends TimelineDataItem> = {
  item: TItem;
};

export function EducationStatusRow<TItem extends TimelineDataItem>(
  props: EducationStatusRowProps<TItem>,
) {
  const { item } = props;
  const i18n = useI18n();
  const periodLabel = buildPeriodLabel(
    item.startDate,
    item.endDate,
    i18n.t(ETranslationKey.ExperiencePresent),
    String(i18n.locale),
  );

  return (
    <TimelineRow icon={<EducationStatusIcon />}>
      <span
        className={`${TIMELINE_ROW_INLINE_CONTENT_CLASS} ${MOBILE_STACK_CONTAINER_SUFFIX}`}
      >
        <span className={MOBILE_STACK_ITEM_CLASS}>{periodLabel.dateRange}</span>
        <PipeSeparator hideOnMobileStack hideBetween1024And1440 />
        <span
          className={`${MOBILE_STACK_ITEM_CLASS} timeline-hide-between-1024-1440`}
        >
          {periodLabel.duration}
        </span>
      </span>
    </TimelineRow>
  );
}
