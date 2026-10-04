import omnoraLogo from "../assets/images/companies/omnora.webp";
import notifications from "../assets/images/projects/omnora-authoring/notifications.webp";
import screenRecorder from "../assets/images/projects/omnora-authoring/screen-recorder.webp";
import videoRecorderSettings from "../assets/images/projects/omnora-authoring/video-recorder-settings.webp";
import accountSettings from "../assets/images/projects/omnora-authoring/account-settings.webp";
import quiz from "../assets/images/projects/omnora-authoring/quiz.webp";
import recycleBin from "../assets/images/projects/omnora-authoring/recycle-bin.webp";
import videoRecorderBackground from "../assets/images/projects/omnora-authoring/video-recorder-background.webp";
import authoringHome from "../assets/images/projects/omnora-authoring/authoring-home.webp";
import slidesAvatarUpload from "../assets/images/projects/omnora-authoring/slides-avatar-upload.webp";
import videoPlayer from "../assets/images/projects/omnora-authoring/video-player.webp";
import videoEditor from "../assets/images/projects/omnora-authoring/video-editor.webp";
import sceneLayouts from "../assets/images/projects/omnora-authoring/scene-layouts.webp";
import mediaLibrary from "../assets/images/projects/omnora-authoring/media-library.webp";
import videoHub from "../assets/images/projects/omnora-authoring/videohub.webp";
import login from "../assets/images/projects/omnora-authoring/login.webp";
import lmsSettings from "../assets/images/projects/omnora-authoring/lms-settings.webp";
import interviews from "../assets/images/projects/omnora-authoring/interviews.webp";
import brandKit from "../assets/images/projects/omnora-authoring/brand-kit.webp";
import interviewWelcome from "../assets/images/projects/omnora-authoring/interview-welcome.webp";
import aiQuiz from "../assets/images/projects/omnora-authoring/ai-quiz.webp";
import playerControls from "../assets/images/projects/omnora-authoring/player-controls.webp";
import securityProfiles from "../assets/images/projects/omnora-authoring/security-profiles.webp";
import avatarSelection from "../assets/images/projects/omnora-authoring/avatar-selection.webp";
import type { TimelineDataItem } from "../components/Timeline/TimelineItem";
import { ETranslationKey } from "../i18n/types";
import { OMNORA_TECHNOLOGY_TAGS } from "./experience";

type ProjectScreenshot = {
  src: string;
  captionKey: ETranslationKey;
  width: number;
  height: number;
};

export type ProjectTimelineItem = TimelineDataItem & {
  textKeys: {
    name: ETranslationKey;
    highlights: ETranslationKey[];
  };
  categoryKey: ETranslationKey;
  screenshots: ProjectScreenshot[];
};

export const PROJECT_TIMELINE_ITEMS: ProjectTimelineItem[] = [
  {
    id: "project-omnora-authoring",
    companyUrl: "https://app.omnora.com/",
    companyLogoSrc: omnoraLogo,
    technologyTags: OMNORA_TECHNOLOGY_TAGS,
    textKeys: {
      name: ETranslationKey.ProjectsOmnoraName,
      highlights: [],
    },
    categoryKey: ETranslationKey.ProjectsOmnoraCategory,
    screenshots: [
      {
        src: login,
        captionKey: ETranslationKey.ProjectsOmnoraLogin,
        width: 3448,
        height: 1822,
      },
      {
        src: authoringHome,
        captionKey: ETranslationKey.ProjectsOmnoraAuthoringHome,
        width: 3456,
        height: 1820,
      },
      {
        src: videoHub,
        captionKey: ETranslationKey.ProjectsOmnoraVideoHub,
        width: 3456,
        height: 1820,
      },
      {
        src: interviews,
        captionKey: ETranslationKey.ProjectsOmnoraInterviews,
        width: 3454,
        height: 1818,
      },
      {
        src: recycleBin,
        captionKey: ETranslationKey.ProjectsOmnoraRecycleBin,
        width: 3456,
        height: 1820,
      },
      {
        src: mediaLibrary,
        captionKey: ETranslationKey.ProjectsOmnoraMediaLibrary,
        width: 3456,
        height: 1816,
      },
      {
        src: screenRecorder,
        captionKey: ETranslationKey.ProjectsOmnoraScreenRecorder,
        width: 3456,
        height: 1814,
      },
      {
        src: videoRecorderBackground,
        captionKey: ETranslationKey.ProjectsOmnoraVideoRecorderBackground,
        width: 3446,
        height: 1820,
      },
      {
        src: slidesAvatarUpload,
        captionKey: ETranslationKey.ProjectsOmnoraSlidesAvatarUpload,
        width: 3456,
        height: 1822,
      },
      {
        src: videoRecorderSettings,
        captionKey: ETranslationKey.ProjectsOmnoraVideoRecorderSettings,
        width: 3454,
        height: 1814,
      },
      {
        src: interviewWelcome,
        captionKey: ETranslationKey.ProjectsOmnoraInterviewWelcome,
        width: 3456,
        height: 1830,
      },
      {
        src: accountSettings,
        captionKey: ETranslationKey.ProjectsOmnoraAccountSettings,
        width: 3450,
        height: 1812,
      },
      {
        src: notifications,
        captionKey: ETranslationKey.ProjectsOmnoraNotifications,
        width: 3456,
        height: 1816,
      },
      {
        src: brandKit,
        captionKey: ETranslationKey.ProjectsOmnoraBrandKit,
        width: 3454,
        height: 1814,
      },
      {
        src: videoEditor,
        captionKey: ETranslationKey.ProjectsOmnoraVideoEditor,
        width: 3440,
        height: 1794,
      },
      {
        src: avatarSelection,
        captionKey: ETranslationKey.ProjectsOmnoraAvatarSelection,
        width: 3456,
        height: 1818,
      },
      {
        src: sceneLayouts,
        captionKey: ETranslationKey.ProjectsOmnoraSceneLayouts,
        width: 3456,
        height: 1802,
      },
      {
        src: aiQuiz,
        captionKey: ETranslationKey.ProjectsOmnoraAiQuiz,
        width: 3454,
        height: 1812,
      },
      {
        src: quiz,
        captionKey: ETranslationKey.ProjectsOmnoraQuiz,
        width: 3456,
        height: 1814,
      },
      {
        src: videoPlayer,
        captionKey: ETranslationKey.ProjectsOmnoraVideoPlayer,
        width: 3452,
        height: 1822,
      },
      {
        src: playerControls,
        captionKey: ETranslationKey.ProjectsOmnoraPlayerControls,
        width: 3452,
        height: 1812,
      },
      {
        src: lmsSettings,
        captionKey: ETranslationKey.ProjectsOmnoraLmsSettings,
        width: 3456,
        height: 1820,
      },
      {
        src: securityProfiles,
        captionKey: ETranslationKey.ProjectsOmnoraSecurityProfiles,
        width: 3452,
        height: 1816,
      },
    ],
  },
];
