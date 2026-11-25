import { Timeline } from "../../components/Timeline/Timeline";
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
      <p className="hidden min-w-0 items-center gap-3 bg-linear-to-r from-white/5 to-transparent py-2 pl-3 text-sm tracking-wide text-white/75 min-[1025px]:flex">
        <span
          aria-hidden="true"
          className="shrink-0 font-bold text-[color:var(--color-accent)]"
        >
          #
        </span>
        <span>{i18n.t(ETranslationKey.ProjectsComingSoon)}</span>
        <span
          aria-hidden="true"
          className="h-px min-w-6 flex-1 bg-(image:--line-track-horizontal)"
        />
      </p>
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
