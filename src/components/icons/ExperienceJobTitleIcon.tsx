import * as React from "react";

export function ExperienceJobTitleIcon(
  props: React.SVGProps<SVGSVGElement>,
): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect
        x="3"
        y="6"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M9 6V4h6v2M3 12h18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
