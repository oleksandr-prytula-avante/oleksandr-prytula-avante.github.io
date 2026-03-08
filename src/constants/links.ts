import { ETranslationKey } from "../i18n/types";
import { ELink } from "../enums/links";

export { ELink } from "../enums/links";

type LinkItem = {
  id: ELink;
  href: string;
  labelKey: ETranslationKey;
};

export const LINKS: LinkItem[] = [
  {
    id: ELink.Gmail,
    href: "mailto:oleksandr.prytula.avante@gmail.com",
    labelKey: ETranslationKey.NavEmail,
  },
  {
    id: ELink.Github,
    href: "https://github.com/oleksandr-prytula-avante",
    labelKey: ETranslationKey.NavGithub,
  },
  {
    id: ELink.LinkedIn,
    href: "https://www.linkedin.com/in/oleksandr-prytula-avante",
    labelKey: ETranslationKey.NavLinkedIn,
  },
  {
    id: ELink.LeetCode,
    href: "https://leetcode.com/u/oleksandr-prytula-avante/",
    labelKey: ETranslationKey.NavLeetCode,
  },
];
