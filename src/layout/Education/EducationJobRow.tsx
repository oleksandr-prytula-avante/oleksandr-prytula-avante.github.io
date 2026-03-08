import type { TimelineDataItem } from "../../components/Timeline/TimelineItem";
import { getEducationTextKeys } from "../../constants/educationTextKeys";
import { useI18n } from "../../hooks/useI18n";
import { ETranslationKey } from "../../i18n/types";
import { PipeSeparator } from "../../components/PipeSeparator";
import { ExperienceJobTitleIcon } from "../../components/icons/ExperienceJobTitleIcon";
import { buildPeriodLabel } from "../../utils/time";

type EducationJobRowProps<TItem extends TimelineDataItem> = {
  item: TItem;
};

export function EducationJobRow<TItem extends TimelineDataItem>(
  props: EducationJobRowProps<TItem>,
) {
  const { item } = props;
  const i18n = useI18n();
  const textKeys = getEducationTextKeys(item.id);
  const periodLabel = buildPeriodLabel(
    item.startDate,
    item.endDate,
    i18n.t(ETranslationKey.ExperiencePresent),
    String(i18n.locale),
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      <ExperienceJobTitleIcon className="h-5 w-5 shrink-0 text-white" />
      <span>{i18n.t(textKeys.secondRow)}</span>
      <PipeSeparator />
      <span>{periodLabel.dateRange}</span>
      <PipeSeparator />
      <span>{periodLabel.duration}</span>
    </div>
  );
}
