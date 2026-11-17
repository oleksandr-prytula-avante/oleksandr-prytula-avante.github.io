import { useState } from "react";

import { ScreenshotPreview } from "../../components/ScreenshotPreview";
import type { ProjectTimelineItem } from "../../constants/projects";
import { useI18n } from "../../hooks/useI18n";
import { ETranslationKey } from "../../i18n/types";

import "./ProjectGallery.css";

type ProjectGalleryProps = {
  item: ProjectTimelineItem;
};

export function ProjectGallery({ item }: ProjectGalleryProps) {
  const i18n = useI18n();
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  return (
    <div className="project-gallery mt-6 pb-2">
      <div className="project-gallery__grid">
        {item.screenshots.map(function (screenshot, index) {
          const caption = i18n.t(screenshot.captionKey);

          return (
            <figure key={screenshot.src} className="project-gallery__tile">
              <button
                type="button"
                onClick={() => setPreviewIndex(index)}
                aria-label={`${i18n.t(ETranslationKey.ProjectsOpenScreenshot)}: ${caption}`}
                className="subtle-border project-gallery__preview relative block w-full cursor-zoom-in overflow-hidden rounded-lg border bg-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--color-accent)]"
              >
                <img
                  src={screenshot.src}
                  alt={`${i18n.t(item.textKeys.name)} — ${caption}`}
                  width={screenshot.width}
                  height={screenshot.height}
                  loading="lazy"
                  decoding="async"
                  className="project-gallery__image block h-full w-full object-cover"
                />
              </button>
            </figure>
          );
        })}
      </div>
      {previewIndex !== null && (
        <ScreenshotPreview
          screenshots={item.screenshots}
          currentIndex={previewIndex}
          onNavigate={setPreviewIndex}
          projectName={i18n.t(item.textKeys.name)}
          onClose={() => setPreviewIndex(null)}
        />
      )}
    </div>
  );
}
