import { getExperienceTextKeys } from "../../utils/experience";
import type { TimelineDataItem } from "../../components/Timeline/TimelineItem";
import { useI18n } from "../../hooks/useI18n";
import { ETranslationKey } from "../../i18n/types";
import { PipeSeparator } from "../../components/PipeSeparator";
import {
  TimelineRow,
  TIMELINE_ROW_ICON_CLASS,
  TIMELINE_ROW_INLINE_CONTENT_CLASS,
} from "../../components/Timeline/TimelineRow";
import {
  MOBILE_STACK_ITEM_CLASS,
  MOBILE_STACK_SEPARATOR_CLASS,
  MOBILE_STACK_CONTAINER_SUFFIX,
} from "../../components/PipeSeparatedText";
import { ExperienceJobTitleIcon } from "../../components/icons/ExperienceJobTitleIcon";
import { buildPeriodLabel } from "../../utils/time";

type ExperienceJobRowProps<TItem extends TimelineDataItem> = {
  item: TItem;
};

export function ExperienceJobRow<TItem extends TimelineDataItem>(
  props: ExperienceJobRowProps<TItem>,
) {
  const { item } = props;
  const i18n = useI18n();
  const textKeys = getExperienceTextKeys(item.id);
  const periodLabel = buildPeriodLabel(
    item.startDate,
    item.endDate,
    i18n.t(ETranslationKey.ExperiencePresent),
    String(i18n.locale),
  );
  const jobTitle = i18n.t(textKeys.jobTitle);

  return (
    <TimelineRow
      icon={<ExperienceJobTitleIcon className={TIMELINE_ROW_ICON_CLASS} />}
    >
      <span className={`${TIMELINE_ROW_INLINE_CONTENT_CLASS} ${MOBILE_STACK_CONTAINER_SUFFIX}`}>
        <span className={MOBILE_STACK_ITEM_CLASS}>{jobTitle}</span>
        <PipeSeparator className={`text-white/60 ${MOBILE_STACK_SEPARATOR_CLASS}`} />
        <span className={MOBILE_STACK_ITEM_CLASS}>{periodLabel.dateRange}</span>
        <PipeSeparator className="text-white/60 max-[768px]:hidden" />
        <span className="truncate max-[768px]:hidden">
          {periodLabel.duration}
        </span>
      </span>
    </TimelineRow>
  );
}
