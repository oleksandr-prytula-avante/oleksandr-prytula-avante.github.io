import type { EducationTimelineItem } from "../../constants/education";
import { TimelineRow } from "../../components/Timeline/TimelineRow";
import { useI18n } from "../../hooks/useI18n";
import { EducationCompanyIcon } from "../../components/icons/EducationCompanyIcon";

type EducationCompanyRowProps<TItem extends EducationTimelineItem> = {
  item: TItem;
};

export function EducationCompanyRow<TItem extends EducationTimelineItem>(
  props: EducationCompanyRowProps<TItem>,
) {
  const { item } = props;
  const i18n = useI18n();
  const { textKeys } = item;

  return (
    <TimelineRow variant="heading" icon={<EducationCompanyIcon />}>
      <a
        href={item.companyUrl}
        target="_blank"
        rel="noreferrer"
        className="timeline-item__title"
      >
        {i18n.t(textKeys.name)}
      </a>
    </TimelineRow>
  );
}
