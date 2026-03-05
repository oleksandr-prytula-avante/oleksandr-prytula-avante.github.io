import { useMemo } from "react";

import { randomBetween } from "../../utils/random";

import "./LinesBackgorund.css";

export const VERTICAL_LINE_POSITIONS = [5, 21, 37, 53, 69, 85];
export const HORIZONTAL_LINE_POSITIONS = [10, 26, 42, 58, 74, 90];

type LineStyle = {
  left: string;
  top: string;
  width: string;
  height: string;
};

function generateVerticalLineStyles(): LineStyle[] {
  return VERTICAL_LINE_POSITIONS.map(function (left) {
    const top = randomBetween(5, 55);
    const maxHeight = Math.max(1, 90 - top);
    const height = randomBetween(35, maxHeight);

    return {
      left: `${left}%`,
      top: `${top}%`,
      width: `2px`,
      height: `${height}%`,
    };
  });
}

function generateHorizontalLineStyles(): LineStyle[] {
  return HORIZONTAL_LINE_POSITIONS.map(function (top) {
    const left = randomBetween(0, 70);
    const maxWidth = 90 - left;
    const width = randomBetween(20, maxWidth);

    return {
      left: `${left}%`,
      top: `${top}%`,
      width: `${width}%`,
      height: `2px`,
    };
  });
}

export function LinesBackground() {
  const verticalLines = useMemo(generateVerticalLineStyles, []);
  const horizontalLines = useMemo(generateHorizontalLineStyles, []);

  return (
    <div className="lines" aria-hidden="true">
      {verticalLines.map(function (style, index) {
        return <div key={`v-${index}`} className="line-vertical" style={style} />;
      })}
      {horizontalLines.map(function (style, index) {
        return (
          <div key={`h-${index}`} className="line-horizontal" style={style} />
        );
      })}
    </div>
  );
}
