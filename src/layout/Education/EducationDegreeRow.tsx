import type { TimelineDataItem } from "../../components/Timeline/TimelineItem";
import { PipeSeparatedText } from "../../components/PipeSeparatedText";
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
    <div className="flex min-w-0 flex-nowrap items-center gap-2 overflow-hidden">
      <EducationDegreeIcon className="h-5 w-5 shrink-0 text-white" />
      <PipeSeparatedText
        value={i18n.t(textKeys.program)}
        className="inline-flex min-w-0 max-w-full items-center gap-2 truncate"
      />
    </div>
  );
}
