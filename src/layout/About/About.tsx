import { useId, useState, type CSSProperties, type ReactNode } from "react";

import { SectionBanner } from "../../components/SectionBanner";
import { TimelineExpandIcon } from "../../components/icons/TimelineExpandIcon";
import { ABOUT_STORY_BLOCKS } from "../../constants/about";
import { DESKTOP_MIN_WIDTH_MEDIA_QUERY } from "../../constants/mediaQueries";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useI18n } from "../../hooks/useI18n";
import { useAboutRevealScroll } from "../../hooks/useAboutRevealScroll";
import { ETranslationKey } from "../../i18n/types";

import "./About.css";

type SummaryLine = {
  content: ReactNode;
  indent?: number;
};

export function About() {
  const i18n = useI18n();
  const isDesktopViewport = useMediaQuery(DESKTOP_MIN_WIDTH_MEDIA_QUERY, true);
  const [isExpanded, setIsExpanded] = useState(false);
  const isDetailsVisible = !isDesktopViewport || isExpanded;
  const detailsId = useId();
  const {
    panelRef: aboutPanelRef,
    storyClipRef: aboutStoryClipRef,
    revealRef: aboutRevealRef,
  } = useAboutRevealScroll(isDesktopViewport, isExpanded);

  function handleToggle() {
    const nextExpanded = !isExpanded;
    setIsExpanded(nextExpanded);
  }
  const summary = {
    name: "Oleksandr (Alex) Prytula",
    role: i18n.t(ETranslationKey.HeroRole),
    experience: i18n.t(ETranslationKey.AboutYearsExperience),
    domains: i18n.t(ETranslationKey.AboutDomains),
    background: i18n.t(ETranslationKey.AboutProjects),
    teams: i18n.t(ETranslationKey.AboutTeams),
    expertise: i18n.t(ETranslationKey.AboutScope),
    ownership: i18n.t(ETranslationKey.AboutApproach),
    collaboration: i18n.t(ETranslationKey.AboutCollaboration),
    education: i18n.t(ETranslationKey.AboutEducation),
    communication: i18n.t(ETranslationKey.AboutCommunication),
  };
  const lines: SummaryLine[] = [
    {
      content: (
        <>
          <span className="summary-code__keyword">const</span>{" "}
          <span className="summary-code__name">SUMMARY</span>
          {" = {"}
        </>
      ),
    },
  ];

  for (const [key, value] of Object.entries(summary)) {
    const property = <span className="summary-code__property">{key}</span>;
    if (Array.isArray(value)) {
      lines.push({
        indent: 1,
        content: (
          <>
            {property}
            {": ["}
          </>
        ),
      });
      for (const entry of value) {
        lines.push({
          indent: 2,
          content: (
            <>
              <span className="summary-code__string">
                {JSON.stringify(entry)}
              </span>
              {","}
            </>
          ),
        });
      }
      lines.push({ indent: 1, content: "]," });
    } else {
      lines.push({
        indent: 2,
        content: (
          <>
            {property}
            {":  "}
            <span className="summary-code__string">
              {JSON.stringify(value)}
            </span>
            {","}
          </>
        ),
      });
    }
  }
  lines.push({ content: "};" });

  return (
    <article ref={aboutPanelRef} className="about-panel">
      <SectionBanner
        className="mb-4"
        trailing={
          <span className="shrink-0 text-[length:var(--font-size-caption)] font-bold text-white/55">
            {i18n.t(ETranslationKey.AboutPronouns)}
          </span>
        }
      >
        {i18n.t(ETranslationKey.AboutProfileLabel)}
      </SectionBanner>
      <div className="summary-code">
        <pre className="summary-code__source">
          <code>
            {lines.map(({ content, indent = 0 }, index) => (
              <span
                className="summary-code__line"
                key={index}
                style={
                  {
                    "--code-indent": `${indent * 2}ch`,
                  } as CSSProperties
                }
              >
                <span className="summary-code__number" aria-hidden="true">
                  {index + 1}
                </span>
                <span className="summary-code__text">
                  {"\t".repeat(indent)}
                  {content}
                  {index < lines.length - 1 ? "\n" : ""}
                </span>
              </span>
            ))}
          </code>
        </pre>
      </div>
      <div className="about-panel__details">
        <div className="about-panel__toggle-row">
          <button
            type="button"
            className="control-label about-panel__toggle"
            aria-expanded={isExpanded}
            aria-controls={detailsId}
            onClick={handleToggle}
          >
            {i18n.t(ETranslationKey.AboutGetToKnow)}
            <TimelineExpandIcon isExpanded={isExpanded} />
          </button>
        </div>
        <div
          id={detailsId}
          ref={aboutRevealRef}
          className="about-panel__reveal"
          data-expanded={isDetailsVisible}
          aria-hidden={!isDetailsVisible}
          inert={!isDetailsVisible}
        >
          <div ref={aboutStoryClipRef} className="about-panel__clip">
            <div
              key={isExpanded ? "about-story-open" : "about-story-closed"}
              className="about-panel__full-story"
            >
              {ABOUT_STORY_BLOCKS.map(({ titleKey, bodyKey }) => (
                <section className="about-panel__story-block" key={titleKey}>
                  <h3>{i18n.t(titleKey)}</h3>
                  <p>{i18n.t(bodyKey)}</p>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
