import { Timeline } from "../../components/Timeline/Timeline";
import { EDUCATION_TIMELINE_ITEMS } from "../../constants/educationTimeline";
import { ESectionId, toSectionHash } from "../../utils/sections";

import { EducationCompanyRow } from "./EducationCompanyRow";
import { EducationJobRow } from "./EducationJobRow";
import { EducationThirdRow } from "./EducationThirdRow";

export function Education() {
  return (
    <Timeline
      items={EDUCATION_TIMELINE_ITEMS}
      activeSectionHash={toSectionHash(ESectionId.Education)}
      renderFirstRow={function (item) {
        return <EducationCompanyRow item={item} />;
      }}
      renderSecondRow={function (item) {
        return <EducationJobRow item={item} />;
      }}
      renderThirdRow={function (item) {
        return <EducationThirdRow item={item} />;
      }}
      onSkillEnter={function () {
        // Education timeline rows do not use hoverable skill tags.
      }}
      onSkillLeave={function () {
        // Education timeline rows do not use hoverable skill tags.
      }}
    />
  );
}
