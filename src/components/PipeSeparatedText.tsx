import { Fragment } from "react";

import { PipeSeparator } from "./PipeSeparator";

type PipeSeparatedTextProps = {
  value: string;
  className?: string;
  separatorClassName?: string;
  hideLastPartOnMobile?: boolean;
};

const PIPE_TEXT_DELIMITER = "|";
const FIRST_PART_INDEX = 0;
const MIN_PART_LENGTH = 0;

export function PipeSeparatedText(props: PipeSeparatedTextProps) {
  const {
    value,
    className,
    separatorClassName,
    hideLastPartOnMobile = false,
  } = props;
  const parts = value
    .split(PIPE_TEXT_DELIMITER)
    .map(function (part) {
      return part.trim();
    })
    .filter(function (part) {
      return part.length > MIN_PART_LENGTH;
    });

  return (
    <span className={className}>
      {parts.map(function (part, index) {
        const isLastPart = index === parts.length - 1;
        const shouldHideOnMobile = hideLastPartOnMobile && isLastPart;
        let separator = null;

        if (index > FIRST_PART_INDEX) {
          separator = (
            <PipeSeparator
              className={`${separatorClassName ?? ""} ${shouldHideOnMobile ? "max-[768px]:hidden" : ""}`.trim()}
            />
          );
        }

        return (
          <Fragment key={`${part}-${index}`}>
            {separator}
            <span className={shouldHideOnMobile ? "max-[768px]:hidden" : undefined}>
              {part}
            </span>
          </Fragment>
        );
      })}
    </span>
  );
}
