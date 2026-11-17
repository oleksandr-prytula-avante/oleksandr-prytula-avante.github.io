import {
  useId,
  useRef,
  useState,
  useEffect,
  type CSSProperties,
  type ReactNode,
} from "react";

import { LinkedInIcon } from "../components/icons/LinkedInIcon";
import { TimelineExpandIcon } from "../components/icons/TimelineExpandIcon";
import { ABOUT_REVEAL_SCROLL_FALLBACK_MS } from "../constants/animations";
import { ABOUT_STORY_BLOCKS } from "../constants/about";
import { LINKS } from "../constants/links";
import { DESKTOP_MIN_WIDTH_MEDIA_QUERY } from "../constants/mediaQueries";
import { ELink } from "../enums/links";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useI18n } from "../hooks/useI18n";
import { ETranslationKey } from "../i18n/types";

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
  const aboutPanelRef = useRef<HTMLElement | null>(null);
  const aboutStoryClipRef = useRef<HTMLDivElement | null>(null);
  const aboutRevealRef = useRef<HTMLDivElement | null>(null);

  function scrollToAboutStory(behavior: ScrollBehavior = "smooth") {
    const panel = aboutPanelRef.current;
    const storyClip = aboutStoryClipRef.current;

    if (panel && storyClip) {
      const panelRect = panel.getBoundingClientRect();
      const storyRect = storyClip.getBoundingClientRect();
      const storyTop = Math.max(
        0,
        panel.scrollTop + storyRect.top - panelRect.top,
      );

      panel.scrollTo({ top: storyTop, behavior });
    }
  }

  useEffect(() => {
    if (!isDesktopViewport) {
      return;
    }

    if (!isExpanded) {
      aboutPanelRef.current?.scrollTo({ top: 0, behavior: "smooth" });

      return;
    }

    const reveal = aboutRevealRef.current;
    let scrollTimeout = 0;

    const scrollAfterReveal = function () {
      scrollToAboutStory("smooth");
    };

    function handleRevealTransitionEnd(event: TransitionEvent) {
      if (event.propertyName === "grid-template-rows") {
        scrollAfterReveal();
      }
    }

    reveal?.addEventListener("transitionend", handleRevealTransitionEnd);
    scrollTimeout = window.setTimeout(
      scrollAfterReveal,
      ABOUT_REVEAL_SCROLL_FALLBACK_MS,
    );

    return () => {
      reveal?.removeEventListener("transitionend", handleRevealTransitionEnd);
      window.clearTimeout(scrollTimeout);
    };
  }, [isDesktopViewport, isExpanded]);

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
  const linkedIn = LINKS.find(function (link) {
    return link.id === ELink.LinkedIn;
  });
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
      <div className="summary-code">
        <div className="summary-code__header">
          <span className="summary-code__file">#Profile</span>
          <div className="summary-code__profile-meta">
            <span className="summary-code__pronouns">he/him</span>
            {linkedIn && (
              <a
                className="summary-code__linkedin"
                href={linkedIn.href}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
            )}
          </div>
        </div>
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
