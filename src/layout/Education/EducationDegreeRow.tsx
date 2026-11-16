import type { EducationTimelineItem } from "../../constants/education";
import { PipeSeparatedText } from "../../components/PipeSeparatedText";
import { TimelineRow } from "../../components/Timeline/TimelineRow";
import { useI18n } from "../../hooks/useI18n";
import { EducationDegreeIcon } from "../../components/icons/EducationDegreeIcon";

type EducationDegreeRowProps<TItem extends EducationTimelineItem> = {
  item: TItem;
};

export function EducationDegreeRow<TItem extends EducationTimelineItem>(
  props: EducationDegreeRowProps<TItem>,
) {
  const { item } = props;
  const i18n = useI18n();
  const { textKeys } = item;

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
