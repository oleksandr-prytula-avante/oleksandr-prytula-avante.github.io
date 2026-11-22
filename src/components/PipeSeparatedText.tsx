import { Fragment } from "react";

import { splitPipeSeparatedText } from "../utils/text";
import { InlineContent } from "./InlineContent";
import { PipeSeparator } from "./PipeSeparator";

type PipeSeparatedTextProps = {
  value: string;
  inlineContent?: boolean;
  hasSeparatorMargin?: boolean;
  hideLastPartOnMobile?: boolean;
  stackOnMobile?: boolean;
};

export function PipeSeparatedText(props: PipeSeparatedTextProps) {
  const {
    value,
    inlineContent = false,
    hasSeparatorMargin = false,
    hideLastPartOnMobile = false,
    stackOnMobile = false,
  } = props;
  const parts = splitPipeSeparatedText(value);

  return (
    <InlineContent inline={inlineContent} stackOnMobile={stackOnMobile}>
      {parts.map(function (part, index) {
        const isLastPart = index === parts.length - 1;
        const shouldHideOnMobile = hideLastPartOnMobile && isLastPart;
        let separator = null;

        if (index > 0) {
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
                  index > 0 ? "timeline-hide-between-1024-1440" : "",
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
    </InlineContent>
  );
}
