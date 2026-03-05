import { Fragment } from "react";

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
        return (
          <Fragment key={`${part}-${index}`}>
            {index > 0 ? (
              <span className={separatorClassName ?? "text-white/60"}>|</span>
            ) : null}
            <span>{part}</span>
          </Fragment>
        );
      })}
    </span>
  );
}
