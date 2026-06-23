import type { TimelineDataItem } from "../../components/Timeline/TimelineItem";
import {
  TimelineRow,
  TIMELINE_ROW_ICON_CLASS,
} from "../../components/Timeline/TimelineRow";
import { getEducationTextKeys } from "../../utils/education";
import { useI18n } from "../../hooks/useI18n";
import { EducationCompanyIcon } from "../../components/icons/EducationCompanyIcon";

type EducationCompanyRowProps<TItem extends TimelineDataItem> = {
  item: TItem;
};

export function EducationCompanyRow<TItem extends TimelineDataItem>(
  props: EducationCompanyRowProps<TItem>,
) {
  const { item } = props;
  const i18n = useI18n();
  const textKeys = getEducationTextKeys(item.id);

  return (
    <TimelineRow
      icon={<EducationCompanyIcon className={TIMELINE_ROW_ICON_CLASS} />}
    >
      <a
        href={item.companyUrl}
        target="_blank"
        rel="noreferrer"
        className="truncate text-[1.09375rem] uppercase transition-colors duration-200 ease-out hover:text-[color:var(--color-accent)] max-[640px]:text-sm max-[640px]:overflow-visible max-[640px]:whitespace-normal"
      >
        {i18n.t(textKeys.institution)}
      </a>
    </TimelineRow>
  );
}
