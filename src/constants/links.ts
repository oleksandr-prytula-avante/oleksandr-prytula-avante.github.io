import { ETranslationKey } from "../i18n/types";

export const LINKS = [
  {
    id: "github",
    href: "https://github.com/oleksandr-prytula-avante",
    labelKey: ETranslationKey.NavGithub,
  },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/oleksandr-prytula-avante",
    labelKey: ETranslationKey.NavLinkedIn,
  },
  {
    id: "leetcode",
    href: "https://leetcode.com/u/oleksandr-prytula-avante/",
    labelKey: ETranslationKey.NavLeetCode,
  },
  {
    id: "gmail",
    href: "mailto:oleksandr.prytula.avante@gmail.com",
    labelKey: ETranslationKey.NavEmail,
  },
] as const;
