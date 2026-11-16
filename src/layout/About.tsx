import { useEffect, useId, useRef, useState } from "react";

import { SkillHighlights } from "../components/SkillHighlights";
import { TimelineExpandIcon } from "../components/icons/TimelineExpandIcon";
import { useI18n } from "../hooks/useI18n";
import { ETranslationKey } from "../i18n/types";

import "./About.css";

const ABOUT_PARAGRAPHS = [
  ETranslationKey.AboutParagraph1,
  ETranslationKey.AboutParagraph2,
  ETranslationKey.AboutParagraph3,
  ETranslationKey.AboutParagraph4,
] as const;

type AboutProps = {
  hoveredSkill?: string | null;
  onSkillEnter: (skill: string) => void;
  onSkillLeave: () => void;
};

export function About(props: AboutProps) {
  const { hoveredSkill, onSkillEnter, onSkillLeave } = props;
  const i18n = useI18n();
  const [isExpanded, setIsExpanded] = useState(false);
  const detailsId = useId();
  const articleRef = useRef<HTMLElement>(null);
  const toggleRowRef = useRef<HTMLDivElement>(null);
  const shouldScrollRef = useRef(false);
  const scrollOriginRef = useRef<{
    container: HTMLElement;
    top: number;
  } | null>(null);

  function handleToggle() {
    const article = articleRef.current;
    if (!article) return;

    if (!isExpanded) {
      let container: HTMLElement | null = article;
      while (
        container &&
        !/auto|scroll/.test(window.getComputedStyle(container).overflowY)
      ) {
        container = container.parentElement;
      }
      if (container) {
        scrollOriginRef.current = { container, top: container.scrollTop };
      }
    }

    shouldScrollRef.current = true;
    setIsExpanded(!isExpanded);
  }

  useEffect(() => {
    if (!shouldScrollRef.current) return;
    shouldScrollRef.current = false;

    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // Wait for the reveal to create its full scroll range before moving into it.
    const scrollTimeout = window.setTimeout(
      () => {
        const origin = scrollOriginRef.current;
        const toggleRow = toggleRowRef.current;
        if (!origin || !toggleRow) return;

        const { container } = origin;
        const headerOffset =
          container === articleRef.current
            ? 0
            : (document.querySelector(".site-header")?.getBoundingClientRect()
                .height ?? 0);
        const expandedTop =
          container.scrollTop +
          toggleRow.getBoundingClientRect().top -
          container.getBoundingClientRect().top -
          headerOffset;

        container.scrollTo({
          top: isExpanded ? expandedTop : origin.top,
          behavior: isReducedMotion ? "instant" : "smooth",
        });
      },
      isExpanded && !isReducedMotion ? 460 : 0,
    );

    return () => window.clearTimeout(scrollTimeout);
  }, [isExpanded]);

  const facts = [
    { value: "10+", label: ETranslationKey.AboutExperienceLabel },
    { value: "3–20", label: ETranslationKey.AboutTeamLabel },
    {
      value: i18n.t(ETranslationKey.AboutDegreeValue),
      label: ETranslationKey.AboutDegreeLabel,
    },
  ];

  return (
    <article ref={articleRef} className="about-panel">
      <div className="about-panel__content">
        <p className="about-panel__intro">
          {i18n.t(ETranslationKey.AboutSummary)}
        </p>

        <dl className="about-panel__credentials">
          {facts.map(({ value, label }) => (
            <div key={label}>
              <dt>{i18n.t(label)}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <div className="about-panel__highlights">
          <section>
            <h2>{i18n.t(ETranslationKey.AboutDomainsTitle)}</h2>
            <p>{i18n.t(ETranslationKey.AboutDomainsSummary)}</p>
          </section>
          <section>
            <h2>{i18n.t(ETranslationKey.AboutStackTitle)}</h2>
            <p>
              <SkillHighlights
                value={i18n.t(ETranslationKey.AboutStackSummary)}
                hoveredSkill={hoveredSkill}
                onSkillEnter={onSkillEnter}
                onSkillLeave={onSkillLeave}
              />
            </p>
          </section>
          <section>
            <h2>{i18n.t(ETranslationKey.AboutApproachTitle)}</h2>
            <p>{i18n.t(ETranslationKey.AboutApproachSummary)}</p>
          </section>
        </div>

        <div className="about-panel__details">
          <div ref={toggleRowRef} className="about-panel__toggle-row">
            <button
              type="button"
              className="control-label about-panel__toggle"
              aria-expanded={isExpanded}
              aria-controls={detailsId}
              onClick={handleToggle}
            >
              <span>
                {i18n.t(
                  isExpanded
                    ? ETranslationKey.TimelineHideDetails
                    : ETranslationKey.TimelineExpandDetails,
                )}
              </span>
              <TimelineExpandIcon isExpanded={isExpanded} />
            </button>
          </div>
          <div
            id={detailsId}
            className="about-panel__reveal"
            data-expanded={isExpanded}
            aria-hidden={!isExpanded}
            inert={!isExpanded}
          >
            <div className="about-panel__clip">
              <div className="about-panel__full-story">
                {ABOUT_PARAGRAPHS.map((translationKey) => (
                  <p key={translationKey}>
                    <SkillHighlights
                      value={i18n.t(translationKey)}
                      hoveredSkill={hoveredSkill}
                      onSkillEnter={onSkillEnter}
                      onSkillLeave={onSkillLeave}
                    />
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
