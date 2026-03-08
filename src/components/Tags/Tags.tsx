import { useEffect, useState } from "react";

import {
  COMMON_SKILL_TAGS,
  SKILL_HREF_BY_LABEL,
} from "../../constants/skillTags";
import { MIN_ANIMATED_VIEWPORT_MEDIA_QUERY } from "../../constants/mediaQueries";
import { Tag } from "./Tag";

import "./Tags.css";

export const TAG_REVEAL_STAGGER_MS = 140;
export const TAG_REVEAL_DURATION_MS = 640;
type TagsProps = {
  hoveredSkill?: string | null;
  onSkillEnter: (skill: string) => void;
  onSkillLeave: () => void;
};

export function Tags(props: TagsProps) {
  const { hoveredSkill, onSkillEnter, onSkillLeave } = props;
  const [isTagAnimationEnabled, setIsTagAnimationEnabled] = useState(
    function () {
      if (typeof window === "undefined") {
        return true;
      }

      return window.matchMedia(MIN_ANIMATED_VIEWPORT_MEDIA_QUERY).matches;
    },
  );

  useEffect(function () {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(MIN_ANIMATED_VIEWPORT_MEDIA_QUERY);

    function handleViewportChange(event: MediaQueryListEvent) {
      setIsTagAnimationEnabled(event.matches);
    }

    mediaQuery.addEventListener("change", handleViewportChange);

    return function () {
      mediaQuery.removeEventListener("change", handleViewportChange);
    };
  }, []);

  return (
    <ul className="mt-4 flex flex-wrap gap-x-[9.25px] gap-y-[17.25px]">
      {COMMON_SKILL_TAGS.map(function (label, index) {
        const isActive = hoveredSkill === label;
        const href = SKILL_HREF_BY_LABEL[label];

        return (
          <li
            key={label}
            className={isTagAnimationEnabled ? "tag-reveal" : undefined}
            style=
              {isTagAnimationEnabled
                ? {
                    animationDelay: `${index * TAG_REVEAL_STAGGER_MS}ms`,
                    animationDuration: `${TAG_REVEAL_DURATION_MS}ms`,
                  }
                : undefined}
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
