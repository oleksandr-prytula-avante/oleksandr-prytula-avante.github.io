import type { TimelineDataItem } from "../../components/Timeline/TimelineItem";
import { PipeSeparatedText } from "../../components/PipeSeparatedText";
import { TimelineRow } from "../../components/Timeline/TimelineRow";
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
    <TimelineRow icon={<EducationDegreeIcon />}>
      <PipeSeparatedText
        value={i18n.t(textKeys.program)}
        stackOnMobile
        inlineContent
      />
    </TimelineRow>
  );
}
