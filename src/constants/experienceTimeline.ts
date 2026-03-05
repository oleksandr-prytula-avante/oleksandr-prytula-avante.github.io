import codeAndCareLogo from "../assets/images/companies/code-and-care.webp";
import digitalsuitsLogo from "../assets/images/companies/digitalsuits.webp";
import lanarsLogo from "../assets/images/companies/lanars.webp";
import omnoraLogo from "../assets/images/companies/omnora.webp";

export type ExperienceTimelineItem = {
  id: string;
  companyUrl: string;
  companyLogoSrc: string;
  startDate: string;
  endDate: string | null;
  technologyTags: string[];
};

export const EXPERIENCE_TIMELINE_ITEMS: ExperienceTimelineItem[] = [
  {
    id: "omnora",
    companyUrl: "https://www.omnora.com/",
    companyLogoSrc: omnoraLogo,
    startDate: "2020-04",
    endDate: null,
    technologyTags: [
      "React",
      "TypeScript",
      "Canvas API",
      "WebRTC",
      "SCORM",
      "xAPI",
      "LMS",
      "AI APIs",
      "Jest",
      "CI/CD",
    ],
  },
  {
    id: "digitalsuits",
    companyUrl: "https://digitalsuits.co/",
    companyLogoSrc: digitalsuitsLogo,
    startDate: "2019-04",
    endDate: "2020-03",
    technologyTags: [
      "React",
      "TypeScript",
      "Node.js",
      "GraphQL",
      "Jest",
      "Playwright",
    ],
  },
  {
    id: "code-and-care",
    companyUrl: "https://code-care.com/",
    companyLogoSrc: codeAndCareLogo,
    startDate: "2017-10",
    endDate: "2019-03",
    technologyTags: ["Angular", "Ionic", "Node.js", "MongoDB", "REST API"],
  },
  {
    id: "lanars",
    companyUrl: "https://lanars.com/",
    companyLogoSrc: lanarsLogo,
    startDate: "2016-10",
    endDate: "2017-09",
    technologyTags: ["JavaScript", "HTML", "CSS", "REST API", "Git"],
  },
];
