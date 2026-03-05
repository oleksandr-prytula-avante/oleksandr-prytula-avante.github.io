import type { MouseEvent } from "react";

import { SKILL_REGEX, TERM_TO_TAG_MAP } from "../constants/skillTags";

type SkillHighlightsProps = {
  value: string;
  hoveredSkill?: string | null;
  onSkillEnter: (skill: string) => void;
  onSkillLeave: () => void;
};

export function SkillHighlights(props: SkillHighlightsProps) {
  const { value, hoveredSkill, onSkillEnter, onSkillLeave } = props;
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
