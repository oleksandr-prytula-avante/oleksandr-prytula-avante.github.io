import { randomBetween } from "./random";
import {
  VERTICAL_LINE_POSITIONS,
  HORIZONTAL_LINE_POSITIONS,
  VERTICAL_LINE_TOP_MIN,
  VERTICAL_LINE_TOP_MAX,
  MIN_LINE_PERCENT,
  LINE_PERCENT_CAP,
  VERTICAL_LINE_HEIGHT_MIN,
  HORIZONTAL_LINE_LEFT_MIN,
  HORIZONTAL_LINE_LEFT_MAX,
  HORIZONTAL_LINE_WIDTH_MIN,
  LINE_THICKNESS_PX,
} from "../constants/linesBackground";

export type LineStyle = {
  left: string;
  top: string;
  width: string;
  height: string;
};

export function generateVerticalLineStyles(): LineStyle[] {
  return VERTICAL_LINE_POSITIONS.map(function (left) {
    const top = randomBetween(VERTICAL_LINE_TOP_MIN, VERTICAL_LINE_TOP_MAX);
    const maxHeight = Math.max(MIN_LINE_PERCENT, LINE_PERCENT_CAP - top);
    const height = randomBetween(VERTICAL_LINE_HEIGHT_MIN, maxHeight);

    return {
      left: `${left}%`,
      top: `${top}%`,
      width: LINE_THICKNESS_PX,
      height: `${height}%`,
    };
  });
}

export function generateHorizontalLineStyles(): LineStyle[] {
  return HORIZONTAL_LINE_POSITIONS.map(function (top) {
    const left = randomBetween(
      HORIZONTAL_LINE_LEFT_MIN,
      HORIZONTAL_LINE_LEFT_MAX,
    );
    const maxWidth = LINE_PERCENT_CAP - left;
    const width = randomBetween(HORIZONTAL_LINE_WIDTH_MIN, maxWidth);

    return {
      left: `${left}%`,
      top: `${top}%`,
      width: `${width}%`,
      height: LINE_THICKNESS_PX,
    };
  });
}
