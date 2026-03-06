import type { MouseEvent } from "react";

import {
  SKILL_HREF_BY_LABEL,
  SKILL_REGEX,
  TERM_TO_TAG_MAP,
} from "../constants/skillTags";
import { ExternalLink } from "./ExternalLink";

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
    return function (_event: MouseEvent<HTMLAnchorElement>) {
      onSkillEnter(tag);
    };
  }

  function onHighlightedTermMouseLeave() {
    onSkillLeave();
  }

  return parts.map(function (part, index) {
    const tag = TERM_TO_TAG_MAP.get(part.toLowerCase());

    if (!tag) {
      return <span key={`${part}-${index}`}>{part}</span>;
    }

    const isActive = hoveredSkill === tag;
    const href = SKILL_HREF_BY_LABEL[tag];

    return (
      <ExternalLink
        key={`${part}-${index}`}
        className={
          isActive
            ? "text-[color:var(--color-accent)]"
            : "hover:text-[color:var(--color-accent)]"
        }
        href={href}
        onMouseEnter={onHighlightedTermMouseEnter(tag)}
        onMouseLeave={onHighlightedTermMouseLeave}
      >
        {part}
      </ExternalLink>
    );
  });
}
