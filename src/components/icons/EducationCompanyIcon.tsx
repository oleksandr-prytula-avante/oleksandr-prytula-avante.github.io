import * as React from "react";

export function EducationCompanyIcon(
  props: React.SVGProps<SVGSVGElement>,
): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M2.5 9.5 12 5l9.5 4.5L12 14 2.5 9.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 11.4V15c0 1.4 2.4 2.8 5.5 2.8s5.5-1.4 5.5-2.8v-3.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.5 10v4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="21.5" cy="16.5" r="1" fill="currentColor" />
    </svg>
  );
}
