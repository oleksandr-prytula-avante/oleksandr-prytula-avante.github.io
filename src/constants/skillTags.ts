export const SKILL_TAGS = [
  { label: "React", href: "https://react.dev" },
  { label: "Angular", href: "https://angular.dev" },
  { label: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { label: "CSS", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { label: "Python", href: "https://www.python.org" },
  { label: "Django", href: "https://www.djangoproject.com" },
  { label: "Node.js", href: "https://nodejs.org" },
  { label: "Express", href: "https://expressjs.com" },
  { label: "Nest.js", href: "https://nestjs.com" },
  { label: "GraphQL", href: "https://graphql.org" },
  { label: "Go", href: "https://go.dev" },
  { label: "Gin", href: "https://gin-gonic.com" },
  { label: "Docker", href: "https://www.docker.com" },
  { label: "Kubernetes", href: "https://kubernetes.io" },
  { label: "Redis", href: "https://redis.io" },
  { label: "RabbitMQ", href: "https://www.rabbitmq.com" },
  { label: "Jest", href: "https://jestjs.io" },
  { label: "Playwright", href: "https://playwright.dev" },
  { label: "MySQL", href: "https://www.mysql.com" },
  { label: "MongoDB", href: "https://www.mongodb.com" },
  { label: "CI / CD", href: "https://en.wikipedia.org/wiki/CI/CD" },
  { label: "Git", href: "https://git-scm.com" },
] as const;

export const SKILL_HREF_BY_LABEL = SKILL_TAGS.reduce(
  function (acc, skill) {
    acc[skill.label] = skill.href;

    return acc;
  },
  {} as Record<string, string>,
);

export const SKILL_HIGHLIGHT_TERMS = Array.from(
  new Set(
    SKILL_TAGS.map(function ({ label }) {
      return label;
    }),
  ),
);

export const TERM_TO_TAG_MAP = new Map(
  SKILL_HIGHLIGHT_TERMS.map(function (term) {
    return [term.toLowerCase(), term];
  }),
);

export const SKILL_REGEX = new RegExp(
  `(?<![\\p{L}\\p{N}])(${SKILL_HIGHLIGHT_TERMS.map(function (term) {
    return term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  })
    .sort(function (left, right) {
      return right.length - left.length;
    })
    .join("|")})(?![\\p{L}\\p{N}])`,
  "giu",
);
