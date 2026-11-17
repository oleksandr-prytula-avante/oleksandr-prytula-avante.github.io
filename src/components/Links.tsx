import { LINK_ICON_BY_ID } from "../constants/linkIcons";
import { LINKS } from "../constants/links";
import { Tooltip } from "./Tooltip";
import { useI18n } from "../hooks/useI18n";

type LinksProps = {
  size?: "default" | "large";
  isVisible?: boolean;
};

export function Links({ size = "default", isVisible = true }: LinksProps) {
  const i18n = useI18n();
  const isLarge = size === "large";

  const containerClassName = isLarge
    ? "mt-auto flex w-full shrink-0 items-center justify-center gap-6 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    : `absolute bottom-6 flex flex-col gap-4 transition-all duration-500 ease-out ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`;

  return (
    <div className={containerClassName}>
      {LINKS.map(function ({ id, href, labelKey }) {
        const text = i18n.t(labelKey);
        const IconComponent = LINK_ICON_BY_ID[id];

        return (
          <Tooltip key={href} content={text}>
            <a
              className={
                isLarge
                  ? "subtle-border subtle-border--quiet relative flex h-[3rem] w-[3rem] items-center justify-center rounded-full border bg-white/2 transition-colors duration-200 ease-out hover:bg-white/8"
                  : "subtle-border subtle-border--quiet relative flex h-10 w-10 items-center justify-center rounded-full border bg-white/2 transition-colors duration-200 ease-out hover:bg-white/8"
              }
              href={href}
              aria-label={text}
              target="_blank"
              rel="noreferrer"
            >
              <IconComponent isLarge={isLarge} />
            </a>
          </Tooltip>
        );
      })}
    </div>
  );
}
