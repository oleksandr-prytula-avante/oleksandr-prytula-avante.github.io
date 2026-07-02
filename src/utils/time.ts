import {
  MIN_MONTH,
  MAX_MONTH,
  ZERO_DURATION_MONTHS,
  ZERO_MONTHS_LABEL,
  MONTHS_PER_YEAR,
  DURATION_PARTS_SEPARATOR,
  INCLUSIVE_MONTH_OFFSET,
  SINGULAR_DURATION_UNIT_COUNT,
} from "../constants/time";

type YearMonth = {
  year: number;
  month: number;
};

function parseYearMonth(value: string): YearMonth {
  const [yearPart, monthPart] = value.split("-");
  const year = Number(yearPart);
  const month = Number(monthPart);

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    month < MIN_MONTH ||
    month > MAX_MONTH
  ) {
    throw new Error(`Invalid date format: ${value}. Expected YYYY-MM.`);
  }

  return { year, month };
}

function formatMonthYear(value: YearMonth, locale: string): string {
  const date = new Date(value.year, value.month - MIN_MONTH, MIN_MONTH);
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatDuration(totalMonths: number): string {
  if (totalMonths <= ZERO_DURATION_MONTHS) {
    return ZERO_MONTHS_LABEL;
  }

  const years = Math.floor(totalMonths / MONTHS_PER_YEAR);
  const months = totalMonths % MONTHS_PER_YEAR;
  const parts: string[] = [];

  if (years > 0) {
    parts.push(
      `${years} ${years === SINGULAR_DURATION_UNIT_COUNT ? "yr" : "yrs"}`,
    );
  }

  if (months > 0) {
    parts.push(
      `${months} ${months === SINGULAR_DURATION_UNIT_COUNT ? "mo" : "mos"}`,
    );
  }

  return parts.join(DURATION_PARTS_SEPARATOR);
}

export function buildPeriodLabel(
  startDate: string,
  endDate: string | null,
  presentLabel: string,
  locale: string,
): { dateRange: string; duration: string } {
  const parsedStart = parseYearMonth(startDate);
  const now = new Date();

  const parsedEnd: YearMonth =
    endDate === null
      ? {
          year: now.getFullYear(),
          month: now.getMonth() + MIN_MONTH,
        }
      : parseYearMonth(endDate);

  const monthDiff =
    (parsedEnd.year - parsedStart.year) * MONTHS_PER_YEAR +
    (parsedEnd.month - parsedStart.month) +
    INCLUSIVE_MONTH_OFFSET;

  const safeMonthDiff = Math.max(monthDiff, ZERO_DURATION_MONTHS);
  const startLabel = formatMonthYear(parsedStart, locale);
  const endLabel =
    endDate === null ? presentLabel : formatMonthYear(parsedEnd, locale);

  return {
    dateRange: `${startLabel} - ${endLabel}`,
    duration: formatDuration(safeMonthDiff),
  };
}
