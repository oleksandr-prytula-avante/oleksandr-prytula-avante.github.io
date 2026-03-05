export const enum ELocale {
  Ru = "ru",
  En = "en",
  Sp = "sp",
  De = "de",
}

export const enum ETranslationKey {
  LocaleEn = "locale.en",
  LocaleRu = "locale.ru",
  LocaleSp = "locale.sp",
  LocaleDe = "locale.de",

  NavAbout = "nav.about",
  NavExpirience = "nav.expirience",
  NavEducation = "nav.education",
  NavGithub = "nav.github",
  NavLinkedIn = "nav.linkedin",
  NavLeetCode = "nav.leetcode",
  NavEmail = "nav.email",

  HeroHiIm = "hero.hiIm",
  HeroName = "hero.name",
  HeroSurname = "hero.surname",
  HeroRole = "hero.role",
  HeroEngineeringToolkit = "hero.engineeringToolkit",
  HeroNeedMoreDetails = "hero.needMoreDetails",
  HeroCvDownload = "hero.cvDownload",

  AboutParagraph1 = "about.paragraph1",
  AboutParagraph2 = "about.paragraph2",
  AboutParagraph3 = "about.paragraph3",
  AboutParagraph4 = "about.paragraph4",
  AboutParagraph5 = "about.paragraph5",

  EducationDuetUniversityName = "education.duet.universityName",
  EducationDuetDegree = "education.duet.degree",
  EducationKnuUniversityName = "education.knu.universityName",
  EducationKnuDegree = "education.knu.degree",

  ExperiencePresent = "experience.present",
  ExperienceExpandDetails = "experience.expandDetails",
  ExperienceHideDetails = "experience.hideDetails",

  ExperienceOmnoraCompanyName = "experience.omnora.companyName",
  ExperienceOmnoraJobTitle = "experience.omnora.jobTitle",
  ExperienceOmnoraLocation = "experience.omnora.location",
  ExperienceOmnoraDescription = "experience.omnora.description",
  ExperienceOmnoraHighlight1 = "experience.omnora.highlight1",
  ExperienceOmnoraHighlight2 = "experience.omnora.highlight2",
  ExperienceOmnoraHighlight3 = "experience.omnora.highlight3",
  ExperienceOmnoraHighlight4 = "experience.omnora.highlight4",
  ExperienceOmnoraHighlight5 = "experience.omnora.highlight5",
  ExperienceOmnoraHighlight6 = "experience.omnora.highlight6",
  ExperienceOmnoraHighlight7 = "experience.omnora.highlight7",
  ExperienceOmnoraHighlight8 = "experience.omnora.highlight8",
  ExperienceOmnoraHighlight9 = "experience.omnora.highlight9",

  ExperienceDigitalsuitsCompanyName = "experience.digitalsuits.companyName",
  ExperienceDigitalsuitsJobTitle = "experience.digitalsuits.jobTitle",
  ExperienceDigitalsuitsLocation = "experience.digitalsuits.location",
  ExperienceDigitalsuitsDescription = "experience.digitalsuits.description",
  ExperienceDigitalsuitsHighlight1 = "experience.digitalsuits.highlight1",
  ExperienceDigitalsuitsHighlight2 = "experience.digitalsuits.highlight2",

  ExperienceCodeAndCareCompanyName = "experience.codeAndCare.companyName",
  ExperienceCodeAndCareJobTitle = "experience.codeAndCare.jobTitle",
  ExperienceCodeAndCareLocation = "experience.codeAndCare.location",
  ExperienceCodeAndCareDescription = "experience.codeAndCare.description",
  ExperienceCodeAndCareHighlight1 = "experience.codeAndCare.highlight1",
  ExperienceCodeAndCareHighlight2 = "experience.codeAndCare.highlight2",

  ExperienceLanarsCompanyName = "experience.lanars.companyName",
  ExperienceLanarsJobTitle = "experience.lanars.jobTitle",
  ExperienceLanarsLocation = "experience.lanars.location",
  ExperienceLanarsDescription = "experience.lanars.description",
  ExperienceLanarsHighlight1 = "experience.lanars.highlight1",
  ExperienceLanarsHighlight2 = "experience.lanars.highlight2",
}

export const LOCALE_LABEL_KEYS: Record<ELocale, ETranslationKey> = {
  [ELocale.En]: ETranslationKey.LocaleEn,
  [ELocale.Ru]: ETranslationKey.LocaleRu,
  [ELocale.Sp]: ETranslationKey.LocaleSp,
  [ELocale.De]: ETranslationKey.LocaleDe,
};

export type Translations = Record<ETranslationKey, string>;
