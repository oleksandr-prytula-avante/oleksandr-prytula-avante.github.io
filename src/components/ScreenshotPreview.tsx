import { useEffect, useRef } from "react";

import type { ProjectTimelineItem } from "../constants/projects";
import { useI18n } from "../hooks/useI18n";
import { ETranslationKey } from "../i18n/types";
import { ChevronLeftIcon } from "./icons/ChevronLeftIcon";
import { ChevronRightIcon } from "./icons/ChevronRightIcon";
import { CloseIcon } from "./icons/CloseIcon";

type ScreenshotPreviewProps = {
  screenshots: ProjectTimelineItem["screenshots"];
  currentIndex: number;
  onNavigate: (index: number) => void;
  projectName: string;
  onClose: () => void;
};

const CONTROL_CLASS_NAME =
  "absolute z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/4 bg-[color:var(--color-bg)] text-white outline-none transition-colors duration-200 ease-out hover:border-[color:var(--color-accent)] hover:bg-[color:color-mix(in_srgb,var(--color-bg),white_8%)] focus-visible:border-[color:var(--color-accent)] focus-visible:bg-[color:color-mix(in_srgb,var(--color-bg),white_8%)]";

export function ScreenshotPreview({
  screenshots,
  currentIndex,
  onNavigate,
  projectName,
  onClose,
}: ScreenshotPreviewProps) {
  const i18n = useI18n();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const screenshot = screenshots[currentIndex];
  const caption = i18n.t(screenshot.captionKey);
  const hasNavigation = screenshots.length > 1;

  function navigate(direction: -1 | 1) {
    onNavigate(
      (currentIndex + direction + screenshots.length) % screenshots.length,
    );
  }

  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-label={`${projectName} — ${caption}`}
      onClose={onClose}
      onKeyDown={(event) => {
        if (
          !hasNavigation ||
          event.altKey ||
          event.ctrlKey ||
          event.metaKey ||
          event.shiftKey
        ) {
          return;
        }
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          navigate(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          event.currentTarget.close();
        }
      }}
      className="fixed inset-0 m-auto h-fit max-h-none w-fit max-w-none overflow-hidden rounded-2xl border-0 bg-transparent p-0 text-white backdrop:bg-black/50 sm:rounded-[1.25rem]"
    >
      <button
        type="button"
        onClick={() => dialogRef.current?.close()}
        aria-label={i18n.t(ETranslationKey.ProjectsClosePreview)}
        className={`${CONTROL_CLASS_NAME} top-3 right-3`}
      >
        <CloseIcon />
      </button>
      {hasNavigation && (
        <>
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label={i18n.t(ETranslationKey.ProjectsPreviousScreenshot)}
            title={i18n.t(ETranslationKey.ProjectsPreviousScreenshot)}
            className={`${CONTROL_CLASS_NAME} top-1/2 left-3 -translate-y-1/2`}
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            onClick={() => navigate(1)}
            aria-label={i18n.t(ETranslationKey.ProjectsNextScreenshot)}
            title={i18n.t(ETranslationKey.ProjectsNextScreenshot)}
            className={`${CONTROL_CLASS_NAME} top-1/2 right-3 -translate-y-1/2`}
          >
            <ChevronRightIcon />
          </button>
        </>
      )}
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {`${currentIndex + 1} / ${screenshots.length} — ${caption}`}
      </span>
      <img
        src={screenshot.src}
        alt={`${projectName} — ${caption}`}
        width={screenshot.width}
        height={screenshot.height}
        className="block h-auto max-h-[calc(100dvh-2rem)] w-auto max-w-[calc(100vw-2rem)] scale-[1.006]"
      />
    </dialog>
  );
}
