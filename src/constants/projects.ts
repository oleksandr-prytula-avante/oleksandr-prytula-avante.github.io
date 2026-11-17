import { COMPANY_LOGO_PATHS, PROJECT_SCREENSHOT_PATHS } from "./assets";
import type { TimelineDataItem } from "../components/Timeline/types";
import { ETranslationKey } from "../i18n/types";
import { OMNORA_TECHNOLOGY_TAGS } from "./experience";

type ProjectScreenshot = {
  src: string;
  captionKey: ETranslationKey;
  width: number;
  height: number;
};

export type ProjectTimelineItem = TimelineDataItem & {
  categoryKey: ETranslationKey;
  screenshots: ProjectScreenshot[];
};

export const PROJECT_TIMELINE_ITEMS: ProjectTimelineItem[] = [
  {
    id: "project-omnora-authoring",
    companyUrl: "https://app.omnora.com/",
    companyLogoSrc: COMPANY_LOGO_PATHS.omnora,
    technologyTags: OMNORA_TECHNOLOGY_TAGS,
    textKeys: {
      name: ETranslationKey.ProjectsOmnoraName,
      highlights: [],
    },
    categoryKey: ETranslationKey.ProjectsOmnoraCategory,
    screenshots: [
      {
        src: PROJECT_SCREENSHOT_PATHS.login,
        captionKey: ETranslationKey.ProjectsOmnoraLogin,
        width: 3448,
        height: 1822,
      },
      {
        src: PROJECT_SCREENSHOT_PATHS.authoringHome,
        captionKey: ETranslationKey.ProjectsOmnoraAuthoringHome,
        width: 3456,
        height: 1820,
      },
      {
        src: PROJECT_SCREENSHOT_PATHS.videoHub,
        captionKey: ETranslationKey.ProjectsOmnoraVideoHub,
        width: 3456,
        height: 1820,
      },
      {
        src: PROJECT_SCREENSHOT_PATHS.interviews,
        captionKey: ETranslationKey.ProjectsOmnoraInterviews,
        width: 3454,
        height: 1818,
      },
      {
        src: PROJECT_SCREENSHOT_PATHS.recycleBin,
        captionKey: ETranslationKey.ProjectsOmnoraRecycleBin,
        width: 3456,
        height: 1820,
      },
      {
        src: PROJECT_SCREENSHOT_PATHS.mediaLibrary,
        captionKey: ETranslationKey.ProjectsOmnoraMediaLibrary,
        width: 3456,
        height: 1816,
      },
      {
        src: PROJECT_SCREENSHOT_PATHS.screenRecorder,
        captionKey: ETranslationKey.ProjectsOmnoraScreenRecorder,
        width: 3456,
        height: 1814,
      },
      {
        src: PROJECT_SCREENSHOT_PATHS.videoRecorderBackground,
        captionKey: ETranslationKey.ProjectsOmnoraVideoRecorderBackground,
        width: 3446,
        height: 1820,
      },
      {
        src: PROJECT_SCREENSHOT_PATHS.slidesAvatarUpload,
        captionKey: ETranslationKey.ProjectsOmnoraSlidesAvatarUpload,
        width: 3456,
        height: 1822,
      },
      {
        src: PROJECT_SCREENSHOT_PATHS.videoRecorderSettings,
        captionKey: ETranslationKey.ProjectsOmnoraVideoRecorderSettings,
        width: 3454,
        height: 1814,
      },
      {
        src: PROJECT_SCREENSHOT_PATHS.interviewWelcome,
        captionKey: ETranslationKey.ProjectsOmnoraInterviewWelcome,
        width: 3456,
        height: 1830,
      },
      {
        src: PROJECT_SCREENSHOT_PATHS.accountSettings,
        captionKey: ETranslationKey.ProjectsOmnoraAccountSettings,
        width: 3450,
        height: 1812,
      },
      {
        src: PROJECT_SCREENSHOT_PATHS.notifications,
        captionKey: ETranslationKey.ProjectsOmnoraNotifications,
        width: 3456,
        height: 1816,
      },
      {
        src: PROJECT_SCREENSHOT_PATHS.brandKit,
        captionKey: ETranslationKey.ProjectsOmnoraBrandKit,
        width: 3454,
        height: 1814,
      },
      {
        src: PROJECT_SCREENSHOT_PATHS.videoEditor,
        captionKey: ETranslationKey.ProjectsOmnoraVideoEditor,
        width: 3440,
        height: 1794,
      },
      {
        src: PROJECT_SCREENSHOT_PATHS.avatarSelection,
        captionKey: ETranslationKey.ProjectsOmnoraAvatarSelection,
        width: 3456,
        height: 1818,
      },
      {
        src: PROJECT_SCREENSHOT_PATHS.sceneLayouts,
        captionKey: ETranslationKey.ProjectsOmnoraSceneLayouts,
        width: 3456,
        height: 1802,
      },
      {
        src: PROJECT_SCREENSHOT_PATHS.aiQuiz,
        captionKey: ETranslationKey.ProjectsOmnoraAiQuiz,
        width: 3454,
        height: 1812,
      },
      {
        src: PROJECT_SCREENSHOT_PATHS.quiz,
        captionKey: ETranslationKey.ProjectsOmnoraQuiz,
        width: 3456,
        height: 1814,
      },
      {
        src: PROJECT_SCREENSHOT_PATHS.slideEditing,
        captionKey: ETranslationKey.ProjectsOmnoraSlideEditing,
        width: 3456,
        height: 1788,
      },
      {
        src: PROJECT_SCREENSHOT_PATHS.videoPlayer,
        captionKey: ETranslationKey.ProjectsOmnoraVideoPlayer,
        width: 3452,
        height: 1822,
      },
      {
        src: PROJECT_SCREENSHOT_PATHS.playerControls,
        captionKey: ETranslationKey.ProjectsOmnoraPlayerControls,
        width: 3452,
        height: 1812,
      },
      {
        src: PROJECT_SCREENSHOT_PATHS.lmsSettings,
        captionKey: ETranslationKey.ProjectsOmnoraLmsSettings,
        width: 3456,
        height: 1820,
      },
      {
        src: PROJECT_SCREENSHOT_PATHS.securityProfiles,
        captionKey: ETranslationKey.ProjectsOmnoraSecurityProfiles,
        width: 3452,
        height: 1816,
      },
    ],
  },
];
