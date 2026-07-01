import { getExperienceTextKeys } from "../../utils/experience";
import type { TimelineDataItem } from "../../components/Timeline/TimelineItem";
import { useI18n } from "../../hooks/useI18n";
import { PipeSeparatedText } from "../../components/PipeSeparatedText";
import {
  TimelineRow,
  TIMELINE_ROW_ICON_CLASS,
} from "../../components/Timeline/TimelineRow";
import { ExperienceCompanyIcon } from "../../components/icons/ExperienceCompanyIcon";

type ExperienceCompanyRowProps<TItem extends TimelineDataItem> = {
  item: TItem;
};

export function ExperienceCompanyRow<TItem extends TimelineDataItem>(
  props: ExperienceCompanyRowProps<TItem>,
) {
  const { item } = props;
  const i18n = useI18n();
  const textKeys = getExperienceTextKeys(item.id);
  const companyName = i18n.t(textKeys.companyName);

  return (
    <TimelineRow
      icon={<ExperienceCompanyIcon className={TIMELINE_ROW_ICON_CLASS} />}
    >
      <a
        href={item.companyUrl}
        target="_blank"
        rel="noreferrer"
        className="block min-w-0 flex-1 truncate text-[1.09375rem] uppercase transition-colors duration-200 ease-out hover:text-[color:var(--color-accent)] max-[640px]:text-sm"
      >
        <PipeSeparatedText
          value={companyName}
          className="whitespace-nowrap"
          separatorClassName="mx-2 text-white/60"
          hideLastPartOnMobile
          stackOnMobile
        />
      </a>
    </TimelineRow>
  );
}
