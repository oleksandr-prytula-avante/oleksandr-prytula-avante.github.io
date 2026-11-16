import { SKILL_HREF_BY_LABEL } from "../../constants/skillTags";

type TagProps = {
  label: string;
  href?: string;
  isActive?: boolean;
  variant?: "default" | "experience";
  onSelectSkill: (skill: string) => void;
  onClearSkill: () => void;
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
  const baseClassName =
    variant === "experience"
      ? "subtle-border relative my-1 rounded-full border px-3 py-1 text-[0.825rem] uppercase tracking-normal transition-colors duration-200 ease-out"
      : "subtle-border relative rounded-full border px-3 py-1 text-[0.825rem] uppercase tracking-normal transition-colors duration-200 ease-out";

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
