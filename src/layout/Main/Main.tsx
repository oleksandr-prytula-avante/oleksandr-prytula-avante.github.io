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

  return (
    <div className="relative flex h-full flex-col overflow-hidden px-24 pb-16 text-white max-[1280px]:px-12">
      <LinesBackground />
      <div className="relative z-10 flex h-full min-h-screen min-h-0 flex-col">
        <Header isLanguageDisabled={isHeroPrintingInProgress} />
        <main className="w-full min-h-0 flex-1 overflow-hidden">
          <div className="grid h-full min-h-0 grid-cols-[5%_40%_55%]">
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

                    if (href === toSectionHash(ESectionId.Expirience)) {
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
                  })}
                </SectionCarousel>
                <SectionDots />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
