import { Fragment } from "react";

import { PipeSeparator } from "./PipeSeparator";

type PipeSeparatedTextProps = {
  value: string;
  className?: string;
  separatorClassName?: string;
};

export function PipeSeparatedText(props: PipeSeparatedTextProps) {
  const { value, className, separatorClassName } = props;
  const parts = value
    .split("|")
    .map(function (part) {
      return part.trim();
    })
    .filter(function (part) {
      return part.length > 0;
    });

  return (
    <span className={className}>
      {parts.map(function (part, index) {
        let separator = null;

        if (index > 0) {
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
