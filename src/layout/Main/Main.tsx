import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { Header } from "../../components/Header";
import { MountainMist } from "../../components/illustrations/MountainMist";
import { NightSky } from "../../components/illustrations/NightSky";
import { Links } from "../../components/Links";
import { SectionCarousel } from "../../components/SectionCarousel";
import {
  DESKTOP_MIN_WIDTH_MEDIA_QUERY,
  MIN_ANIMATED_VIEWPORT_MEDIA_QUERY,
} from "../../constants/mediaQueries";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { ESection } from "../../utils/sections";
import { About } from "../About";
import { Education } from "../Education/Education";
import { Experience } from "../Experience/Experience";
import { Info } from "../Info";
import { Projects } from "../Projects/Projects";
import type { SkillInteractionProps } from "../../components/types/skills";
import { getSectionRevealClassName } from "../../utils/sectionReveal";
import { ETranslationKey } from "../../i18n/types";
import { useI18n } from "../../hooks/useI18n";

import "./Main.css";

export function Main() {
  const i18n = useI18n();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [showSecondaryContent, setShowSecondaryContent] = useState(false);
  const [isHeroPrintingInProgress, setIsHeroPrintingInProgress] =
    useState(true);
  const isRevealAnimationEnabled = useMediaQuery(
    MIN_ANIMATED_VIEWPORT_MEDIA_QUERY,
    false,
  );
  // Mobile-first SSR keeps the full document available for the first mobile paint.
  const isDesktopViewport = useMediaQuery(DESKTOP_MIN_WIDTH_MEDIA_QUERY, false);

  const handleSkillLeave = useCallback(function handleSkillLeave() {
    setHoveredSkill(null);
  }, []);

  const skillInteractionHandlers = useMemo<SkillInteractionProps>(
    () => ({
      onSkillEnter: setHoveredSkill,
      onSkillLeave: handleSkillLeave,
    }),
    [handleSkillLeave],
  );

  const sectionContent = useMemo<Record<ESection, ReactNode>>(
    () => ({
      [ESection.About]: <About />,
      [ESection.Experience]: <Experience {...skillInteractionHandlers} />,
      [ESection.Projects]: <Projects {...skillInteractionHandlers} />,
      [ESection.Education]: <Education {...skillInteractionHandlers} />,
    }),
    [skillInteractionHandlers],
  );

  const infoContent = (
    <Info
      hoveredSkill={hoveredSkill}
      {...skillInteractionHandlers}
      onSecondaryContentVisibilityChange={setShowSecondaryContent}
      onHeroPrintingStateChange={setIsHeroPrintingInProgress}
    />
  );
  const areSectionsVisible = !isDesktopViewport || showSecondaryContent;
  const sectionRevealClassName = getSectionRevealClassName(
    isDesktopViewport && isRevealAnimationEnabled,
    areSectionsVisible,
  );

  return (
    <div className="resume-page relative flex h-full flex-col overflow-clip text-white max-[1025px]:overflow-y-auto">
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        {i18n.t(ETranslationKey.A11ySkipToContent)}
      </a>
      <div className="resume-content relative z-10 mx-auto flex h-full min-h-0 w-full max-w-[1920px] flex-col px-24 max-[1025px]:px-18 max-[1025px]:pt-24 max-[768px]:px-12 max-[640px]:px-8">
        <NightSky />
        <MountainMist />
        <Header
          isLanguageDisabled={isHeroPrintingInProgress}
          isNavigationDisabled={!areSectionsVisible}
        />
        <main
          id="main-content"
          tabIndex={-1}
          className="w-full min-h-0 flex-1 overflow-hidden max-[1025px]:overflow-visible max-[1025px]:pb-8"
        >
          <div className="flex h-full min-h-0 flex-col max-[1025px]:h-auto max-[768px]:gap-4 min-[1025px]:grid min-[1175px]:grid-cols-[5%_40%_55%] min-[1025px]:max-[1175px]:grid-cols-[5%_45%_50%]">
            <section className="relative hidden h-full min-h-0 min-w-0 min-[1025px]:block">
              <Links isVisible={showSecondaryContent} />
            </section>
            <section className="relative flex min-h-0 min-w-0 flex-col max-[1025px]:pb-4 min-[1025px]:h-full min-[1025px]:justify-center">
              {infoContent}
            </section>
            <section className="relative min-h-0 min-w-0 min-[1025px]:h-full">
              <div className={sectionRevealClassName}>
                <SectionCarousel
                  sections={sectionContent}
                  isLineVisible={areSectionsVisible}
                />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
