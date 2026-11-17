import { Timeline } from "../../components/Timeline/Timeline";
import { PROJECT_TIMELINE_ITEMS } from "../../constants/projects";
import { ESection, toSectionHash } from "../../utils/sections";
import { ProjectGallery } from "./ProjectGallery";
import { ProjectCategoryRow } from "./ProjectCategoryRow";
import { ProjectNameRow } from "./ProjectNameRow";
import { ProjectScreenshotsRow } from "./ProjectScreenshotsRow";
import type { SkillInteractionProps } from "../../types/skills";

export function Projects(props: SkillInteractionProps) {
  return (
    <Timeline
      items={PROJECT_TIMELINE_ITEMS}
      activeSectionHash={toSectionHash(ESection.Projects)}
      FirstRowComponent={ProjectNameRow}
      SecondRowComponent={ProjectCategoryRow}
      ThirdRowComponent={ProjectScreenshotsRow}
      DetailsComponent={ProjectGallery}
      {...props}
    />
  );
}
