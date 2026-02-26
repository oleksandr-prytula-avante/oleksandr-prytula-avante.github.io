import * as React from "react";

export function ExperienceLocationIcon(
  props: React.SVGProps<SVGSVGElement>,
): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
