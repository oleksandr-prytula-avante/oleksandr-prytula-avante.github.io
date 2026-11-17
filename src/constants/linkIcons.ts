import type { ComponentType } from "react";

import { GithubIcon } from "../components/icons/GithubIcon";
import { GmailIcon } from "../components/icons/GmailIcon";
import { LeetCodeIcon } from "../components/icons/LeetCodeIcon";
import { LinkedInIcon } from "../components/icons/LinkedInIcon";
import { ELink } from "../enums/links";

export const LINK_ICON_BY_ID: Record<
  ELink,
  ComponentType<{ isLarge?: boolean }>
> = {
  [ELink.Gmail]: GmailIcon,
  [ELink.Github]: GithubIcon,
  [ELink.LinkedIn]: LinkedInIcon,
  [ELink.LeetCode]: LeetCodeIcon,
};
