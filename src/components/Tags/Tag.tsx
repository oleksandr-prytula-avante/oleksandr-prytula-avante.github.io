import { SKILL_HREF_BY_LABEL } from "../../constants/skillTags";

type TagProps = {
  label: string;
  href?: string;
  isActive?: boolean;
  className?: string;
  onSelectSkill: (skill: string) => void;
  onClearSkill: () => void;
};

export function Tag(props: TagProps) {
  const {
    label,
    href,
    isActive = false,
    className,
    onSelectSkill,
    onClearSkill,
  } = props;
  const resolvedHref = href ?? SKILL_HREF_BY_LABEL[label];

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
      className={`${
        isActive
          ? "rounded-full border border-[color:var(--color-accent)] px-4 py-1.5 text-[14px] uppercase text-[color:var(--color-accent)] transition-colors duration-200 ease-out"
          : "rounded-full border border-white/50 px-4 py-1.5 text-[14px] uppercase text-white transition-colors duration-200 ease-out hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
      } ${className ?? ""}`}
      href={resolvedHref}
      target="_blank"
      rel="noreferrer"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      #{label}
    </a>
  );
}
