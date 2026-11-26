import { ELocale } from "../enums/i18n";

export const SITE_URL = "https://opryavante.dev/";
export const SOCIAL_IMAGE_URL = `${SITE_URL}assets/images/social-card.png`;

export const SEO_BY_LOCALE: Record<
  ELocale,
  { title: string; description: string }
> = {
  [ELocale.En]: {
    title: "Oleksandr Prytula — Full-Stack Software Engineer",
    description:
      "Portfolio and résumé of Oleksandr Prytula, a full-stack software engineer focused on scalable web products, architecture, and engineering quality.",
  },
  [ELocale.De]: {
    title: "Oleksandr Prytula — Full-Stack-Softwareentwickler",
    description:
      "Portfolio und Lebenslauf von Oleksandr Prytula, Full-Stack-Softwareentwickler für skalierbare Webprodukte, Architektur und Softwarequalität.",
  },
  [ELocale.Ru]: {
    title: "Александр Притула — Full-Stack разработчик",
    description:
      "Портфолио и резюме Александра Притулы: масштабируемые веб-продукты, архитектура и качество разработки.",
  },
  [ELocale.Sp]: {
    title: "Oleksandr Prytula — Ingeniero de software full-stack",
    description:
      "Portafolio y currículum de Oleksandr Prytula, ingeniero full-stack especializado en productos web escalables, arquitectura y calidad.",
  },
};
