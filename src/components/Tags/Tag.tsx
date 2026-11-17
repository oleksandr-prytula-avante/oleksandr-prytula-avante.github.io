import { SKILL_HREF_BY_LABEL } from "../../constants/skillTags";
import type { SkillInteractionProps } from "../types/skills";

type TagProps = {
  label: string;
  href?: string;
  isActive?: boolean;
  variant?: "default" | "experience";
  onSelectSkill: SkillInteractionProps["onSkillEnter"];
  onClearSkill: SkillInteractionProps["onSkillLeave"];
};

export function Tag(props: TagProps) {
  const {
    label,
    href,
    isActive = false,
    variant = "default",
    onSelectSkill,
    onClearSkill,
  } = props;
  const resolvedHref = href ?? SKILL_HREF_BY_LABEL[label];
  const baseClassName = [
    "subtle-border relative rounded-full border px-3 py-1 text-[13px] uppercase tracking-normal transition-colors duration-200 ease-out",
    variant === "experience" ? "my-1" : "",
  ]
    .filter(Boolean)
    .join(" ");

  function handleClick() {
    onSelectSkill(label);
  }

  function handleMouseEnter() {
    onSelectSkill(label);
  }

  function handleMouseLeave() {
    onClearSkill();
  }

  return (
    <a
      href={resolvedHref}
      target="_blank"
      rel="noreferrer"
      className={`${baseClassName} control-label skill-tag`}
      data-active={isActive}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      #{label}
    </a>
  );
}
