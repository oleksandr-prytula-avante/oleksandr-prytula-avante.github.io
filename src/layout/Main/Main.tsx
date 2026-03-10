import { useState } from "react";
import type { ReactNode } from "react";

import { Header } from "../../components/Header";
import { LinesBackground } from "../../components/LinesBackground/LinesBackground";
import { Links } from "../../components/Links";
import { SectionCarousel } from "../../components/SectionCarousel";
import { SectionDots } from "../../components/SectionDots";
import { SectionHeading } from "../../components/SectionHeading";
import { MIN_ANIMATED_VIEWPORT_MEDIA_QUERY } from "../../constants/mediaQueries";
import { SECTION_NAV_ITEMS } from "../../constants/sections";
import { useI18n } from "../../hooks/useI18n";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { ETranslationKey } from "../../i18n/types";
import { ESection, toSectionHash } from "../../utils/sections";
import { About } from "../About";
import { Education } from "../Education/Education";
import { Experience } from "../Experience/Experience";
import { Info } from "../Info";

import "./Main.css";

const SECTION_IDS_IN_ORDER = [
  ESection.About,
  ESection.Experience,
  ESection.Education,
  ESection.Projects,
] as const;
export function Main() {
  const i18n = useI18n();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [showSecondaryContent, setShowSecondaryContent] = useState(false);
  const [isHeroPrintingInProgress, setIsHeroPrintingInProgress] =
    useState(true);
  const isRevealAnimationEnabled = useMediaQuery(
    MIN_ANIMATED_VIEWPORT_MEDIA_QUERY,
    true,
  );

  function handleSkillLeave() {
    setHoveredSkill(null);
  }

  const timelineSkillHandlers = {
    onSkillEnter: setHoveredSkill,
    onSkillLeave: handleSkillLeave,
  };
  const aboutHash = toSectionHash(ESection.About);
  const experienceHash = toSectionHash(ESection.Experience);
  const educationHash = toSectionHash(ESection.Education);
  const projectsHash = toSectionHash(ESection.Projects);

  const sectionRendererByHash: Record<string, () => ReactNode> = {
    [aboutHash]: function () {
      return (
        <About
          key={aboutHash}
          hoveredSkill={hoveredSkill}
          onSkillEnter={setHoveredSkill}
          onSkillLeave={handleSkillLeave}
        />
      );
    },
    [experienceHash]: function () {
      return <Experience key={experienceHash} {...timelineSkillHandlers} />;
    },
    [educationHash]: function () {
      return <Education key={educationHash} {...timelineSkillHandlers} />;
    },
    [projectsHash]: function () {
      return null;
    },
  };

  function renderSectionContent(href: string) {
    const sectionRenderer = sectionRendererByHash[href];

    if (!sectionRenderer) {
      return null;
    }

    return sectionRenderer();
  }

  function getSectionTitleKey(sectionId: ESection): ETranslationKey {
    if (sectionId === ESection.About) {
      return ETranslationKey.NavAbout;
    }

    if (sectionId === ESection.Experience) {
      return ETranslationKey.NavExperience;
    }

    if (sectionId === ESection.Education) {
      return ETranslationKey.NavEducation;
    }

    return ETranslationKey.NavProjects;
  }

  const infoContent = (
    <Info
      hoveredSkill={hoveredSkill}
      onSkillEnter={setHoveredSkill}
      onSkillLeave={handleSkillLeave}
      onSecondaryContentVisibilityChange={setShowSecondaryContent}
      onHeroPrintingStateChange={setIsHeroPrintingInProgress}
    />
  );
  const isSecondaryContentVisible = showSecondaryContent;
  const sectionRevealClassName = isRevealAnimationEnabled
    ? isSecondaryContentVisible
      ? "flex h-full min-h-0 flex-col transition-all duration-500 ease-out translate-y-0 opacity-100"
      : "flex h-full min-h-0 flex-col transition-all duration-500 ease-out pointer-events-none translate-y-2 opacity-0"
    : isSecondaryContentVisible
      ? "flex h-full min-h-0 flex-col opacity-100"
      : "flex h-full min-h-0 flex-col pointer-events-none opacity-0";
  const mobileSectionRevealClassName = isRevealAnimationEnabled
    ? isSecondaryContentVisible
      ? "flex w-full flex-col gap-10 max-[1024px]:gap-0 transition-all duration-500 ease-out translate-y-0 opacity-100"
      : "flex w-full flex-col gap-10 max-[1024px]:gap-0 transition-all duration-500 ease-out pointer-events-none translate-y-2 opacity-0"
    : isSecondaryContentVisible
      ? "flex w-full flex-col gap-10 max-[1024px]:gap-0 opacity-100"
      : "flex w-full flex-col gap-10 max-[1024px]:gap-0 pointer-events-none opacity-0";

  return (
    <div className="relative flex h-full flex-col overflow-hidden px-24 pb-16 text-white max-[1024px]:overflow-y-auto max-[1024px]:px-18 max-[1024px]:pb-10 max-[768px]:px-12 max-[640px]:px-8">
      <LinesBackground />
      <div className="relative z-10 flex h-full min-h-screen min-h-0 flex-col max-[1024px]:pt-24">
        <Header
          isLanguageDisabled={isHeroPrintingInProgress}
          isNavigationDisabled={!isSecondaryContentVisible}
        />
        <main className="w-full min-h-0 flex-1 overflow-hidden max-[1024px]:overflow-visible">
          <div className="hidden h-full min-h-0 min-[1025px]:grid min-[1025px]:grid-cols-[5%_40%_55%]">
            <section className="relative">
              <Links />
            </section>

            <section className="relative min-h-[472px]">{infoContent}</section>

            <section className="relative min-h-0">
              <div className={sectionRevealClassName}>
                <SectionCarousel>
                  {SECTION_NAV_ITEMS.map(function ({ href }) {
                    return renderSectionContent(href);
                  })}
                </SectionCarousel>
                <SectionDots />
              </div>
            </section>
          </div>

          <div className="flex w-full flex-col gap-8 max-[1024px]:gap-0 max-[768px]:gap-4 min-[1025px]:hidden">
            <section className="relative w-full min-h-[472px] max-[1024px]:min-h-0">
              {infoContent}
            </section>

            <section className="relative w-full">
              <div className={mobileSectionRevealClassName}>
                {SECTION_IDS_IN_ORDER.map(function (sectionId) {
                  const section = renderSectionContent(
                    toSectionHash(sectionId),
                  );

                  if (!section) {
                    return null;
                  }

                  return (
                    <section
                      key={sectionId}
                      id={sectionId}
                      className="w-full max-[1024px]:scroll-mt-24 max-[1024px]:py-8"
                    >
                      <SectionHeading
                        className="mb-6 hidden max-[1024px]:flex"
                        lineClassName="ml-6 inline-block h-[2px] flex-1 origin-left bg-[color:var(--color-accent)]/70 transition-transform duration-500 ease-out"
                        animateLine
                        isLineVisible={
                          isSecondaryContentVisible || !isRevealAnimationEnabled
                        }
                        title={i18n.t(getSectionTitleKey(sectionId))}
                      />
                      {section}
                    </section>
                  );
                })}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
