import { useState } from "react";

import type { ProjectTimelineItem } from "../../constants/projects";
import { useI18n } from "../../hooks/useI18n";
import { ETranslationKey } from "../../i18n/types";
import { ScreenshotPreview } from "./ScreenshotPreview";

type ProjectGalleryProps = {
  item: ProjectTimelineItem;
};

export function ProjectGallery({ item }: ProjectGalleryProps) {
  const i18n = useI18n();
  const [previewScreenshot, setPreviewScreenshot] = useState<
    ProjectTimelineItem["screenshots"][number] | null
  >(null);

  return (
    <div className="mt-6 pb-2">
      <div className="grid min-w-0 grid-cols-1 gap-3">
        {item.screenshots.map(function (screenshot) {
          const caption = i18n.t(screenshot.captionKey);

          return (
            <figure key={screenshot.src} className="relative min-w-0">
              <button
                type="button"
                onClick={() => setPreviewScreenshot(screenshot)}
                aria-label={`${i18n.t(ETranslationKey.ProjectsOpenScreenshot)}: ${caption}`}
                className="block w-full cursor-zoom-in overflow-hidden rounded-lg border border-white/20 bg-white transition-colors duration-200 hover:border-[color:var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--color-accent)]"
              >
                <img
                  src={screenshot.src}
                  alt={`${i18n.t(item.textKeys.name)} — ${caption}`}
                  width={screenshot.width}
                  height={screenshot.height}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />
              </button>
              <figcaption className="pointer-events-none absolute bottom-2 left-2 max-w-[calc(100%-1rem)] rounded-md bg-[color:color-mix(in_srgb,var(--color-bg),white_10%)] px-3 py-1.5 text-xs leading-relaxed text-white max-[1366px]:bg-white max-[1366px]:text-[color:var(--color-bg)]">
                {caption}
              </figcaption>
            </figure>
          );
        })}
      </div>
      {previewScreenshot && (
        <ScreenshotPreview
          screenshot={previewScreenshot}
          projectName={i18n.t(item.textKeys.name)}
          onClose={() => setPreviewScreenshot(null)}
        />
      )}
    </div>
  );
}
