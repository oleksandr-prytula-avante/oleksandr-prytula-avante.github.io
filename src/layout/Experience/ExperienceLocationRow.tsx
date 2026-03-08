import { getExperienceTextKeys } from "../../utils/experience";
import type { TimelineDataItem } from "../../components/Timeline/TimelineItem";
import { useI18n } from "../../hooks/useI18n";
import { PipeSeparatedText } from "../../components/PipeSeparatedText";
import { PipeSeparator } from "../../components/PipeSeparator";
import { ExperienceLocationIcon } from "../../components/icons/ExperienceLocationIcon";

type ExperienceLocationRowProps<TItem extends TimelineDataItem> = {
  item: TItem;
};

export function ExperienceLocationRow<TItem extends TimelineDataItem>(
  props: ExperienceLocationRowProps<TItem>,
) {
  const { item } = props;
  const i18n = useI18n();
  const textKeys = getExperienceTextKeys(item.id);
  const locationText = i18n.t(textKeys.location);

  return (
    <>
      <ExperienceLocationIcon className="h-5 w-5 shrink-0 text-white" />
      <PipeSeparatedText
        value={locationText}
        className="inline-flex items-center gap-2"
      />
      <PipeSeparator />
    </>
  );
}
