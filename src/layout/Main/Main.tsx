import { useState } from "react";

import { Header } from "../../components/Header";
import { LinesBackground } from "../../components/LinesBackground/LinesBackground";
import { Links } from "../../components/Links";
import { SectionCarousel } from "../../components/SectionCarousel";
import { SectionDots } from "../../components/SectionDots";
import { SECTION_NAV_ITEMS } from "../../constants/sectionNavigation";
import { ESectionId, toSectionHash } from "../../utils/sections";
import { About } from "../About";
import { Education } from "../Education";
import { Experience } from "../Experience/Experience";
import { Info } from "../Info";
import { Projects } from "../Projects";

import "./Main.css";

export function Main() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [showSecondaryContent, setShowSecondaryContent] = useState(false);
  const [isHeroPrintingInProgress, setIsHeroPrintingInProgress] =
    useState(true);

  function handleSkillLeave() {
    setHoveredSkill(null);
  }

  function renderSectionContent(href: string) {
    if (href === toSectionHash(ESectionId.About)) {
      return (
        <About
          key={href}
          hoveredSkill={hoveredSkill}
          onSkillEnter={setHoveredSkill}
          onSkillLeave={function () {
            setHoveredSkill(null);
          }}
        />
      );
    }

    if (href === toSectionHash(ESectionId.Experience)) {
      return (
        <Experience
          key={href}
          onSkillEnter={setHoveredSkill}
          onSkillLeave={handleSkillLeave}
        />
      );
    }

    if (href === toSectionHash(ESectionId.Education)) {
      return <Education key={href} />;
    }

    if (href === toSectionHash(ESectionId.Projects)) {
      return <Projects key={href} />;
    }

    return null;
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden px-24 pb-16 text-white max-[1280px]:px-12 max-[1024px]:overflow-y-auto max-[1024px]:pb-10">
      <LinesBackground />
      <div className="relative z-10 flex h-full min-h-screen min-h-0 flex-col max-[1024px]:pt-24">
        <Header isLanguageDisabled={isHeroPrintingInProgress} />
        <main className="w-full min-h-0 flex-1 overflow-hidden max-[1024px]:overflow-visible">
          <div className="hidden h-full min-h-0 min-[1025px]:grid min-[1025px]:grid-cols-[5%_40%_55%]">
            <section className="relative">
              <Links />
            </section>

            <section className="relative">
              <Info
                hoveredSkill={hoveredSkill}
                onSkillEnter={setHoveredSkill}
                onSkillLeave={handleSkillLeave}
                onSecondaryContentVisibilityChange={setShowSecondaryContent}
                onHeroPrintingStateChange={setIsHeroPrintingInProgress}
              />
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
            <section className="relative w-full">
              <Info
                hoveredSkill={hoveredSkill}
                onSkillEnter={setHoveredSkill}
                onSkillLeave={handleSkillLeave}
                onSecondaryContentVisibilityChange={setShowSecondaryContent}
                onHeroPrintingStateChange={setIsHeroPrintingInProgress}
              />
            </section>

            <section className="relative w-full">
              <div
                className={`flex w-full flex-col gap-10 transition-all duration-500 ease-out ${showSecondaryContent ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}
              >
                <section id={ESectionId.About} className="w-full">
                  {renderSectionContent(toSectionHash(ESectionId.About))}
                </section>

                <section id={ESectionId.Experience} className="w-full">
                  {renderSectionContent(toSectionHash(ESectionId.Experience))}
                </section>

                <section id={ESectionId.Education} className="w-full">
                  {renderSectionContent(toSectionHash(ESectionId.Education))}
                </section>

                <section id={ESectionId.Projects} className="w-full">
                  {renderSectionContent(toSectionHash(ESectionId.Projects))}
                </section>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
