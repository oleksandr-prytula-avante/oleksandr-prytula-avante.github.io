import { EXPERIENCE_TIMELINE_ITEMS } from "../../constants/experience";
import { Timeline } from "../../components/Timeline/Timeline";
import { ESection, toSectionHash } from "../../utils/sections";
import { ExperienceCompanyRow } from "./ExperienceCompanyRow";
import { ExperienceJobRow } from "./ExperienceJobRow";
import { ExperienceLocationRow } from "./ExperienceLocationRow";
import type { SkillInteractionProps } from "../../components/types/skills";

export function Experience(props: SkillInteractionProps) {
  return (
    <Timeline
      items={EXPERIENCE_TIMELINE_ITEMS}
      activeSectionHash={toSectionHash(ESection.Experience)}
      FirstRowComponent={ExperienceCompanyRow}
      SecondRowComponent={ExperienceJobRow}
      ThirdRowComponent={ExperienceLocationRow}
      {...props}
    />
  );
}
