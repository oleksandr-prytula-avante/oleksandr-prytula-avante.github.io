import binaryStudioLogoUrl from "../assets/images/companies/binary-studio.webp";
import duetLogoUrl from "../assets/images/companies/duet.webp";
import knuLogoUrl from "../assets/images/companies/knu.webp";
import { EEducation } from "../enums/education";
import { ETranslationKey } from "../i18n/types";

export { EEducation } from "../enums/education";

export type EducationTimelineItem = {
  id: EEducation;
  companyUrl: string;
  companyLogoSrc: string;
  startDate: string;
  endDate: string | null;
  grade?: number;
  technologyTags: string[];
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
      "CSS",
      "GraphQL",
      "Git",
      "HTML",
      "MongoDB",
      "Node.js",
      "React",
      "SQL",
      "Typescript",
      "Dart",
      "Express.js",
      "Flutter",
      "Heroku",
      "JSON",
      "MATLAB",
      "MobX",
      "npm",
      "OOP",
      "Trello",
      "Vue.js",
      "Webpack",
    ],
  },
  {
    id: EEducation.BinaryStudio,
    companyUrl: "https://academy.binary-studio.com/",
    companyLogoSrc: binaryStudioLogoUrl,
    startDate: "2016-07",
    endDate: "2016-09",
    technologyTags: [
      "CSS",
      "Git",
      "HTML",
      "Node.js",
      "React",
      "Bootstrap",
      "JQuery",
      "JSON",
      "npm",
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
      "Express",
      "HTML",
      "MongoDB",
      "React",
      "Bootstrap",
      "CSS3",
      "Git",
      "JQuery",
      "MySQL",
      "npm",
      "OOP",
      "Raphael",
      "Three.js",
      "Trello",
      "Webpack",
    ],
  },
];
