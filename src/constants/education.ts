import binaryStudioLogoUrl from "../assets/images/companies/binary-studio.webp";
import duetLogoUrl from "../assets/images/companies/duet.webp";
import knuLogoUrl from "../assets/images/companies/knu.webp";
import { EEducation } from "../enums/education";
import { ETranslationKey } from "../i18n/types";
import type { SkillTagLabel } from "./skillTags";

export { EEducation } from "../enums/education";

export type EducationTimelineItem = {
  id: EEducation;
  companyUrl: string;
  companyLogoSrc: string;
  startDate: string;
  endDate: string | null;
  grade?: number;
  technologyTags: SkillTagLabel[];
};

export type EducationTextKeys = {
  institution: ETranslationKey;
  program: ETranslationKey;
};

export const EDUCATION_TEXT_KEYS_BY_ID: Record<EEducation, EducationTextKeys> = {
  [EEducation.Duet]: {
    institution: ETranslationKey.EducationDuetUniversityName,
    program: ETranslationKey.EducationDuetDegree,
  },
  [EEducation.BinaryStudio]: {
    institution: ETranslationKey.EducationBinaryStudioTitle,
    program: ETranslationKey.EducationBinaryStudioProgram,
  },
  [EEducation.Knu]: {
    institution: ETranslationKey.EducationKnuUniversityName,
    program: ETranslationKey.EducationKnuDegree,
  },
};

export const EDUCATION_TIMELINE_ITEMS: EducationTimelineItem[] = [
  {
    id: EEducation.Duet,
    companyUrl: "https://www.duet.edu.ua/",
    companyLogoSrc: duetLogoUrl,
    startDate: "2022-09",
    endDate: "2024-01",
    grade: 5,
    technologyTags: [
      "TypeScript",
      "Webpack",
      "Vite",
      "React",
      "CSS",
      "HTML",
      "Vue.js",
      "GraphQL",
      "Git",
      "MongoDB",
      "Node.js",
      "Express",
      "NPM",
      "MySQL",
      "Flutter",
      "Dart",
      "Heroku",
      "MATLAB",
      "OpenGL",
      "Three.js",
      "Trello",
      "Firebase",
      "WebSockets",
    ],
  },
  {
    id: EEducation.BinaryStudio,
    companyUrl: "https://academy.binary-studio.com/",
    companyLogoSrc: binaryStudioLogoUrl,
    startDate: "2016-07",
    endDate: "2016-09",
    technologyTags: [
      "React",
      "Redux",
      "NPM",
      "CSS",
      "HTML",
      "Git",
      "Node.js",
      "Express",
      "Bootstrap",
      "JQuery",
      "Trello",
    ],
  },
  {
    id: EEducation.Knu,
    companyUrl: "https://www.knu.edu.ua/",
    companyLogoSrc: knuLogoUrl,
    startDate: "2012-09",
    endDate: "2016-06",
    grade: 4.74,
    technologyTags: [
      "C++",
      "MFC",
      "Qt",
      "OpenGL",
      "WebGL",
      "Express",
      "Three.js",
      "Webpack",
      "React",
      "HTML",
      "CSS",
      "MongoDB",
      "NPM",
      "Raphael.js",
      "WebSockets",
      "Trello",
      "Bootstrap",
      "Git",
      "JQuery",
      "MySQL",
      "SQLite",
      "PHP",
      "C#",
      "Windows Forms",
    ],
  },
];
