import { useEffect, useRef, useState } from "react";

import { useMediaQuery } from "../../hooks/useMediaQuery";

import {
  COMMON_SKILL_TAGS,
  SKILL_HREF_BY_LABEL,
} from "../../constants/skillTags";
import { MIN_ANIMATED_VIEWPORT_MEDIA_QUERY } from "../../constants/mediaQueries";
import {
  TAG_REVEAL_STAGGER_MS,
  TAG_REVEAL_DURATION_MS,
} from "../../constants/animations";
import { Tag } from "./Tag";
import type { SkillInteractionProps } from "../types/skills";

import "./Tags.css";

type TagsProps = SkillInteractionProps & {
  hoveredSkill?: string | null;
};

export function Tags(props: TagsProps) {
  const { hoveredSkill, onSkillEnter, onSkillLeave } = props;
  const tagsListRef = useRef<HTMLUListElement>(null);
  const [revealedTags, setRevealedTags] = useState<string[]>([]);
  const isTagAnimationEnabled = useMediaQuery(
    MIN_ANIMATED_VIEWPORT_MEDIA_QUERY,
    true,
  );

  useEffect(
    function () {
      if (!isTagAnimationEnabled) {
        return;
      }

      const tagsList = tagsListRef.current;

      if (!tagsList || typeof IntersectionObserver === "undefined") {
        return;
      }

      const observer = new IntersectionObserver(
        function (entries) {
          const enteredTags = entries
            .filter(function (entry) {
              return entry.isIntersecting;
            })
            .map(function (entry) {
              return (entry.target as HTMLElement).dataset.tagLabel;
            })
            .filter(function (label): label is string {
              return Boolean(label);
            });

          if (enteredTags.length === 0) {
            return;
          }

          setRevealedTags(function (currentTags) {
            const nextTags = [...currentTags];

            enteredTags.forEach(function (label) {
              if (!nextTags.includes(label)) {
                nextTags.push(label);
              }
            });

            return nextTags.length === currentTags.length
              ? currentTags
              : nextTags;
          });
        },
        { root: tagsList, threshold: 0.01 },
      );

      tagsList
        .querySelectorAll<HTMLElement>("[data-tag-label]")
        .forEach(function (tagElement) {
          observer.observe(tagElement);
        });

      return function () {
        observer.disconnect();
      };
    },
    [isTagAnimationEnabled],
  );

  return (
    <ul ref={tagsListRef} className="skill-tags">
      {COMMON_SKILL_TAGS.map(function (label, index) {
        const isActive = hoveredSkill === label;
        const href = SKILL_HREF_BY_LABEL[label];
        const revealOrder = revealedTags.indexOf(label);
        const shouldAnimate = isTagAnimationEnabled && revealOrder !== -1;

        return (
          <li
            key={label}
            data-tag-label={label}
            className={shouldAnimate ? "tag-reveal" : undefined}
            style={
              shouldAnimate
                ? {
                    animationDelay: `${Math.min(revealOrder, index) * TAG_REVEAL_STAGGER_MS}ms`,
                    animationDuration: `${TAG_REVEAL_DURATION_MS}ms`,
                  }
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
