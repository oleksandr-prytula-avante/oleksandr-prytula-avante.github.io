import {
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import { TimelineExpandIcon } from "../components/icons/TimelineExpandIcon";
import { useI18n } from "../hooks/useI18n";
import { ETranslationKey } from "../i18n/types";

import "./About.css";

type SummaryLine = {
  content: ReactNode;
  indent?: number;
};

export function About() {
  const i18n = useI18n();
  const [isExpanded, setIsExpanded] = useState(false);
  const detailsId = useId();
  const summaryRef = useRef<HTMLDivElement | null>(null);

  function handleToggle() {
    setIsExpanded((current) => !current);
    requestAnimationFrame(() => {
      summaryRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }
  const summary = {
    location: i18n.t(ETranslationKey.AboutLocation),
    job: i18n.t(ETranslationKey.HeroRole),
    experience: i18n.t(ETranslationKey.AboutYearsExperience),
    domains: i18n.t(ETranslationKey.AboutDomains),
    teams: i18n.t(ETranslationKey.AboutTeams),
    approach: i18n.t(ETranslationKey.AboutApproach),
    education: i18n.t(ETranslationKey.AboutEducation),
    communication: i18n.t(ETranslationKey.AboutCommunication),
    learning: i18n.t(ETranslationKey.AboutLearning),
    workStyle: i18n.t(ETranslationKey.AboutWorkStyle),
    projects: i18n.t(ETranslationKey.AboutProjects),
    scope: i18n.t(ETranslationKey.AboutScope),
    collaboration: i18n.t(ETranslationKey.AboutCollaboration),
    mentoring: i18n.t(ETranslationKey.AboutMentoring),
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
    <article className="about-panel">
      <div ref={summaryRef} className="summary-code">
        <div className="summary-code__header" aria-hidden="true">
          <span className="summary-code__file">profile summary</span>
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
          data-expanded={isExpanded}
          aria-hidden={!isExpanded}
          inert={!isExpanded}
        >
          <div className="about-panel__clip">
            <div className="about-panel__full-story">
              {[
                ETranslationKey.AboutParagraph1,
                ETranslationKey.AboutParagraph3,
                ETranslationKey.AboutParagraph4,
              ].map((key) => (
                <p key={key}>{i18n.t(key)}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
