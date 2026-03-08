import { getExperienceTextKeys } from "../../utils/experience";
import type { TimelineDataItem } from "../../components/Timeline/TimelineItem";
import { useI18n } from "../../hooks/useI18n";
import { PipeSeparatedText } from "../../components/PipeSeparatedText";
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
    <div className="flex items-center gap-2">
      <ExperienceCompanyIcon className="h-5 w-5 shrink-0 text-white" />
      <a
        href={item.companyUrl}
        target="_blank"
        rel="noreferrer"
        className="truncate text-[1.09375rem] uppercase transition-colors duration-200 ease-out hover:text-[color:var(--color-accent)]"
      >
        <PipeSeparatedText
          value={companyName}
          className="inline-flex items-center gap-2"
        />
      </a>
    </div>
  );
}
