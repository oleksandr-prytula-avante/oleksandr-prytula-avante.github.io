import { useState } from "react";
import type { ReactNode } from "react";

import { Header } from "../../components/Header";
import { Links } from "../../components/Links";
import { SectionCarousel } from "../../components/SectionCarousel";
import { MIN_ANIMATED_VIEWPORT_MEDIA_QUERY } from "../../constants/mediaQueries";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { ESection } from "../../utils/sections";
import { About } from "../About";
import { Education } from "../Education/Education";
import { Experience } from "../Experience/Experience";
import { Info } from "../Info";
import { Projects } from "../Projects/Projects";

import "./Main.css";

function getSectionRevealClassName(isAnimated: boolean, isVisible: boolean) {
  return [
    "flex h-full min-h-0 flex-col max-[1024px]:h-auto",
    isAnimated ? "transition-all duration-500 ease-out" : "",
    isVisible
      ? "translate-y-0 opacity-100"
      : `pointer-events-none opacity-0 ${isAnimated ? "translate-y-2" : ""}`,
  ]
    .filter(Boolean)
    .join(" ");
}

export function Main() {
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

  const sectionContent: Record<ESection, ReactNode> = {
    [ESection.About]: (
      <About hoveredSkill={hoveredSkill} {...timelineSkillHandlers} />
    ),
    [ESection.Experience]: <Experience {...timelineSkillHandlers} />,
    [ESection.Projects]: <Projects {...timelineSkillHandlers} />,
    [ESection.Education]: <Education {...timelineSkillHandlers} />,
  };

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
  const sectionRevealClassName = getSectionRevealClassName(
    isRevealAnimationEnabled,
    isSecondaryContentVisible,
  );

  return (
    <div className="resume-page relative flex h-full flex-col overflow-hidden text-white max-[1024px]:overflow-y-auto">
      <div className="resume-content relative z-10 mx-auto flex h-full min-h-0 w-full max-w-[1920px] flex-col px-24 max-[1024px]:px-18 max-[1024px]:pt-24 max-[768px]:px-12 max-[640px]:px-8">
        <div className="night-sky" aria-hidden="true">
          <span className="night-sky__ufo" />
        </div>
        <div className="mountain-mist" aria-hidden="true" />
        <Header
          isLanguageDisabled={isHeroPrintingInProgress}
          isNavigationDisabled={!isSecondaryContentVisible}
        />
        <main className="w-full min-h-0 flex-1 overflow-hidden max-[1024px]:overflow-visible max-[1024px]:pb-8">
          <div className="flex h-full min-h-0 flex-col max-[1024px]:h-auto max-[768px]:gap-4 min-[1025px]:grid min-[1175px]:grid-cols-[5%_40%_55%] min-[1025px]:max-[1175px]:grid-cols-[5%_45%_50%]">
            <section className="relative hidden h-full min-h-0 min-[1025px]:block">
              <Links isVisible={isSecondaryContentVisible} />
            </section>
            <section className="relative flex min-h-0 flex-col max-[1024px]:pb-4 min-[1025px]:h-full min-[1025px]:justify-center">
              {infoContent}
            </section>
            <section className="relative min-h-0 min-[1025px]:h-full">
              <div className={sectionRevealClassName}>
                <SectionCarousel
                  sections={sectionContent}
                  isLineVisible={
                    isSecondaryContentVisible || !isRevealAnimationEnabled
                  }
                />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
