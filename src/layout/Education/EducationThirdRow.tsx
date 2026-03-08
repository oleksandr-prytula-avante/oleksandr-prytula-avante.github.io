import type { TimelineDataItem } from "../../components/Timeline/TimelineItem";
import { ExperienceLocationIcon } from "../../components/icons/ExperienceLocationIcon";

type EducationThirdRowProps<TItem extends TimelineDataItem & { gradeLabel?: string }> = {
  item: TItem;
};

export function EducationThirdRow<
  TItem extends TimelineDataItem & { gradeLabel?: string },
>(
  props: EducationThirdRowProps<TItem>,
) {
  const { item } = props;

  if (!item.gradeLabel) {
    return null;
  }

  return (
    <>
      <ExperienceLocationIcon className="h-5 w-5 shrink-0 text-white" />
      <span>{item.gradeLabel}</span>
    </>
  );
}
