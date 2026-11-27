import { Timeline } from "../../components/Timeline/Timeline";
import { SectionBanner } from "../../components/SectionBanner";
import { PROJECT_TIMELINE_ITEMS } from "../../constants/projects";
import { useI18n } from "../../hooks/useI18n";
import { ETranslationKey } from "../../i18n/types";
import { ESection, toSectionHash } from "../../utils/sections";
import { ProjectGallery } from "./ProjectGallery";
import { ProjectCategoryRow } from "./ProjectCategoryRow";
import { ProjectNameRow } from "./ProjectNameRow";
import { ProjectScreenshotsRow } from "./ProjectScreenshotsRow";
import type { SkillInteractionProps } from "../../components/types/skills";

export function Projects(props: SkillInteractionProps) {
  const i18n = useI18n();

  return (
    <div className="min-[1025px]:grid min-[1025px]:h-full min-[1025px]:grid-rows-[auto_minmax(0,1fr)] min-[1025px]:gap-4">
      <SectionBanner>
        <span>
          #
        </span>
        {i18n.t(ETranslationKey.ProjectsComingSoon)}
      </SectionBanner>
      <Timeline
        items={PROJECT_TIMELINE_ITEMS}
        activeSectionHash={toSectionHash(ESection.Projects)}
        FirstRowComponent={ProjectNameRow}
        SecondRowComponent={ProjectCategoryRow}
        ThirdRowComponent={ProjectScreenshotsRow}
        DetailsComponent={ProjectGallery}
        {...props}
      />
    </div>
  );
}
