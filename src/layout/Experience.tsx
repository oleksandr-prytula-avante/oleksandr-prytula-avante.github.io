import { EXPERIENCE_TIMELINE_ITEMS } from "../constants/experienceTimeline";
import { Timeline } from "../components/Timeline/Timeline";
import { ESectionId, toSectionHash } from "../utils/sections";
import { ExperienceCompanyRow } from "./Experience/ExperienceCompanyRow";
import { ExperienceJobRow } from "./Experience/ExperienceJobRow";
import { ExperienceLocationRow } from "./Experience/ExperienceLocationRow";

type ExperienceProps = {
  onSkillEnter: (skill: string) => void;
  onSkillLeave: () => void;
};

export function Experience(props: ExperienceProps) {
  const { onSkillEnter, onSkillLeave } = props;

  return (
    <Timeline
      items={EXPERIENCE_TIMELINE_ITEMS}
      activeSectionHash={toSectionHash(ESectionId.Experience)}
      renderFirstRow={function (item) {
        return <ExperienceCompanyRow item={item} />;
      }}
      renderSecondRow={function (item) {
        return <ExperienceJobRow item={item} />;
      }}
      renderThirdRow={function (item) {
        return <ExperienceLocationRow item={item} />;
      }}
      onSkillEnter={onSkillEnter}
      onSkillLeave={onSkillLeave}
    />
  );
}
