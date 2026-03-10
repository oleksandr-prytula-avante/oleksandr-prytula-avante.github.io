import { randomBetween } from "./random";

const VERTICAL_LINE_POSITIONS = [5, 21, 37, 53, 69, 85];
const HORIZONTAL_LINE_POSITIONS = [10, 26, 42, 58, 74, 90];
const VERTICAL_LINE_TOP_MIN = 5;
const VERTICAL_LINE_TOP_MAX = 55;
const MIN_LINE_PERCENT = 1;
const LINE_PERCENT_CAP = 90;
const VERTICAL_LINE_HEIGHT_MIN = 35;
const HORIZONTAL_LINE_LEFT_MIN = 0;
const HORIZONTAL_LINE_LEFT_MAX = 70;
const HORIZONTAL_LINE_WIDTH_MIN = 20;
const LINE_THICKNESS_PX = "2px";

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
