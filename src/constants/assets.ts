import mountainMistPath from "../components/illustrations/assets/mountain-mist.svg";
import nightSkyPath from "../components/illustrations/assets/night-sky.svg";
import portfolioMarkPath from "../components/illustrations/assets/portfolio-mark.svg";
import skyUfoPath from "../components/illustrations/assets/sky-ufo.svg";

export const COMPANY_LOGO_PATHS = {
  binaryStudio: "/assets/images/companies/binary-studio.webp",
  codeAndCare: "/assets/images/companies/code-and-care.webp",
  digitalsuits: "/assets/images/companies/digitalsuits.webp",
  duet: "/assets/images/companies/duet.webp",
  knu: "/assets/images/companies/knu.webp",
  lanars: "/assets/images/companies/lanars.webp",
  omnora: "/assets/images/companies/omnora.webp",
} as const;

export const PROJECT_SCREENSHOT_PATHS = {
  accountSettings:
    "/assets/images/projects/omnora-authoring/account-settings.webp",
  aiQuiz: "/assets/images/projects/omnora-authoring/ai-quiz.webp",
  authoringHome: "/assets/images/projects/omnora-authoring/authoring-home.webp",
  avatarSelection:
    "/assets/images/projects/omnora-authoring/avatar-selection.webp",
  brandKit: "/assets/images/projects/omnora-authoring/brand-kit.webp",
  interviewWelcome:
    "/assets/images/projects/omnora-authoring/interview-welcome.webp",
  interviews: "/assets/images/projects/omnora-authoring/interviews.webp",
  lmsSettings: "/assets/images/projects/omnora-authoring/lms-settings.webp",
  login: "/assets/images/projects/omnora-authoring/login.webp",
  mediaLibrary: "/assets/images/projects/omnora-authoring/media-library.webp",
  notifications: "/assets/images/projects/omnora-authoring/notifications.webp",
  playerControls:
    "/assets/images/projects/omnora-authoring/player-controls.webp",
  quiz: "/assets/images/projects/omnora-authoring/quiz.webp",
  recycleBin: "/assets/images/projects/omnora-authoring/recycle-bin.webp",
  sceneLayouts: "/assets/images/projects/omnora-authoring/scene-layouts.webp",
  screenRecorder:
    "/assets/images/projects/omnora-authoring/screen-recorder.webp",
  securityProfiles:
    "/assets/images/projects/omnora-authoring/security-profiles.webp",
  slideEditing: "/assets/images/projects/omnora-authoring/slide-editing.webp",
  slidesAvatarUpload:
    "/assets/images/projects/omnora-authoring/slides-avatar-upload.webp",
  videoEditor: "/assets/images/projects/omnora-authoring/video-editor.webp",
  videoHub: "/assets/images/projects/omnora-authoring/videohub.webp",
  videoPlayer: "/assets/images/projects/omnora-authoring/video-player.webp",
  videoRecorderBackground:
    "/assets/images/projects/omnora-authoring/video-recorder-background.webp",
  videoRecorderSettings:
    "/assets/images/projects/omnora-authoring/video-recorder-settings.webp",
} as const;

export const SVG_ASSET_PATHS = {
  mountainMist: mountainMistPath,
  nightSky: nightSkyPath,
  portfolioMark: portfolioMarkPath,
  skyUfo: skyUfoPath,
} as const;

export function getProjectThumbnailPath(sourcePath: string) {
  const filename = sourcePath
    .split("/")
    .at(-1)
    ?.replace(/\.webp$/, ".avif");
  return filename
    ? `/assets/images/projects/omnora-authoring/thumbs/${filename}`
    : sourcePath;
}

export const CV_ASSET_PATH = "/assets/pdf/cv.pdf";
