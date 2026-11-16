import { useI18n } from "../../hooks/useI18n";
import { ETranslationKey } from "../../i18n/types";
import type { DatedTimelineItem } from "../../types/timeline";
import { buildPeriodLabel } from "../../utils/time";
import { PipeSeparator } from "../PipeSeparator";

type TimelinePeriodProps = {
  item: DatedTimelineItem;
  hideDateOnCompact?: boolean;
  hideDurationOnMobile?: boolean;
};

export function TimelinePeriod({
  item,
  hideDateOnCompact = false,
  hideDurationOnMobile = false,
}: TimelinePeriodProps) {
  const i18n = useI18n();
  const period = buildPeriodLabel(
    item.startDate,
    item.endDate,
    i18n.t(ETranslationKey.ExperiencePresent),
    i18n.locale,
  );

  return (
    <>
      <span
        className={`timeline-period ${hideDateOnCompact ? "timeline-hide-between-1024-1440" : ""}`}
      >
        {period.dateRange}
      </span>
      <PipeSeparator
        hideOnMobile={hideDurationOnMobile}
        hideOnMobileStack
        hideBetween1024And1440
      />
      <span
        className={`timeline-period timeline-hide-between-1024-1440 ${hideDurationOnMobile ? "max-[768px]:hidden" : ""}`}
      >
        {period.duration}
      </span>
    </>
  );
}
