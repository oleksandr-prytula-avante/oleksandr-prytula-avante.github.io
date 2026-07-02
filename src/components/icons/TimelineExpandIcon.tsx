import * as React from "react";

type TimelineExpandIconProps = {
  isExpanded?: boolean;
};

export function TimelineExpandIcon({
  isExpanded = false,
}: TimelineExpandIconProps): React.ReactElement {
  const className = `h-5 w-5 transition-transform duration-200 ease-out ${isExpanded ? "rotate-180" : "rotate-0"}`;
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
