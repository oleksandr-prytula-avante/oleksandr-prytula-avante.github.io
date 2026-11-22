import { useEffect, useRef, useState, type PointerEvent } from "react";

import type { ProjectTimelineItem } from "../../constants/projects";
import { useI18n } from "../../hooks/useI18n";
import { ETranslationKey } from "../../i18n/types";
import { ChevronLeftIcon } from "../icons/ChevronLeftIcon";
import { ChevronRightIcon } from "../icons/ChevronRightIcon";
import { CloseIcon } from "../icons/CloseIcon";
import { ZoomIcon } from "../icons/ZoomIcon";
import { ScreenshotPreviewControl } from "./ScreenshotPreviewControl";

import "./ScreenshotPreview.css";

type ScreenshotPreviewProps = {
  screenshots: ProjectTimelineItem["screenshots"];
  currentIndex: number;
  onNavigate: (index: number) => void;
  projectName: string;
  onClose: () => void;
};

export function ScreenshotPreview({
  screenshots,
  currentIndex,
  onNavigate,
  projectName,
  onClose,
}: ScreenshotPreviewProps) {
  const i18n = useI18n();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const activeThumbnailRef = useRef<HTMLButtonElement>(null);
  const startedOnBackdropRef = useRef(false);
  const gestureRef = useRef<{
    x: number;
    y: number;
    left: number;
    top: number;
  } | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const screenshot = screenshots[currentIndex];
  const caption = i18n.t(screenshot.captionKey);
  const hasNavigation = screenshots.length > 1;
  const zoomLabel = i18n.t(
    isZoomed
      ? ETranslationKey.ProjectsFitScreenshot
      : ETranslationKey.ProjectsZoomScreenshot,
  );

  function selectScreenshot(index: number) {
    setIsZoomed(false);
    onNavigate((index + screenshots.length) % screenshots.length);
  }

  function navigate(direction: -1 | 1) {
    selectScreenshot(currentIndex + direction);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    if (event.pointerType === "mouse" && !isZoomed) return;
    const viewport = event.currentTarget;
    gestureRef.current = {
      x: event.clientX,
      y: event.clientY,
      left: viewport.scrollLeft,
      top: viewport.scrollTop,
    };
    if (isZoomed && event.pointerType === "mouse") {
      event.preventDefault();
      viewport.setPointerCapture(event.pointerId);
    }
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const gesture = gestureRef.current;
    if (!gesture || !isZoomed || event.pointerType !== "mouse") return;
    event.currentTarget.scrollLeft = gesture.left + gesture.x - event.clientX;
    event.currentTarget.scrollTop = gesture.top + gesture.y - event.clientY;
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    const gesture = gestureRef.current;
    gestureRef.current = null;
    if (!gesture || isZoomed || !hasNavigation || event.pointerType !== "touch")
      return;
    const deltaX = event.clientX - gesture.x;
    const deltaY = event.clientY - gesture.y;
    if (Math.abs(deltaX) >= 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      navigate(deltaX < 0 ? 1 : -1);
    }
  }

  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open)
      dialogRef.current.showModal();
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    const thumbnail = activeThumbnailRef.current;
    if (!rail || !thumbnail) return;
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    rail.scrollTo({
      left:
        thumbnail.offsetLeft - (rail.clientWidth - thumbnail.offsetWidth) / 2,
      behavior: isReducedMotion ? "instant" : "smooth",
    });
  }, [currentIndex]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollTo({
      left: isZoomed ? (viewport.scrollWidth - viewport.clientWidth) / 2 : 0,
      top: isZoomed ? (viewport.scrollHeight - viewport.clientHeight) / 2 : 0,
    });
  }, [isZoomed, currentIndex]);

  return (
    <dialog
      ref={dialogRef}
      className="screenshot-preview"
      aria-label={`${projectName} – ${i18n.t(ETranslationKey.ProjectsScreenshots)}`}
      onClose={onClose}
      onPointerDown={(event) => {
        startedOnBackdropRef.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        if (
          event.target === event.currentTarget &&
          startedOnBackdropRef.current
        )
          event.currentTarget.close();
      }}
      onKeyDown={(event) => {
        if (
          !hasNavigation ||
          event.altKey ||
          event.ctrlKey ||
          event.metaKey ||
          event.shiftKey
        )
          return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          navigate(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
    >
      <div className="screenshot-preview__shell">
        <header className="screenshot-preview__header">
          <div className="screenshot-preview__identity">
            <p className="screenshot-preview__project">{projectName}</p>
            <div className="screenshot-preview__meta">
              <span className="screenshot-preview__kind">
                {i18n.t(ETranslationKey.ProjectsScreenshots)}
              </span>
              <span className="screenshot-preview__counter">
                <span>{String(currentIndex + 1).padStart(2, "0")}</span> /{" "}
                {String(screenshots.length).padStart(2, "0")}
              </span>
            </div>
          </div>
          <div className="screenshot-preview__controls">
            {hasNavigation && (
              <>
                <ScreenshotPreviewControl
                  label={i18n.t(ETranslationKey.ProjectsPreviousScreenshot)}
                  onClick={() => navigate(-1)}
                >
                  <ChevronLeftIcon />
                </ScreenshotPreviewControl>
                <ScreenshotPreviewControl
                  label={i18n.t(ETranslationKey.ProjectsNextScreenshot)}
                  onClick={() => navigate(1)}
                >
                  <ChevronRightIcon />
                </ScreenshotPreviewControl>
                <span
                  className="screenshot-preview__divider"
                  aria-hidden="true"
                />
              </>
            )}
            <ScreenshotPreviewControl
              label={zoomLabel}
              isPressed={isZoomed}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <ZoomIcon isZoomed={isZoomed} />
            </ScreenshotPreviewControl>
            <ScreenshotPreviewControl
              label={i18n.t(ETranslationKey.ProjectsClosePreview)}
              onClick={() => dialogRef.current?.close()}
            >
              <CloseIcon />
            </ScreenshotPreviewControl>
          </div>
        </header>
        <div
          ref={viewportRef}
          className="screenshot-preview__viewport"
          data-zoomed={isZoomed}
          onDoubleClick={() => setIsZoomed(!isZoomed)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            gestureRef.current = null;
          }}
          onLostPointerCapture={() => {
            gestureRef.current = null;
          }}
        >
          <img
            key={screenshot.src}
            src={screenshot.src}
            alt={`${projectName} – ${caption}`}
            width={screenshot.width}
            height={screenshot.height}
            draggable={false}
            className="screenshot-preview__image"
          />
        </div>
        <footer className="screenshot-preview__footer">
          <div
            className="screenshot-preview__caption"
            aria-live="polite"
            aria-atomic="true"
          >
            <p>{caption}</p>
            <span>
              {screenshot.width} × {screenshot.height}
            </span>
            <span className="sr-only">
              {currentIndex + 1} / {screenshots.length}
            </span>
          </div>
          {hasNavigation && (
            <div ref={railRef} className="screenshot-preview__rail">
              {screenshots.map((item, index) => {
                const isCurrent = index === currentIndex;
                const thumbnailCaption = i18n.t(item.captionKey);
                return (
                  <button
                    key={item.src}
                    ref={isCurrent ? activeThumbnailRef : undefined}
                    type="button"
                    className="subtle-border screenshot-preview__thumbnail"
                    data-active={isCurrent}
                    aria-current={isCurrent ? "true" : undefined}
                    aria-label={`${i18n.t(ETranslationKey.ProjectsOpenScreenshot)}: ${thumbnailCaption}`}
                    title={thumbnailCaption}
                    onClick={() => selectScreenshot(index)}
                  >
                    <img
                      src={item.src}
                      alt=""
                      width={item.width}
                      height={item.height}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                    <span aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </footer>
      </div>
    </dialog>
  );
}
