import { Fragment } from "react";

import { PipeSeparator } from "./PipeSeparator";

type PipeSeparatedTextProps = {
  value: string;
  className?: string;
  separatorClassName?: string;
  hideLastPartOnMobile?: boolean;
  stackOnMobile?: boolean;
};

const PIPE_TEXT_DELIMITER = "|";
const FIRST_PART_INDEX = 0;
const MIN_PART_LENGTH = 0;

export const MOBILE_STACK_CONTAINER_SUFFIX =
  "max-[640px]:flex-col max-[640px]:items-start max-[640px]:overflow-visible max-[640px]:whitespace-normal";
export const MOBILE_STACK_ITEM_CLASS =
  "max-[640px]:overflow-visible max-[640px]:whitespace-normal";
export const MOBILE_STACK_SEPARATOR_CLASS = "max-[640px]:hidden";

export function PipeSeparatedText(props: PipeSeparatedTextProps) {
  const {
    value,
    className,
    separatorClassName = "text-white/60",
    hideLastPartOnMobile = false,
    stackOnMobile = false,
  } = props;
  const mobileStackClass = stackOnMobile ? MOBILE_STACK_CONTAINER_SUFFIX : "";
  const parts = value
    .split(PIPE_TEXT_DELIMITER)
    .map(function (part) {
      return part.trim();
    })
    .filter(function (part) {
      return part.length > MIN_PART_LENGTH;
    });

  return (
    <span className={`${className ?? ""} ${mobileStackClass}`.trim()}>
      {parts.map(function (part, index) {
        const isLastPart = index === parts.length - 1;
        const shouldHideOnMobile = hideLastPartOnMobile && isLastPart;
        let separator = null;

        if (index > FIRST_PART_INDEX) {
          separator = (
            <PipeSeparator
              className={`${separatorClassName ?? ""} ${shouldHideOnMobile ? "max-[768px]:hidden" : ""} ${stackOnMobile ? MOBILE_STACK_SEPARATOR_CLASS : ""} timeline-hide-between-1024-1440`.trim()}
            />
          );
        }

        return (
          <Fragment key={`${part}-${index}`}>
            {separator}
            <span
              className={
                [
                  shouldHideOnMobile ? "max-[768px]:hidden" : "",
                  stackOnMobile
                    ? "max-[640px]:overflow-visible max-[640px]:whitespace-normal"
                    : "",
                  index > FIRST_PART_INDEX
                    ? "timeline-hide-between-1024-1440"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ") || undefined
              }
            >
              {part}
            </span>
          </Fragment>
        );
      })}
    </span>
  );
}
