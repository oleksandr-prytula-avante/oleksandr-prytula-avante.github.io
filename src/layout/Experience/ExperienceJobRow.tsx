import { getExperienceTextKeys } from "../../utils/experience";
import type { TimelineDataItem } from "../../components/Timeline/TimelineItem";
import { useI18n } from "../../hooks/useI18n";
import { ETranslationKey } from "../../i18n/types";
import { PipeSeparator } from "../../components/PipeSeparator";
import { TimelineRow } from "../../components/Timeline/TimelineRow";
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
      icon={<ExperienceJobTitleIcon className="h-5 w-5 shrink-0 text-white" />}
    >
      <span className="inline-flex min-w-0 max-w-full items-center gap-2 truncate">
        <span className="truncate">{jobTitle}</span>
        <PipeSeparator className="text-white/60" />
        <span className="truncate">{periodLabel.dateRange}</span>
        <PipeSeparator className="text-white/60 max-[768px]:hidden" />
        <span className="truncate max-[768px]:hidden">{periodLabel.duration}</span>
      </span>
    </TimelineRow>
  );
}
