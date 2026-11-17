import { Timeline } from "../../components/Timeline/Timeline";
import { EDUCATION_TIMELINE_ITEMS } from "../../constants/education";
import { ESection, toSectionHash } from "../../utils/sections";

import { EducationCompanyRow } from "./EducationCompanyRow";
import { EducationDegreeRow } from "./EducationDegreeRow";
import { EducationStatusRow } from "./EducationStatusRow";
import type { SkillInteractionProps } from "../../components/types/skills";

export function Education(props: SkillInteractionProps) {
  return (
    <Timeline
      items={EDUCATION_TIMELINE_ITEMS}
      activeSectionHash={toSectionHash(ESection.Education)}
      FirstRowComponent={EducationCompanyRow}
      SecondRowComponent={EducationDegreeRow}
      ThirdRowComponent={EducationStatusRow}
      {...props}
    />
  );
}
