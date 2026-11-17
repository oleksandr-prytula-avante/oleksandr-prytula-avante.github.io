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
  const revealSequenceTimeoutRef = useRef<number | null>(null);
  const isRevealSequenceRunningRef = useRef(false);
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

      if (!tagsList) {
        return;
      }

      const tagsContainer = tagsList;

      if (typeof IntersectionObserver === "undefined") {
        revealedTagsRef.current = [...COMMON_SKILL_TAGS];
        setRevealedTags(revealedTagsRef.current);
        return;
      }

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

      function getRowElements(rowTop: number) {
        return sortTagElements(
          getTagElements().filter(function (tagElement) {
            return Math.abs(tagElement.offsetTop - rowTop) <= 1;
          }),
        );
      }

      function getNextUnrevealedElement() {
        return getTagElements().find(function (tagElement) {
          return !revealedTagsRef.current.includes(
            tagElement.dataset.tagLabel ?? "",
          );
        });
      }

      function finishRow(rowTop: number) {
        const nextTag = getNextUnrevealedElement();

        if (!nextTag) {
          isRevealSequenceRunningRef.current = false;
          return;
        }

        const nextRowTop = nextTag.offsetTop;
        const nextRowElements = getRowElements(nextRowTop);
        const nextRowBottom = nextRowElements.reduce(function (
          bottom,
          tagElement,
        ) {
          return Math.max(
            bottom,
            tagElement.offsetTop + tagElement.offsetHeight,
          );
        }, nextRowTop);
        const visibleBottom =
          tagsContainer.scrollTop +
          tagsContainer.clientHeight -
          TAG_SCROLL_BOTTOM_INSET_PX;
        const shouldScroll = isScrollable() && nextRowBottom > visibleBottom;

        if (shouldScroll) {
          const maxScrollTop = Math.max(
            0,
            tagsContainer.scrollHeight - tagsContainer.clientHeight,
          );
          const rowDistance = Math.max(
            TAG_SCROLL_BOTTOM_INSET_PX,
            nextRowTop - rowTop,
          );
          const targetScrollTop = Math.min(
            maxScrollTop,
            tagsContainer.scrollTop + rowDistance,
          );

          if (targetScrollTop > tagsContainer.scrollTop + 1) {
            tagsContainer.scrollTo({
              top: targetScrollTop,
              behavior: "smooth",
            });
          }
        }

        revealSequenceTimeoutRef.current = window.setTimeout(
          function () {
            revealNextTagInRow(nextRowTop);
          },
          shouldScroll ? 140 : TAG_REVEAL_STAGGER_MS,
        );
      }

      function revealNextTagInRow(rowTop: number) {
        const nextTag = getRowElements(rowTop).find(function (tagElement) {
          return !revealedTagsRef.current.includes(
            tagElement.dataset.tagLabel ?? "",
          );
        });

        if (!nextTag) {
          finishRow(rowTop);
          return;
        }

        const label = nextTag.dataset.tagLabel;

        if (!label) {
          finishRow(rowTop);
          return;
        }

        const nextTags = [...revealedTagsRef.current, label];
        revealedTagsRef.current = nextTags;
        setRevealedTags(nextTags);

        revealSequenceTimeoutRef.current = window.setTimeout(function () {
          revealNextTagInRow(rowTop);
        }, TAG_REVEAL_STAGGER_MS);
      }

      function startRowReveal(rowTop: number) {
        if (isRevealSequenceRunningRef.current) {
          return;
        }

        isRevealSequenceRunningRef.current = true;
        revealNextTagInRow(rowTop);
      }

      const observer = new IntersectionObserver(
        function (entries) {
          if (isRevealSequenceRunningRef.current) {
            return;
          }

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

          const firstRowTop = Math.min.apply(
            null,
            visibleTagElements.map(function (tagElement) {
              return tagElement.offsetTop;
            }),
          );

          startRowReveal(firstRowTop);
        },
        { root: tagsContainer, threshold: 0.01 },
      );

      getTagElements().forEach(function (tagElement) {
        observer.observe(tagElement);
      });

      return function () {
        observer.disconnect();

        if (revealSequenceTimeoutRef.current !== null) {
          window.clearTimeout(revealSequenceTimeoutRef.current);
          revealSequenceTimeoutRef.current = null;
        }

        isRevealSequenceRunningRef.current = false;
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
