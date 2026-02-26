import * as React from "react";

export function ExperienceCompanyIcon(
  props: React.SVGProps<SVGSVGElement>,
): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M3 20h18M5 20V9l7-4 7 4v11M9 20v-5h6v5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
