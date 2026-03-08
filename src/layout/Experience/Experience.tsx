import { EXPERIENCE_TIMELINE_ITEMS } from "../../constants/experience";
import { Timeline } from "../../components/Timeline/Timeline";
import { ESection, toSectionHash } from "../../utils/sections";
import { ExperienceCompanyRow } from "./ExperienceCompanyRow";
import { ExperienceJobRow } from "./ExperienceJobRow";
import { ExperienceLocationRow } from "./ExperienceLocationRow";

type ExperienceProps = {
  onSkillEnter: (skill: string) => void;
  onSkillLeave: () => void;
};

export function Experience(props: ExperienceProps) {
  const { onSkillEnter, onSkillLeave } = props;

  return (
    <Timeline
      items={EXPERIENCE_TIMELINE_ITEMS}
      activeSectionHash={toSectionHash(ESection.Experience)}
      FirstRowComponent={ExperienceCompanyRow}
      SecondRowComponent={ExperienceJobRow}
      ThirdRowComponent={ExperienceLocationRow}
      onSkillEnter={onSkillEnter}
      onSkillLeave={onSkillLeave}
    />
  );
}
