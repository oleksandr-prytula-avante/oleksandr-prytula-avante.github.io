type PipeSeparatorProps = {
  variant?: "default" | "accent";
  hideOnMobile?: boolean;
  hideOnMobileStack?: boolean;
  hideBetween1024And1440?: boolean;
  hasMargin?: boolean;
};

export function PipeSeparator(props: PipeSeparatorProps) {
  const {
    variant = "default",
    hideOnMobile = false,
    hideOnMobileStack = false,
    hideBetween1024And1440 = false,
    hasMargin = false,
  } = props;

  const classes = [
    variant === "accent" ? "text-[color:var(--color-accent)]" : "text-white/60",
    hideOnMobile ? "max-[767px]:hidden" : "",
    hideOnMobileStack ? "max-[640px]:hidden" : "",
    hideBetween1024And1440 ? "timeline-hide-between-1024-1440" : "",
    hasMargin ? "mx-2" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return <span className={classes || undefined}>|</span>;
}
