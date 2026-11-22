import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useTagRevealAnimation } from "../../hooks/useTagRevealAnimation";

import {
  COMMON_SKILL_TAGS,
  SKILL_HREF_BY_LABEL,
} from "../../constants/skillTags";
import { MIN_ANIMATED_VIEWPORT_MEDIA_QUERY } from "../../constants/mediaQueries";
import { TAG_REVEAL_DURATION_MS } from "../../constants/animations";
import { Tag } from "./Tag";
import type { SkillInteractionProps } from "../types/skills";

import "./Tags.css";

type TagsProps = SkillInteractionProps & {
  hoveredSkill?: string | null;
};

export function Tags(props: TagsProps) {
  const { hoveredSkill, onSkillEnter, onSkillLeave } = props;
  const isTagAnimationEnabled = useMediaQuery(
    MIN_ANIMATED_VIEWPORT_MEDIA_QUERY,
    true,
  );
  const [tagsListRef, revealedTags] = useTagRevealAnimation(
    COMMON_SKILL_TAGS,
    isTagAnimationEnabled,
  );

  return (
    <ul ref={tagsListRef} className="skill-tags">
      {COMMON_SKILL_TAGS.map(function (label) {
        const isActive = hoveredSkill === label;
        const href = SKILL_HREF_BY_LABEL[label];
        const shouldAnimate = isTagAnimationEnabled && revealedTags.has(label);
        const revealClassName = !isTagAnimationEnabled
          ? undefined
          : shouldAnimate
            ? "tag-reveal"
            : "tag-reveal-pending";

        return (
          <li
            key={label}
            data-tag-label={label}
            className={revealClassName}
            style={
              shouldAnimate
                ? { animationDuration: `${TAG_REVEAL_DURATION_MS}ms` }
                : undefined
            }
          >
            <Tag
              label={label}
              href={href}
              isActive={isActive}
              onSelectSkill={onSkillEnter}
              onClearSkill={onSkillLeave}
            />
          </li>
        );
      })}
    </ul>
  );
}
