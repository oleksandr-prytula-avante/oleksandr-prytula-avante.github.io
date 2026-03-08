import type { TimelineDataItem } from "../../components/Timeline/TimelineItem";
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
    <div className="flex items-center gap-2">
      <EducationCompanyIcon className="h-5 w-5 shrink-0 text-white" />
      <a
        href={item.companyUrl}
        target="_blank"
        rel="noreferrer"
        className="truncate text-[1.09375rem] uppercase transition-colors duration-200 ease-out hover:text-[color:var(--color-accent)]"
      >
        {i18n.t(textKeys.institution)}
      </a>
    </div>
  );
}
