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
  highlights?: ETranslationKey[];
};

export const EDUCATION_TEXT_KEYS_BY_ID: Record<EEducation, EducationTextKeys> =
  {
    [EEducation.Duet]: {
      institution: ETranslationKey.EducationDuetUniversityName,
      program: ETranslationKey.EducationDuetDegree,
      highlights: [
        ETranslationKey.EducationDuetHighlight1,
        ETranslationKey.EducationDuetHighlight2,
        ETranslationKey.EducationDuetHighlight3,
        ETranslationKey.EducationDuetHighlight4,
        ETranslationKey.EducationDuetHighlight5,
        ETranslationKey.EducationDuetHighlight6,
      ],
    },
    [EEducation.BinaryStudio]: {
      institution: ETranslationKey.EducationBinaryStudioTitle,
      program: ETranslationKey.EducationBinaryStudioProgram,
      highlights: [
        ETranslationKey.EducationBinaryStudioHighlight1,
        ETranslationKey.EducationBinaryStudioHighlight2,
        ETranslationKey.EducationBinaryStudioHighlight3,
        ETranslationKey.EducationBinaryStudioHighlight4,
        ETranslationKey.EducationBinaryStudioHighlight5,
      ],
    },
    [EEducation.Knu]: {
      institution: ETranslationKey.EducationKnuUniversityName,
      program: ETranslationKey.EducationKnuDegree,
      highlights: [
        ETranslationKey.EducationKnuHighlight1,
        ETranslationKey.EducationKnuHighlight2,
        ETranslationKey.EducationKnuHighlight3,
        ETranslationKey.EducationKnuHighlight4,
        ETranslationKey.EducationKnuHighlight5,
        ETranslationKey.EducationKnuHighlight6,
        ETranslationKey.EducationKnuHighlight7,
      ],
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
      "MobX",
      "CSS",
      "HTML",
      "Vue.js",
      "GraphQL",
      "Git",
      "MongoDB",
      "Node.js",
      "Express.js",
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
      "Express.js",
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
      "Express.js",
      "Three.js",
      "Webpack",
      "React",
      "Redux",
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
