import {
  SKILL_HREF_BY_LABEL,
  SKILL_REGEX,
  TERM_TO_TAG_MAP,
} from "../constants/skillTags";
import type { SkillInteractionProps } from "../types/skills";

type SkillHighlightsProps = SkillInteractionProps & {
  value: string;
  hoveredSkill?: string | null;
};

export function SkillHighlights(props: SkillHighlightsProps) {
  const { value, hoveredSkill, onSkillEnter, onSkillLeave } = props;
  const parts = value.split(SKILL_REGEX);

  function onHighlightedTermMouseEnter(tag: string) {
    return function () {
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
      <a
        key={`${part}-${index}`}
        className="skill-highlight"
        data-active={isActive}
        href={href}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={onHighlightedTermMouseEnter(tag)}
        onMouseLeave={onHighlightedTermMouseLeave}
        onFocus={onHighlightedTermMouseEnter(tag)}
        onBlur={onHighlightedTermMouseLeave}
      >
        {part}
      </a>
    );
  });
}
