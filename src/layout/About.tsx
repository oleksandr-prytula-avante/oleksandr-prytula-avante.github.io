import {
  useId,
  useRef,
  useState,
  useEffect,
  type CSSProperties,
  type ReactNode,
} from "react";

import { TimelineExpandIcon } from "../components/icons/TimelineExpandIcon";
import { DESKTOP_MIN_WIDTH_MEDIA_QUERY } from "../constants/mediaQueries";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useI18n } from "../hooks/useI18n";
import { ETranslationKey } from "../i18n/types";

import "./About.css";

type SummaryLine = {
  content: ReactNode;
  indent?: number;
};

type StoryBlock = {
  titleKey: ETranslationKey;
  bodyKey: ETranslationKey;
};

export function About() {
  const i18n = useI18n();
  const isDesktopViewport = useMediaQuery(DESKTOP_MIN_WIDTH_MEDIA_QUERY, true);
  const [isExpanded, setIsExpanded] = useState(false);
  const isDetailsVisible = !isDesktopViewport || isExpanded;
  const detailsId = useId();
  const aboutPanelRef = useRef<HTMLElement | null>(null);

  function scrollToAboutTop(behavior: ScrollBehavior = "smooth") {
    const panel = aboutPanelRef.current;

    if (panel) {
      panel.scrollTo({ top: 0, behavior });
    }
  }

  useEffect(() => {
    if (!isDesktopViewport) {
      return;
    }

    let secondFrame = 0;
    const frame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(function () {
        scrollToAboutTop("smooth");
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(secondFrame);
    };
  }, [isDesktopViewport, isExpanded]);

  function handleToggle() {
    const nextExpanded = !isExpanded;
    setIsExpanded(nextExpanded);

    if (nextExpanded) {
      // Reset the internal About scroller immediately, then repeat after the
      // reveal has mounted so the animation always starts at the panel top.
      scrollToAboutTop("instant");
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          scrollToAboutTop("smooth");
        });
      });
    }
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
  const storyBlocks: StoryBlock[] = [
    {
      titleKey: ETranslationKey.AboutProfileTitle,
      bodyKey: ETranslationKey.AboutParagraph1,
    },
    {
      titleKey: ETranslationKey.AboutLargeScaleTitle,
      bodyKey: ETranslationKey.AboutLargeScaleText,
    },
    {
      titleKey: ETranslationKey.AboutInteractiveTitle,
      bodyKey: ETranslationKey.AboutInteractiveText,
    },
    {
      titleKey: ETranslationKey.AboutStakeholderTitle,
      bodyKey: ETranslationKey.AboutStakeholderText,
    },
    {
      titleKey: ETranslationKey.AboutQualityTitle,
      bodyKey: ETranslationKey.AboutQualityText,
    },
    {
      titleKey: ETranslationKey.AboutMentoringTitle,
      bodyKey: ETranslationKey.AboutMentoringText,
    },
    {
      titleKey: ETranslationKey.AboutEducationTitle,
      bodyKey: ETranslationKey.AboutParagraph4,
    },
    {
      titleKey: ETranslationKey.AboutCareerTitle,
      bodyKey: ETranslationKey.AboutCareerText,
    },
    {
      titleKey: ETranslationKey.AboutTechnicalFocusTitle,
      bodyKey: ETranslationKey.AboutTechnicalFocusText,
    },
    {
      titleKey: ETranslationKey.AboutProjectPreferencesTitle,
      bodyKey: ETranslationKey.AboutProjectPreferencesText,
    },
  ];
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
        indent: 2,
        content: (
          <>
            {property}
            {": ["}
          </>
        ),
      });
      for (const entry of value) {
        lines.push({
          indent: 4,
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
      lines.push({ indent: 2, content: "]," });
    } else {
      lines.push({
        indent: 2,
        content: (
          <>
            {property}
            {": "}
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
        <div className="summary-code__header" aria-hidden="true">
          <span className="summary-code__file">#Profile</span>
        </div>
        <pre className="summary-code__source">
          <code>
            {lines.map(({ content, indent = 0 }, index) => (
              <span
                className="summary-code__line"
                key={index}
                style={{ "--code-indent": `${indent}ch` } as CSSProperties}
              >
                <span className="summary-code__number" aria-hidden="true">
                  {index + 1}
                </span>
                <span className="summary-code__text">
                  {" ".repeat(indent)}
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
          className="about-panel__reveal"
          data-expanded={isDetailsVisible}
          aria-hidden={!isDetailsVisible}
          inert={!isDetailsVisible}
        >
          <div className="about-panel__clip">
            <div
              key={isExpanded ? "about-story-open" : "about-story-closed"}
              className="about-panel__full-story"
            >
              {storyBlocks.map(({ titleKey, bodyKey }) => (
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
