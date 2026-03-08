import codeAndCareLogo from "../assets/images/companies/code-and-care.webp";
import digitalsuitsLogo from "../assets/images/companies/digitalsuits.webp";
import lanarsLogo from "../assets/images/companies/lanars.webp";
import omnoraLogo from "../assets/images/companies/omnora.webp";
import { EExperience } from "../enums/experience";
import { ETranslationKey } from "../i18n/types";
import type { SkillTagLabel } from "./skillTags";

export { EExperience } from "../enums/experience";

export type ExperienceTimelineItem = {
  id: EExperience;
  companyUrl: string;
  companyLogoSrc: string;
  startDate: string;
  endDate: string | null;
  technologyTags: SkillTagLabel[];
};

export type ExperienceTextKeys = {
  companyName: ETranslationKey;
  jobTitle: ETranslationKey;
  location: ETranslationKey;
  description: ETranslationKey;
  highlights: ETranslationKey[];
};

export const OMNORA_EXPERIENCE_TEXT_KEYS: ExperienceTextKeys = {
  companyName: ETranslationKey.ExperienceOmnoraCompanyName,
  jobTitle: ETranslationKey.ExperienceOmnoraJobTitle,
  location: ETranslationKey.ExperienceOmnoraLocation,
  description: ETranslationKey.ExperienceOmnoraDescription,
  highlights: [
    ETranslationKey.ExperienceOmnoraHighlight1,
    ETranslationKey.ExperienceOmnoraHighlight2,
    ETranslationKey.ExperienceOmnoraHighlight3,
    ETranslationKey.ExperienceOmnoraHighlight4,
    ETranslationKey.ExperienceOmnoraHighlight5,
    ETranslationKey.ExperienceOmnoraHighlight6,
    ETranslationKey.ExperienceOmnoraHighlight7,
    ETranslationKey.ExperienceOmnoraHighlight8,
    ETranslationKey.ExperienceOmnoraHighlight9,
  ],
};

export const EXPERIENCE_TEXT_KEYS_BY_ID: Record<EExperience, ExperienceTextKeys> = {
  [EExperience.Omnora]: OMNORA_EXPERIENCE_TEXT_KEYS,
  [EExperience.Digitalsuits]: {
    companyName: ETranslationKey.ExperienceDigitalsuitsCompanyName,
    jobTitle: ETranslationKey.ExperienceDigitalsuitsJobTitle,
    location: ETranslationKey.ExperienceDigitalsuitsLocation,
    description: ETranslationKey.ExperienceDigitalsuitsDescription,
    highlights: [
      ETranslationKey.ExperienceDigitalsuitsHighlight1,
      ETranslationKey.ExperienceDigitalsuitsHighlight2,
      ETranslationKey.ExperienceDigitalsuitsHighlight3,
      ETranslationKey.ExperienceDigitalsuitsHighlight4,
      ETranslationKey.ExperienceDigitalsuitsHighlight5,
      ETranslationKey.ExperienceDigitalsuitsHighlight6,
      ETranslationKey.ExperienceDigitalsuitsHighlight7,
      ETranslationKey.ExperienceDigitalsuitsHighlight8,
    ],
  },
  [EExperience.CodeAndCare]: {
    companyName: ETranslationKey.ExperienceCodeAndCareCompanyName,
    jobTitle: ETranslationKey.ExperienceCodeAndCareJobTitle,
    location: ETranslationKey.ExperienceCodeAndCareLocation,
    description: ETranslationKey.ExperienceCodeAndCareDescription,
    highlights: [
      ETranslationKey.ExperienceCodeAndCareHighlight1,
      ETranslationKey.ExperienceCodeAndCareHighlight2,
      ETranslationKey.ExperienceCodeAndCareHighlight3,
      ETranslationKey.ExperienceCodeAndCareHighlight4,
      ETranslationKey.ExperienceCodeAndCareHighlight5,
      ETranslationKey.ExperienceCodeAndCareHighlight6,
    ],
  },
  [EExperience.Lanars]: {
    companyName: ETranslationKey.ExperienceLanarsCompanyName,
    jobTitle: ETranslationKey.ExperienceLanarsJobTitle,
    location: ETranslationKey.ExperienceLanarsLocation,
    description: ETranslationKey.ExperienceLanarsDescription,
    highlights: [
      ETranslationKey.ExperienceLanarsHighlight1,
      ETranslationKey.ExperienceLanarsHighlight2,
      ETranslationKey.ExperienceLanarsHighlight3,
      ETranslationKey.ExperienceLanarsHighlight4,
      ETranslationKey.ExperienceLanarsHighlight5,
      ETranslationKey.ExperienceLanarsHighlight6,
    ],
  },
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
      "WordPress",
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
