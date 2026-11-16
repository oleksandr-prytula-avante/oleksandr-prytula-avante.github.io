import type { ComponentType } from "react";

import type { SkillTagLabel } from "../constants/skillTags";
import type { ETranslationKey } from "../i18n/types";

export type TimelineTextKeys = {
  name: ETranslationKey;
  highlights: ETranslationKey[];
};

export type TimelineDataItem = {
  id: string;
  companyUrl: string;
  companyLogoSrc: string;
  technologyTags: SkillTagLabel[];
  textKeys: TimelineTextKeys;
};

export type DatedTimelineItem = TimelineDataItem & {
  startDate: string;
  endDate: string | null;
};

export type TimelineContentProps<TItem extends TimelineDataItem> = {
  FirstRowComponent: ComponentType<{ item: TItem }>;
  SecondRowComponent: ComponentType<{ item: TItem }>;
  ThirdRowComponent: ComponentType<{ item: TItem }>;
  DetailsComponent?: ComponentType<{ item: TItem }>;
  showToggle?: boolean;
  showMobileToggle?: boolean;
  onSkillEnter: (skill: string) => void;
  onSkillLeave: () => void;
};
