import { SKILL_TAGS } from "../../constants/skillTags";
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

  return (
    <ul className="mt-4 flex flex-wrap gap-x-[9.25px] gap-y-[17.25px]">
      {SKILL_TAGS.map(function ({ label, href }, index) {
        const isActive = hoveredSkill === label;

        return (
          <li
            key={label}
            className="tag-reveal"
            style={{
              animationDelay: `${index * TAG_REVEAL_STAGGER_MS}ms`,
              animationDuration: `${TAG_REVEAL_DURATION_MS}ms`,
            }}
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
