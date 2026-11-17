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
  TAG_SCROLL_BOTTOM_INSET_PX,
} from "../../constants/animations";
import { Tag } from "./Tag";
import type { SkillInteractionProps } from "../types/skills";

import "./Tags.css";

type TagsProps = SkillInteractionProps & {
  hoveredSkill?: string | null;
};

const COMMON_SKILL_TAG_ORDER = new Map<string, number>(
  COMMON_SKILL_TAGS.map(function (label, index) {
    return [label, index];
  }),
);

export function Tags(props: TagsProps) {
  const { hoveredSkill, onSkillEnter, onSkillLeave } = props;
  const tagsListRef = useRef<HTMLUListElement>(null);
  const revealedTagsRef = useRef<string[]>([]);
  const pendingScrollTagRef = useRef<string | null>(null);
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
            })
            .sort(function (leftLabel, rightLabel) {
              return (
                (COMMON_SKILL_TAG_ORDER.get(leftLabel) ?? 0) -
                (COMMON_SKILL_TAG_ORDER.get(rightLabel) ?? 0)
              );
            });

          if (enteredTags.length === 0) {
            return;
          }

          const newlyEnteredTags = enteredTags.filter(function (label) {
            return !revealedTagsRef.current.includes(label);
          });

          if (newlyEnteredTags.length > 0) {
            pendingScrollTagRef.current =
              newlyEnteredTags[newlyEnteredTags.length - 1];
          }

          setRevealedTags(function (currentTags) {
            const nextTags = [...currentTags];

            enteredTags.forEach(function (label) {
              if (!nextTags.includes(label)) {
                nextTags.push(label);
              }
            });

            revealedTagsRef.current = nextTags;

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

  useEffect(
    function () {
      const tagsList = tagsListRef.current;
      const label = pendingScrollTagRef.current;

      if (!tagsList || !label) {
        return;
      }

      pendingScrollTagRef.current = null;

      const frame = requestAnimationFrame(function () {
        const tagElement = tagsList.querySelector<HTMLElement>(
          `[data-tag-label="${CSS.escape(label)}"]`,
        );

        if (!tagElement) {
          return;
        }

        const listRect = tagsList.getBoundingClientRect();
        const tagRect = tagElement.getBoundingClientRect();
        const scrollDelta =
          tagRect.bottom - (listRect.bottom - TAG_SCROLL_BOTTOM_INSET_PX);

        if (scrollDelta > 0) {
          tagsList.scrollBy({ top: scrollDelta, behavior: "smooth" });
        }
      });

      return function () {
        cancelAnimationFrame(frame);
      };
    },
    [revealedTags],
  );

  return (
    <ul ref={tagsListRef} className="skill-tags">
      {COMMON_SKILL_TAGS.map(function (label, index) {
        const isActive = hoveredSkill === label;
        const href = SKILL_HREF_BY_LABEL[label];
        const revealOrder = revealedTags.indexOf(label);
        const shouldAnimate = isTagAnimationEnabled && revealOrder !== -1;
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
