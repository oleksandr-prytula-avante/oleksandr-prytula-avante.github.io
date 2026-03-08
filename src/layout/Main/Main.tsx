import { useState } from "react";
import type { ReactNode } from "react";

import { Header } from "../../components/Header";
import { LinesBackground } from "../../components/LinesBackground/LinesBackground";
import { Links } from "../../components/Links";
import { SectionCarousel } from "../../components/SectionCarousel";
import { SectionDots } from "../../components/SectionDots";
import { SECTION_NAV_ITEMS } from "../../constants/sections";
import { ESection, toSectionHash } from "../../utils/sections";
import { About } from "../About";
import { Education } from "../Education/Education";
import { Experience } from "../Experience/Experience";
import { Info } from "../Info";
import { Projects } from "../Projects";

import "./Main.css";

const SECTION_IDS_IN_ORDER = [
  ESection.About,
  ESection.Experience,
  ESection.Education,
  ESection.Projects,
] as const;

export function Main() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [showSecondaryContent, setShowSecondaryContent] = useState(false);
  const [isHeroPrintingInProgress, setIsHeroPrintingInProgress] =
    useState(true);

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
      return <Projects key={projectsHash} />;
    },
  };

  function renderSectionContent(href: string) {
    const sectionRenderer = sectionRendererByHash[href];
    return sectionRenderer ? sectionRenderer() : null;
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

  return (
    <div className="relative flex h-full flex-col overflow-hidden px-24 pb-16 text-white max-[1280px]:px-12 max-[1024px]:overflow-y-auto max-[1024px]:pb-10">
      <LinesBackground />
      <div className="relative z-10 flex h-full min-h-screen min-h-0 flex-col max-[1024px]:pt-24">
        <Header
          isLanguageDisabled={isHeroPrintingInProgress}
          isNavigationDisabled={!showSecondaryContent}
        />
        <main className="w-full min-h-0 flex-1 overflow-hidden max-[1024px]:overflow-visible">
          <div className="hidden h-full min-h-0 min-[1025px]:grid min-[1025px]:grid-cols-[5%_40%_55%]">
            <section className="relative">
              <Links />
            </section>

            <section className="relative">
              {infoContent}
            </section>

            <section className="relative min-h-0">
              <div
                className={`flex h-full min-h-0 flex-col transition-all duration-500 ease-out ${showSecondaryContent ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}
              >
                <SectionCarousel>
                  {SECTION_NAV_ITEMS.map(function ({ href }) {
                    return renderSectionContent(href);
                  })}
                </SectionCarousel>
                <SectionDots />
              </div>
            </section>
          </div>

          <div className="flex w-full flex-col gap-8 min-[1025px]:hidden">
            <section className="relative w-full">{infoContent}</section>

            <section className="relative w-full">
              <div
                className={`flex w-full flex-col gap-10 transition-all duration-500 ease-out ${showSecondaryContent ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}
              >
                {SECTION_IDS_IN_ORDER.map(function (sectionId) {
                  return (
                    <section key={sectionId} id={sectionId} className="w-full">
                      {renderSectionContent(toSectionHash(sectionId))}
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
