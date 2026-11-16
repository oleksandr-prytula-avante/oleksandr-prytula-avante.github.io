import type { ExperienceTimelineItem } from "../../constants/experience";
import { useI18n } from "../../hooks/useI18n";
import { TimelineRow } from "../../components/Timeline/TimelineRow";
import { ExperienceCompanyIcon } from "../../components/icons/ExperienceCompanyIcon";

type ExperienceCompanyRowProps<TItem extends ExperienceTimelineItem> = {
  item: TItem;
};

export function ExperienceCompanyRow<TItem extends ExperienceTimelineItem>({
  item,
}: ExperienceCompanyRowProps<TItem>) {
  const i18n = useI18n();
  const [company, engagement] = i18n
    .t(item.textKeys.name)
    .split("|")
    .map((part) => part.trim());
  return (
    <TimelineRow variant="heading" icon={<ExperienceCompanyIcon />}>
      <a
        href={item.companyUrl}
        target="_blank"
        rel="noreferrer"
        className="timeline-item__title"
      >
        <span>{company}</span>
        {engagement && (
          <span className="timeline-item__engagement">{engagement}</span>
        )}
      </a>
    </TimelineRow>
  );
}
