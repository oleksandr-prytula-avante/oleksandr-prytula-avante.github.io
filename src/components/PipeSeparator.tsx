type PipeSeparatorProps = {
  className?: string;
};

export function PipeSeparator(props: PipeSeparatorProps) {
  const { className = "text-white/60" } = props;

  return <span className={className}>|</span>;
}
