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
  const autoScrollTimeoutRef = useRef<number | null>(null);
  const nextRowRevealTimeoutRef = useRef<number | null>(null);
  const revealDelayByLabelRef = useRef(new Map<string, number>());
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

      const tagsContainer = tagsList;

      function getTagElements() {
        return Array.from(
          tagsContainer.querySelectorAll<HTMLElement>("[data-tag-label]"),
        );
      }

      function isScrollable() {
        return (
          tagsContainer.scrollHeight > tagsContainer.clientHeight + 1 &&
          window.getComputedStyle(tagsContainer).overflowY !== "visible"
        );
      }

      function sortTagElements(tagElements: HTMLElement[]) {
        return [...tagElements].sort(function (leftElement, rightElement) {
          const topDifference = leftElement.offsetTop - rightElement.offsetTop;

          if (topDifference !== 0) {
            return topDifference;
          }

          return (
            (COMMON_SKILL_TAG_ORDER.get(leftElement.dataset.tagLabel ?? "") ??
              0) -
            (COMMON_SKILL_TAG_ORDER.get(rightElement.dataset.tagLabel ?? "") ??
              0)
          );
        });
      }

      function revealTagRow(tagElements: HTMLElement[]) {
        const unrevealedElements = sortTagElements(tagElements).filter(
          function (tagElement) {
            const label = tagElement.dataset.tagLabel;

            if (!label) {
              return false;
            }

            return !revealedTagsRef.current.includes(label);
          },
        );

        if (unrevealedElements.length === 0) {
          return;
        }

        const newlyRevealedLabels = unrevealedElements
          .map(function (tagElement) {
            return tagElement.dataset.tagLabel;
          })
          .filter(function (label): label is string {
            return Boolean(label);
          });

        newlyRevealedLabels.forEach(function (label, index) {
          revealDelayByLabelRef.current.set(
            label,
            index * TAG_REVEAL_STAGGER_MS,
          );
        });

        const nextTags = [...revealedTagsRef.current, ...newlyRevealedLabels];
        revealedTagsRef.current = nextTags;
        setRevealedTags(nextTags);

        if (!isScrollable()) {
          return;
        }

        if (autoScrollTimeoutRef.current !== null) {
          window.clearTimeout(autoScrollTimeoutRef.current);
        }

        if (nextRowRevealTimeoutRef.current !== null) {
          window.clearTimeout(nextRowRevealTimeoutRef.current);
        }

        const revealDelay =
          TAG_REVEAL_DURATION_MS +
          Math.max(0, newlyRevealedLabels.length - 1) * TAG_REVEAL_STAGGER_MS +
          80;

        autoScrollTimeoutRef.current = window.setTimeout(function () {
          const nextLabel = COMMON_SKILL_TAGS.find(function (label) {
            return !revealedTagsRef.current.includes(label);
          });

          if (!nextLabel) {
            return;
          }

          const nextTag = getTagElements().find(function (tagElement) {
            return tagElement.dataset.tagLabel === nextLabel;
          });

          if (!nextTag) {
            return;
          }

          const maxScrollTop = Math.max(
            0,
            tagsContainer.scrollHeight - tagsContainer.clientHeight,
          );
          const targetScrollTop = Math.min(
            maxScrollTop,
            Math.max(
              tagsContainer.scrollTop + TAG_SCROLL_BOTTOM_INSET_PX,
              nextTag.offsetTop - TAG_SCROLL_BOTTOM_INSET_PX,
            ),
          );

          if (targetScrollTop > tagsContainer.scrollTop + 1) {
            tagsContainer.scrollTo({
              top: targetScrollTop,
              behavior: "smooth",
            });
          }

          nextRowRevealTimeoutRef.current = window.setTimeout(function () {
            const nextRowElements = getTagElements().filter(
              function (tagElement) {
                return (
                  Math.abs(tagElement.offsetTop - nextTag.offsetTop) <= 1 &&
                  !revealedTagsRef.current.includes(
                    tagElement.dataset.tagLabel ?? "",
                  )
                );
              },
            );

            revealTagRow(nextRowElements);
          }, 220);
        }, revealDelay);
      }

      const observer = new IntersectionObserver(
        function (entries) {
          const visibleTagElements = entries
            .filter(function (entry) {
              return entry.isIntersecting;
            })
            .map(function (entry) {
              return entry.target as HTMLElement;
            })
            .filter(function (tagElement) {
              const label = tagElement.dataset.tagLabel;

              if (!label) {
                return false;
              }

              return !revealedTagsRef.current.includes(label);
            });

          if (visibleTagElements.length === 0) {
            return;
          }

          if (!isScrollable()) {
            revealTagRow(visibleTagElements);
            return;
          }

          const firstRowTop = Math.min.apply(
            null,
            visibleTagElements.map(function (tagElement) {
              return tagElement.offsetTop;
            }),
          );

          revealTagRow(
            visibleTagElements.filter(function (tagElement) {
              return Math.abs(tagElement.offsetTop - firstRowTop) <= 1;
            }),
          );
        },
        { root: tagsContainer, threshold: 0.01 },
      );

      tagsList
        .querySelectorAll<HTMLElement>("[data-tag-label]")
        .forEach(function (tagElement) {
          observer.observe(tagElement);
        });

      return function () {
        observer.disconnect();
        if (autoScrollTimeoutRef.current !== null) {
          window.clearTimeout(autoScrollTimeoutRef.current);
          autoScrollTimeoutRef.current = null;
        }

        if (nextRowRevealTimeoutRef.current !== null) {
          window.clearTimeout(nextRowRevealTimeoutRef.current);
          nextRowRevealTimeoutRef.current = null;
        }

        revealDelayByLabelRef.current.clear();
      };
    },
    [isTagAnimationEnabled],
  );

  return (
    <ul ref={tagsListRef} className="skill-tags">
      {COMMON_SKILL_TAGS.map(function (label) {
        const isActive = hoveredSkill === label;
        const href = SKILL_HREF_BY_LABEL[label];
        const shouldAnimate =
          isTagAnimationEnabled && revealedTags.includes(label);
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
                    animationDelay: `${revealDelayByLabelRef.current.get(label) ?? 0}ms`,
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
