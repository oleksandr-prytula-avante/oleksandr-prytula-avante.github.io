import type { MouseEvent } from "react";

import { SKILL_TAGS } from "../constants/skillTags";

type SkillHighlightsProps = {
  value: string;
  hoveredSkill: string | null;
  onSkillEnter: (skill: string) => void;
  onSkillLeave: () => void;
};

const SKILL_HIGHLIGHT_TERMS = Array.from(
  new Set(
    SKILL_TAGS.map(function ({ label }) {
      return label;
    }),
  ),
);

const TERM_TO_TAG_MAP = new Map(
  SKILL_HIGHLIGHT_TERMS.map(function (term) {
    return [term.toLowerCase(), term];
  }),
);

const SKILL_REGEX = new RegExp(
  `(?<![\\p{L}\\p{N}])(${SKILL_HIGHLIGHT_TERMS.map(function (term) {
    return term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  })
    .sort(function (left, right) {
      return right.length - left.length;
    })
    .join("|")})(?![\\p{L}\\p{N}])`,
  "giu",
);

export function SkillHighlights({
  value,
  hoveredSkill,
  onSkillEnter,
  onSkillLeave,
}: SkillHighlightsProps) {
  const parts = value.split(SKILL_REGEX);

  function onHighlightedTermMouseEnter(tag: string) {
    return function (event: MouseEvent<HTMLSpanElement>) {
      event.preventDefault();
      onSkillEnter(tag);
    };
  }

  function onHighlightedTermMouseLeave(event: MouseEvent<HTMLSpanElement>) {
    event.preventDefault();
    onSkillLeave();
  }

  return parts.map(function (part, index) {
    const tag = TERM_TO_TAG_MAP.get(part.toLowerCase());

    if (!tag) {
      return <span key={`${part}-${index}`}>{part}</span>;
    }

    const isActive = hoveredSkill === tag;

    return (
      <span
        key={`${part}-${index}`}
        className={
          isActive
            ? "text-[color:var(--color-accent)]"
            : "hover:text-[color:var(--color-accent)]"
        }
        onMouseEnter={onHighlightedTermMouseEnter(tag)}
        onMouseLeave={onHighlightedTermMouseLeave}
      >
        {part}
      </span>
    );
  });
}
