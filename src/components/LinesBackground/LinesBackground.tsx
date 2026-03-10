import { useMemo } from "react";

import { DESKTOP_MIN_WIDTH_MEDIA_QUERY } from "../../constants/mediaQueries";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import {
  generateHorizontalLineStyles,
  generateVerticalLineStyles,
} from "../../utils/linesBackground";

import "./LinesBackground.css";

export function LinesBackground() {
  const isDesktopViewport = useMediaQuery(DESKTOP_MIN_WIDTH_MEDIA_QUERY, true);

  const verticalLines = useMemo(
    function () {
      return isDesktopViewport ? generateVerticalLineStyles() : [];
    },
    [isDesktopViewport],
  );

  const horizontalLines = useMemo(
    function () {
      return isDesktopViewport ? generateHorizontalLineStyles() : [];
    },
    [isDesktopViewport],
  );

  if (!isDesktopViewport) {
    return null;
  }

  return (
    <div className="lines" aria-hidden="true">
      {verticalLines.map(function (style, index) {
        return (
          <div key={`v-${index}`} className="line-vertical" style={style} />
        );
      })}
      {horizontalLines.map(function (style, index) {
        return (
          <div key={`h-${index}`} className="line-horizontal" style={style} />
        );
      })}
    </div>
  );
}
