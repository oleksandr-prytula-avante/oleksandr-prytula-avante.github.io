import { useEffect, useRef } from "react";

import type { ProjectTimelineItem } from "../../constants/projects";
import { useI18n } from "../../hooks/useI18n";
import { ETranslationKey } from "../../i18n/types";

type ScreenshotPreviewProps = {
  screenshot: ProjectTimelineItem["screenshots"][number];
  projectName: string;
  onClose: () => void;
};

export function ScreenshotPreview({
  screenshot,
  projectName,
  onClose,
}: ScreenshotPreviewProps) {
  const i18n = useI18n();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const caption = i18n.t(screenshot.captionKey);

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
        className="absolute top-3 right-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/4 bg-[color:var(--color-bg)] text-white outline-none transition-colors duration-200 ease-out hover:border-[color:var(--color-accent)] hover:bg-[color:color-mix(in_srgb,var(--color-bg),white_8%)] focus-visible:border-[color:var(--color-accent)] focus-visible:bg-[color:color-mix(in_srgb,var(--color-bg),white_8%)]"
      >
        <svg
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      </button>
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
