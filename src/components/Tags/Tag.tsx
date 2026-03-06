import { ExternalLink } from "../ExternalLink";
import { SKILL_HREF_BY_LABEL } from "../../constants/skillTags";

type TagProps = {
  label: string;
  href?: string;
  isActive?: boolean;
  variant?: "default" | "experience";
  className?: string;
  onSelectSkill: (skill: string) => void;
  onClearSkill: () => void;
};

export function Tag(props: TagProps) {
  const {
    label,
    href,
    isActive = false,
    variant = "default",
    className,
    onSelectSkill,
    onClearSkill,
  } = props;
  const resolvedHref = href ?? SKILL_HREF_BY_LABEL[label];
  const baseClassName =
    variant === "experience"
      ? "rounded-full border px-3 py-1 text-xs normal-case tracking-normal transition-colors duration-200 ease-out"
      : "rounded-full border px-4 py-1.5 text-[14px] uppercase transition-colors duration-200 ease-out";
  const activeClassName =
    variant === "experience"
      ? "border-[color:var(--color-accent)] text-[color:var(--color-accent)]"
      : "border-[color:var(--color-accent)] text-[color:var(--color-accent)]";
  const inactiveClassName =
    variant === "experience"
      ? "border-white/40 text-white/90 hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
      : "border-white/50 text-white hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]";

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
    <ExternalLink
      href={resolvedHref}
      className={`${baseClassName} ${isActive ? activeClassName : inactiveClassName} ${className ?? ""}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      #{label}
    </ExternalLink>
  );
}
