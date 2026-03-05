import type { MouseEvent } from "react";

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
  const { label, href, isActive = false, onSelectSkill, onClearSkill } = props;
  const resolvedHref = href ?? SKILL_HREF_BY_LABEL[label];

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!onSelectSkill) {
      return;
    }

    event.preventDefault();
    onSelectSkill(label);
  }

  function handleMouseEnter(event: MouseEvent<HTMLAnchorElement>) {
    if (!onSelectSkill) {
      return;
    }

    event.preventDefault();
    onSelectSkill(label);
  }

  function handleMouseLeave(event: MouseEvent<HTMLAnchorElement>) {
    if (!onClearSkill) {
      return;
    }

    event.preventDefault();
    onClearSkill();
  }

  return (
    <a
      className={
        isActive
          ? "rounded-full border border-[color:var(--color-accent)] px-4 py-1.5 text-[14px] uppercase text-[color:var(--color-accent)] transition-colors duration-200 ease-out"
          : "rounded-full border border-white/50 px-4 py-1.5 text-[14px] uppercase text-white transition-colors duration-200 ease-out hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
      }
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
