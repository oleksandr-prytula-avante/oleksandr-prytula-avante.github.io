import { getExperienceTextKeys } from "../../utils/experience";
import type { TimelineDataItem } from "../../components/Timeline/TimelineItem";
import { useI18n } from "../../hooks/useI18n";
import { ETranslationKey } from "../../i18n/types";
import { PipeSeparator } from "../../components/PipeSeparator";
import { TimelineRow } from "../../components/Timeline/TimelineRow";
import { PipeSeparatedText } from "../../components/PipeSeparatedText";
import { ExperienceJobTitleIcon } from "../../components/icons/ExperienceJobTitleIcon";
import { buildPeriodLabel } from "../../utils/time";

const TIMELINE_ROW_INLINE_CONTENT_CLASS =
  "inline-flex min-w-0 max-w-full items-center gap-x-2 gap-y-0 truncate";
const MOBILE_STACK_CONTAINER_SUFFIX =
  "max-[640px]:flex-col max-[640px]:items-start max-[640px]:overflow-visible max-[640px]:whitespace-normal";
const MOBILE_STACK_ITEM_CLASS =
  "max-[640px]:overflow-visible max-[640px]:whitespace-normal";

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
    <TimelineRow icon={<ExperienceJobTitleIcon />}>
      <span
        className={`${TIMELINE_ROW_INLINE_CONTENT_CLASS} ${MOBILE_STACK_CONTAINER_SUFFIX}`}
      >
        <PipeSeparatedText value={jobTitle} stackOnMobile />
        <PipeSeparator hideOnMobileStack hideBetween1024And1440 />
        <span
          className={`${MOBILE_STACK_ITEM_CLASS} timeline-hide-between-1024-1440`}
        >
          {periodLabel.dateRange}
        </span>
        <PipeSeparator hideOnMobile hideBetween1024And1440 />
        <span className="max-[768px]:hidden timeline-hide-between-1024-1440">
          {periodLabel.duration}
        </span>
      </span>
    </TimelineRow>
  );
}
