import codeAndCareLogo from "../assets/images/companies/code-and-care.webp";
import digitalsuitsLogo from "../assets/images/companies/digitalsuits.webp";
import lanarsLogo from "../assets/images/companies/lanars.webp";
import omnoraLogo from "../assets/images/companies/omnora.webp";
import type { SkillTagLabel } from "./skillTags";

export enum EExperience {
  Omnora = "omnora",
  Digitalsuits = "digitalsuits",
  CodeAndCare = "code-and-care",
  Lanars = "lanars",
}

export type ExperienceTimelineItem = {
  id: EExperience;
  companyUrl: string;
  companyLogoSrc: string;
  startDate: string;
  endDate: string | null;
  technologyTags: SkillTagLabel[];
};

export const EXPERIENCE_TIMELINE_ITEMS: ExperienceTimelineItem[] = [
  {
    id: EExperience.Omnora,
    companyUrl: "https://www.omnora.com/",
    companyLogoSrc: omnoraLogo,
    startDate: "2020-04",
    endDate: null,
    technologyTags: [
      "RxJS",
      "Figma",
      "WebRTC",
      "Webpack",
      "WebSockets",
      "Konva",
      "MobX",
      "Cursor",
      "NPM",
      "React",
      "Material UI",
      "HTML",
      "CSS",
      "Docker",
      "Azure",
      "Git",
      "Bash",
      "Node.js",
      "Express",
      "Playwright",
      "Jest",
      "JIRA",
      "CI / CD",
      "Canvas",
      "xAPI",
      "SCORM",
      "Swagger",
      "S3",
      "Tesmo",
    ],
  },
  {
    id: EExperience.Digitalsuits,
    companyUrl: "https://digitalsuits.co/",
    companyLogoSrc: digitalsuitsLogo,
    startDate: "2019-04",
    endDate: "2020-03",
    technologyTags: [
      "HTML",
      "CSS",
      "Docker",
      "Bash",
      "Azure",
      "Git",
      "Webpack",
      "NPM",
      "MongoDB",
      "React",
      "Redux-Saga",
      "Figma",
      "JIRA",
      "Swagger",
    ],
  },
  {
    id: EExperience.CodeAndCare,
    companyUrl: "https://code-care.com/",
    companyLogoSrc: codeAndCareLogo,
    startDate: "2017-10",
    endDate: "2019-03",
    technologyTags: [
      "Docker",
      "Bash",
      "Webpack",
      "Bootstrap",
      "Expo",
      "Redux",
      "React Native",
      "Express",
      "coa",
      "NPM",
      "Git",
      "MongoDB",
      "Swagger",
      "Trello",
    ],
  },
  {
    id: EExperience.Lanars,
    companyUrl: "https://lanars.com/",
    companyLogoSrc: lanarsLogo,
    startDate: "2016-10",
    endDate: "2017-09",
    technologyTags: [
      "Swagger",
      "Bash",
      "Angular",
      "React",
      "JQuery",
      "Redux",
      "Webpack",
      "Bootstrap",
      "JIRA",
      "MySQL",
      "Wordpress",
      "AWS",
      "Trello",
      "Node.js",
      "Express",
      "Feathers",
      "Git",
      "NPM",
      "CSS",
      "HTML",
    ],
  },
];
