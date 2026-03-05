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
    month < 1 ||
    month > 12
  ) {
    throw new Error(`Invalid date format: ${value}. Expected YYYY-MM.`);
  }

  return { year, month };
}

function formatMonthYear(value: YearMonth, locale: string): string {
  const date = new Date(value.year, value.month - 1, 1);
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatDuration(totalMonths: number): string {
  if (totalMonths <= 0) {
    return "0 mos";
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  }

  if (months > 0) {
    parts.push(`${months} ${months === 1 ? "mo" : "mos"}`);
  }

  return parts.join(" ");
}

export function buildPeriodLabel(
  startDate: string,
  endDate: string | null,
  presentLabel: string,
  locale: string,
): { dateRange: string; duration: string } {
  const parsedStart = parseYearMonth(startDate);

  let parsedEnd: YearMonth;

  if (endDate === null) {
    const now = new Date();
    parsedEnd = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
    };
  } else {
    parsedEnd = parseYearMonth(endDate);
  }

  const monthDiff =
    (parsedEnd.year - parsedStart.year) * 12 +
    (parsedEnd.month - parsedStart.month) +
    1;

  const safeMonthDiff = Math.max(monthDiff, 0);
  const startLabel = formatMonthYear(parsedStart, locale);
  const endLabel =
    endDate === null ? presentLabel : formatMonthYear(parsedEnd, locale);

  return {
    dateRange: `${startLabel} - ${endLabel}`,
    duration: formatDuration(safeMonthDiff),
  };
}
