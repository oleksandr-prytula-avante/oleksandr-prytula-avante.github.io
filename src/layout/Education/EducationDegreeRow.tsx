import type { TimelineDataItem } from "../../components/Timeline/TimelineItem";
import { getEducationTextKeys } from "../../utils/education";
import { useI18n } from "../../hooks/useI18n";
import { EducationDegreeIcon } from "../../components/icons/EducationDegreeIcon";

type EducationDegreeRowProps<TItem extends TimelineDataItem> = {
  item: TItem;
};

export function EducationDegreeRow<TItem extends TimelineDataItem>(
  props: EducationDegreeRowProps<TItem>,
) {
  const { item } = props;
  const i18n = useI18n();
  const textKeys = getEducationTextKeys(item.id);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <EducationDegreeIcon className="h-5 w-5 shrink-0 text-white" />
      <span>{i18n.t(textKeys.program)}</span>
    </div>
  );
}
