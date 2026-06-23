import type { TimelineDataItem } from "../../components/Timeline/TimelineItem";
import { PipeSeparator } from "../../components/PipeSeparator";
import { TimelineRow } from "../../components/Timeline/TimelineRow";
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
    <TimelineRow
      icon={<EducationStatusIcon className="h-5 w-5 shrink-0 text-white" />}
    >
      <span className="inline-flex min-w-0 max-w-full items-center gap-2 truncate max-[640px]:flex-col max-[640px]:items-start max-[640px]:overflow-visible max-[640px]:whitespace-normal">
        <span className="truncate max-[640px]:overflow-visible max-[640px]:whitespace-normal">{periodLabel.dateRange}</span>
        <PipeSeparator className="text-white/60 max-[640px]:hidden" />
        <span className="truncate max-[640px]:overflow-visible max-[640px]:whitespace-normal">{periodLabel.duration}</span>
      </span>
    </TimelineRow>
  );
}
