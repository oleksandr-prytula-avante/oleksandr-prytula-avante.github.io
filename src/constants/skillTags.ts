export const ALL_SKILL_TAGS = [
  { label: "React", href: "https://react.dev", common: true },
  { label: "Angular", href: "https://angular.dev", common: true },
  {
    label: "HTML",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    common: true,
  },
  {
    label: "CSS",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    common: true,
  },
  { label: "Python", href: "https://www.python.org", common: true },
  {
    label: "Django",
    href: "https://www.djangoproject.com",
    common: true,
  },
  { label: "Expo", href: "https://expo.dev", common: true },
  { label: "Node.js", href: "https://nodejs.org", common: true },
  { label: "Express", href: "https://expressjs.com", common: true },
  { label: "Nest.js", href: "https://nestjs.com", common: true },
  { label: "GraphQL", href: "https://graphql.org", common: true },
  { label: "JQuery", href: "https://jquery.com" },
  { label: "Go", href: "https://go.dev", common: true },
  { label: "Gin", href: "https://gin-gonic.com", common: true },
  { label: "Redis", href: "https://redis.io", common: true },
  { label: "RabbitMQ", href: "https://www.rabbitmq.com", common: true },
  { label: "Jest", href: "https://jestjs.io", common: true },
  { label: "JIRA", href: "https://www.atlassian.com/software/jira" },
  { label: "Trello", href: "https://trello.com" },
  { label: "Playwright", href: "https://playwright.dev", common: true },
  { label: "Docker", href: "https://www.docker.com", common: true },
  { label: "AWS", href: "https://aws.amazon.com" },
  { label: "Azure", href: "https://azure.microsoft.com" },
  { label: "Kubernetes", href: "https://kubernetes.io", common: true },
  { label: "SQL", href: "https://en.wikipedia.org/wiki/SQL", common: true },
  { label: "MySQL", href: "https://www.mysql.com" },
  { label: "SQLite", href: "https://www.sqlite.org" },
  { label: "PostrgeSQL", href: "https://www.postgresql.org" },
  { label: "MongoDB", href: "https://www.mongodb.com", common: true },
  {
    label: "CI / CD",
    href: "https://en.wikipedia.org/wiki/CI/CD",
    common: true,
  },
  { label: "Git", href: "https://git-scm.com", common: true },
  { label: "Figma", href: "https://www.figma.com", common: true },
  { label: "Cursor", href: "https://www.cursor.com", common: true },
  { label: "Bash", href: "https://www.gnu.org/software/bash", common: true },
  { label: "WebRTC", href: "https://webrtc.org" },
  {
    label: "WebSockets",
    href: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
  },
  { label: "RxJS", href: "https://rxjs.dev" },
  { label: "Webpack", href: "https://webpack.js.org" },
  { label: "Konva", href: "https://konvajs.org" },
  { label: "MobX", href: "https://mobx.js.org" },
  { label: "Redux-Saga", href: "https://redux-saga.js.org" },
  { label: "Material UI", href: "https://mui.com" },
  { label: "NPM", href: "https://www.npmjs.com" },
  {
    label: "Canvas",
    href: "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API",
  },
  { label: "xAPI", href: "https://xapi.com" },
  {
    label: "SCORM",
    href: "https://en.wikipedia.org/wiki/Sharable_Content_Object_Reference_Model",
  },
  { label: "Swagger", href: "https://swagger.io" },
  { label: "S3", href: "https://aws.amazon.com/s3" },
  { label: "Tesmo", href: "https://www.testmo.com" },
  { label: "coa", href: "https://www.npmjs.com/package/coa" },
  { label: "Bootstrap", href: "https://getbootstrap.com" },
  { label: "Wordpress", href: "https://wordpress.org" },
  { label: "Feathers", href: "https://feathersjs.com" },
  { label: "React Native", href: "https://reactnative.dev" },
  { label: "Redux", href: "https://redux.js.org" },
] as const;

export type SkillTagLabel = (typeof ALL_SKILL_TAGS)[number]["label"];

export const COMMON_SKILL_TAGS: SkillTagLabel[] = ALL_SKILL_TAGS.filter(
  function (skill) {
    return "common" in skill && skill.common;
  },
).map(function ({ label }) {
  return label;
});

export const SKILL_HREF_BY_LABEL = ALL_SKILL_TAGS.reduce(
  function (acc, skill) {
    acc[skill.label] = skill.href;

    return acc;
  },
  {} as Record<string, string>,
);

export const SKILL_HIGHLIGHT_TERMS = Array.from(
  new Set(
    ALL_SKILL_TAGS.map(function ({ label }) {
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
