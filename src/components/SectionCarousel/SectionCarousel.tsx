import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";

import {
  SECTION_NAV_ITEMS,
  NOT_FOUND_INDEX,
  FIRST_SLIDE_INDEX,
  VALID_HASHES,
} from "../../constants/sections";
import { useActiveSectionHash } from "../../hooks/useActiveSectionHash";
import {
  ESection,
  getCurrentHash,
  isSectionHash,
  toSectionHash,
} from "../../utils/sections";

import { DESKTOP_MIN_WIDTH_MEDIA_QUERY } from "../../constants/mediaQueries";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useI18n } from "../../hooks/useI18n";
import { SectionHeading } from "../SectionHeading";

import "./SectionCarousel.css";

type SectionCarouselProps = {
  sections: Record<ESection, ReactNode>;
  isLineVisible: boolean;
};

export function SectionCarousel({
  sections,
  isLineVisible,
}: SectionCarouselProps) {
  const i18n = useI18n();
  const isDesktopViewport = useMediaQuery(DESKTOP_MIN_WIDTH_MEDIA_QUERY, true);
  const { activeHash } = useActiveSectionHash(toSectionHash(ESection.About));
  const initialHash = useRef(getCurrentHash());
  const index = SECTION_NAV_ITEMS.findIndex(({ href }) => href === activeHash);
  const activeIndex = index === NOT_FOUND_INDEX ? FIRST_SLIDE_INDEX : index;

  useEffect(() => {
    const hash = initialHash.current;
    if (!isSectionHash(hash, VALID_HASHES)) return;
    if (hash !== getCurrentHash()) {
      initialHash.current = "";
      return;
    }
    if (!isLineVisible) return;

    if (isDesktopViewport) {
      initialHash.current = "";
      return;
    }

    let cancelled = false;
    let frame = 0;
    void document.fonts.ready.then(() => {
      if (cancelled) return;
      frame = window.requestAnimationFrame(() => {
        if (hash === getCurrentHash()) {
          document
            .getElementById(hash.slice(1))
            ?.scrollIntoView({ behavior: "instant" });
        }
        initialHash.current = "";
      });
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
    };
  }, [activeHash, isDesktopViewport, isLineVisible]);

  return (
    <div className="section-carousel relative flex h-full min-h-0 min-w-0 flex-col px-10 max-[1025px]:h-auto max-[1025px]:px-0">
      <div className="section-carousel__meta" aria-hidden="true">
        <span className="section-carousel__count">
          {String(activeIndex + 1).padStart(2, "0")}
          <span> / {String(SECTION_NAV_ITEMS.length).padStart(2, "0")}</span>
        </span>
        <span className="section-carousel__progress">
          <span
            style={{
              transform: `scaleX(${(activeIndex + 1) / SECTION_NAV_ITEMS.length})`,
            }}
          />
        </span>
      </div>
      <div className="section-carousel__stage">
        {SECTION_NAV_ITEMS.map(function ({ id, href, labelKey }, index) {
          const isActive = index === activeIndex;
          const sectionClassName =
            href === toSectionHash(ESection.About)
              ? "min-[1025px]:overflow-y-hidden min-[1025px]:pb-12 min-[1367px]:px-2"
              : "min-[1025px]:overflow-hidden min-[1025px]:py-8 min-[1025px]:px-2";

          return (
            <section
              key={id}
              id={isDesktopViewport ? undefined : id}
              className={`section-carousel__panel resume-mobile-section max-[1025px]:scroll-mt-24 max-[1025px]:py-4 ${sectionClassName}`}
              data-active={isActive}
              aria-hidden={isDesktopViewport && !isActive}
              inert={isDesktopViewport && !isActive}
              style={
                {
                  "--section-direction": index < activeIndex ? -1 : 1,
                } as CSSProperties
              }
            >
              <SectionHeading
                layout="mobile"
                animateLine
                isLineVisible={isLineVisible}
                title={i18n.t(labelKey)}
              />
              {sections[id]}
            </section>
          );
        })}
      </div>
    </div>
  );
}
