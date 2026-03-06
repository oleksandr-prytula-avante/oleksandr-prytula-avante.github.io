import { ExternalLink } from "./ExternalLink";

type TextWithLinksProps = {
  value: string;
  linkClassName?: string;
};

const URL_SPLIT_REGEX = /(https?:\/\/[^\s)]+)/g;
const URL_MATCH_REGEX = /^https?:\/\/[^\s)]+$/;
const DEFAULT_LINK_CLASS_NAME =
  "underline decoration-white/40 underline-offset-4 transition-colors duration-200 ease-out hover:text-[color:var(--color-accent)] hover:decoration-[color:var(--color-accent)]";

export function TextWithLinks(props: TextWithLinksProps) {
  const { value, linkClassName = DEFAULT_LINK_CLASS_NAME } = props;

  return value.split(URL_SPLIT_REGEX).map(function (part, index) {
    if (URL_MATCH_REGEX.test(part)) {
      return (
        <ExternalLink key={`link-${part}-${index}`} href={part} className={linkClassName}>
          {part}
        </ExternalLink>
      );
    }

    return <span key={`text-${index}`}>{part}</span>;
  });
}
