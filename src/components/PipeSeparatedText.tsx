import { Fragment } from "react";

import { PipeSeparator } from "./PipeSeparator";

type PipeSeparatedTextProps = {
  value: string;
  className?: string;
  separatorClassName?: string;
};

const PIPE_TEXT_DELIMITER = "|";
const FIRST_PART_INDEX = 0;
const MIN_PART_LENGTH = 0;

export function PipeSeparatedText(props: PipeSeparatedTextProps) {
  const { value, className, separatorClassName } = props;
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
        let separator = null;

        if (index > FIRST_PART_INDEX) {
          separator = <PipeSeparator className={separatorClassName} />;
        }

        return (
          <Fragment key={`${part}-${index}`}>
            {separator}
            <span>{part}</span>
          </Fragment>
        );
      })}
    </span>
  );
}
