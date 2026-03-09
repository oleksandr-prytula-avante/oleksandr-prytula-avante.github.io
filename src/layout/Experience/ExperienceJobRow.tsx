import { getExperienceTextKeys } from "../../utils/experience";
import type { TimelineDataItem } from "../../components/Timeline/TimelineItem";
import { useI18n } from "../../hooks/useI18n";
import { ETranslationKey } from "../../i18n/types";
import { PipeSeparatedText } from "../../components/PipeSeparatedText";
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
  const detailsText = `${i18n.t(textKeys.jobTitle)} | ${periodLabel.dateRange} | ${periodLabel.duration}`;

  return (
    <div className="flex min-w-0 flex-nowrap items-center gap-2 overflow-hidden">
      <ExperienceJobTitleIcon className="h-5 w-5 shrink-0 text-white" />
      <PipeSeparatedText
        hideLastPartOnMobile
        value={detailsText}
        className="inline-flex min-w-0 max-w-full items-center gap-2 truncate"
      />
    </div>
  );
}
