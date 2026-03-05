import codeAndCareLogo from "../assets/images/companies/code-and-care.webp";
import digitalsuitsLogo from "../assets/images/companies/digitalsuits.webp";
import lanarsLogo from "../assets/images/companies/lanars.webp";
import omnoraLogo from "../assets/images/companies/omnora.webp";

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
  technologyTags: string[];
};

export const EXPERIENCE_TIMELINE_ITEMS: ExperienceTimelineItem[] = [
  {
    id: EExperience.Omnora,
    companyUrl: "https://www.omnora.com/",
    companyLogoSrc: omnoraLogo,
    startDate: "2020-04",
    endDate: null,
    technologyTags: [],
  },
  {
    id: EExperience.Digitalsuits,
    companyUrl: "https://digitalsuits.co/",
    companyLogoSrc: digitalsuitsLogo,
    startDate: "2019-04",
    endDate: "2020-03",
    technologyTags: [],
  },
  {
    id: EExperience.CodeAndCare,
    companyUrl: "https://code-care.com/",
    companyLogoSrc: codeAndCareLogo,
    startDate: "2017-10",
    endDate: "2019-03",
    technologyTags: [],
  },
  {
    id: EExperience.Lanars,
    companyUrl: "https://lanars.com/",
    companyLogoSrc: lanarsLogo,
    startDate: "2016-10",
    endDate: "2017-09",
    technologyTags: [],
  },
];
