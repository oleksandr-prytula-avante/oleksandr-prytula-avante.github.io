import {
  DEFAULT_LINK_CLASS_NAME,
  URL_MATCH_REGEX,
  URL_SPLIT_REGEX,
} from "../constants/text";

type TextWithLinksProps = {
  value: string;
  linkClassName?: string;
};

export function TextWithLinks(props: TextWithLinksProps) {
  const { value, linkClassName = DEFAULT_LINK_CLASS_NAME } = props;

  return value.split(URL_SPLIT_REGEX).map(function (part, index) {
    if (URL_MATCH_REGEX.test(part)) {
      return (
        <a
          key={`link-${part}-${index}`}
          href={part}
          target="_blank"
          rel="noreferrer"
          className={linkClassName}
        >
          {part}
        </a>
      );
    }

    return <span key={`text-${index}`}>{part}</span>;
  });
}
