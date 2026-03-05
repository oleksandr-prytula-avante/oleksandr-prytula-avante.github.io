import type { ComponentType } from "react";

import { Tooltip } from "./Tooltip";
import { GmailIcon } from "./icons/GmailIcon";
import { LeetCodeIcon } from "./icons/LeetCodeIcon";
import { LinkedInIcon } from "./icons/LinkedInIcon";
import { GithubIcon } from "./icons/GithubIcon";
import { LINKS } from "../constants/links";
import { useI18n } from "../hooks/useI18n";

const ICON_BY_LINK_ID: Record<string, ComponentType<{ className?: string }>> = {
  github: GithubIcon,
  linkedin: LinkedInIcon,
  leetcode: LeetCodeIcon,
  gmail: GmailIcon,
};

export function Links() {
  const i18n = useI18n();

  return (
    <div className="absolute bottom-12 flex flex-col gap-5">
      {LINKS.map(function ({ id, href, labelKey }) {
        const text = i18n.t(labelKey);
        const IconComponent = ICON_BY_LINK_ID[id];

        return (
          <Tooltip key={href} content={text}>
            <a
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/4 bg-white/2 transition-colors duration-200 ease-out hover:border-[color:var(--color-accent)] hover:bg-white/8"
              href={href}
              aria-label={text}
              target="_blank"
              rel="noreferrer"
            >
              <IconComponent className="h-6 w-6" />
            </a>
          </Tooltip>
        );
      })}
    </div>
  );
}
