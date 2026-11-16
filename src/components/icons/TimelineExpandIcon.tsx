import { TimelineIcon } from "./TimelineIcon";

type TimelineExpandIconProps = {
  isExpanded?: boolean;
};

export function TimelineExpandIcon({
  isExpanded = false,
}: TimelineExpandIconProps) {
  return (
    <TimelineIcon
      className={`transition-transform duration-200 ease-out ${isExpanded ? "rotate-180" : "rotate-0"}`}
    >
      <path d="m7 9.5 5 5 5-5" />
    </TimelineIcon>
  );
}
