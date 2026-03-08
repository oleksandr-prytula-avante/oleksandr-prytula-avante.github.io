import type { ComponentType } from "react";

import { Tooltip } from "./Tooltip";
import { GmailIcon } from "./icons/GmailIcon";
import { LeetCodeIcon } from "./icons/LeetCodeIcon";
import { LinkedInIcon } from "./icons/LinkedInIcon";
import { GithubIcon } from "./icons/GithubIcon";
import { ELink, LINKS } from "../constants/links";
import { useI18n } from "../hooks/useI18n";

const ICON_BY_LINK_ID: Record<ELink, ComponentType<{ className?: string }>> = {
  [ELink.Gmail]: GmailIcon,
  [ELink.Github]: GithubIcon,
  [ELink.LinkedIn]: LinkedInIcon,
  [ELink.LeetCode]: LeetCodeIcon,
};

type LinksProps = {
  className?: string;
  size?: "default" | "large";
};

export function Links({ className, size = "default" }: LinksProps) {
  const i18n = useI18n();
  const isLarge = size === "large";

  return (
    <div className={className ?? "absolute bottom-10 flex flex-col gap-4"}>
      {LINKS.map(function ({ id, href, labelKey }) {
        const text = i18n.t(labelKey);
        const IconComponent = ICON_BY_LINK_ID[id];

        return (
          <Tooltip key={href} content={text}>
            <a
              className={
                isLarge
                  ? "flex h-[3rem] w-[3rem] items-center justify-center rounded-full border border-white/4 bg-white/2 transition-colors duration-200 ease-out hover:border-[color:var(--color-accent)] hover:bg-white/8"
                  : "flex h-10 w-10 items-center justify-center rounded-full border border-white/4 bg-white/2 transition-colors duration-200 ease-out hover:border-[color:var(--color-accent)] hover:bg-white/8"
              }
              href={href}
              aria-label={text}
              target="_blank"
              rel="noreferrer"
            >
              <IconComponent className={isLarge ? "h-8 w-8" : "h-6 w-6"} />
            </a>
          </Tooltip>
        );
      })}
    </div>
  );
}
