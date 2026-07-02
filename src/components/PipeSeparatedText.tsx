import { Fragment } from "react";

import { PipeSeparator } from "./PipeSeparator";
import {
  TIMELINE_ROW_INLINE_CONTENT_CLASS,
  MOBILE_STACK_CONTAINER_SUFFIX,
} from "../constants/ui";

type PipeSeparatedTextProps = {
  value: string;
  inlineContent?: boolean;
  hasSeparatorMargin?: boolean;
  hideLastPartOnMobile?: boolean;
  stackOnMobile?: boolean;
};

const PIPE_TEXT_DELIMITER = "|";
const FIRST_PART_INDEX = 0;
const MIN_PART_LENGTH = 0;

export function PipeSeparatedText(props: PipeSeparatedTextProps) {
  const {
    value,
    inlineContent = false,
    hasSeparatorMargin = false,
    hideLastPartOnMobile = false,
    stackOnMobile = false,
  } = props;
  const mobileStackClass = stackOnMobile ? MOBILE_STACK_CONTAINER_SUFFIX : "";
  const inlineContentClass = inlineContent
    ? TIMELINE_ROW_INLINE_CONTENT_CLASS
    : "";
  const parts = value
    .split(PIPE_TEXT_DELIMITER)
    .map(function (part) {
      return part.trim();
    })
    .filter(function (part) {
      return part.length > MIN_PART_LENGTH;
    });

  const containerClassName = [inlineContentClass, mobileStackClass]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={containerClassName || undefined}>
      {parts.map(function (part, index) {
        const isLastPart = index === parts.length - 1;
        const shouldHideOnMobile = hideLastPartOnMobile && isLastPart;
        let separator = null;

        if (index > FIRST_PART_INDEX) {
          separator = (
            <PipeSeparator
              hasMargin={hasSeparatorMargin}
              hideOnMobile={shouldHideOnMobile}
              hideOnMobileStack={stackOnMobile}
              hideBetween1024And1440
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
