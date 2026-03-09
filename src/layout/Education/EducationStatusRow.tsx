import type { TimelineDataItem } from "../../components/Timeline/TimelineItem";
import { PipeSeparatedText } from "../../components/PipeSeparatedText";
import { EducationStatusIcon } from "../../components/icons/EducationStatusIcon";
import { useI18n } from "../../hooks/useI18n";
import { ETranslationKey } from "../../i18n/types";
import { buildPeriodLabel } from "../../utils/time";

type EducationStatusRowProps<
  TItem extends TimelineDataItem & { grade?: number },
> = {
  item: TItem;
};

export function EducationStatusRow<
  TItem extends TimelineDataItem & { grade?: number },
>(props: EducationStatusRowProps<TItem>) {
  const { item } = props;
  const i18n = useI18n();
  const periodLabel = buildPeriodLabel(
    item.startDate,
    item.endDate,
    i18n.t(ETranslationKey.ExperiencePresent),
    String(i18n.locale),
  );

  const gradeText = item.grade !== undefined ? `Grade: ${item.grade}` : null;
  const statusText = gradeText
    ? `${periodLabel.dateRange} | ${periodLabel.duration} | ${gradeText}`
    : `${periodLabel.dateRange} | ${periodLabel.duration}`;

  return (
    <>
      <EducationStatusIcon className="h-5 w-5 shrink-0 text-white" />
      <PipeSeparatedText
        value={statusText}
        className="inline-flex min-w-0 max-w-full items-center gap-2 truncate"
      />
    </>
  );
}
