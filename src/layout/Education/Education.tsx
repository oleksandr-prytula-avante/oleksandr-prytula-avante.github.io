import { Timeline } from "../../components/Timeline/Timeline";
import { EDUCATION_TIMELINE_ITEMS } from "../../constants/education";
import { ESection, toSectionHash } from "../../utils/sections";

import { EducationCompanyRow } from "./EducationCompanyRow";
import { EducationDegreeRow } from "./EducationDegreeRow";
import { EducationStatusRow } from "./EducationStatusRow";

type EducationProps = {
  onSkillEnter: (skill: string) => void;
  onSkillLeave: () => void;
};

export function Education(props: EducationProps) {
  const { onSkillEnter, onSkillLeave } = props;

  return (
    <Timeline
      items={EDUCATION_TIMELINE_ITEMS}
      activeSectionHash={toSectionHash(ESection.Education)}
      FirstRowComponent={EducationCompanyRow}
      SecondRowComponent={EducationDegreeRow}
      ThirdRowComponent={EducationStatusRow}
      onSkillEnter={onSkillEnter}
      onSkillLeave={onSkillLeave}
    />
  );
}
