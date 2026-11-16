type ZoomIconProps = {
  isZoomed: boolean;
};

export function ZoomIcon({ isZoomed }: ZoomIconProps) {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 4.5 4.5M7.5 10.5h6" />
      {!isZoomed && <path d="M10.5 7.5v6" />}
    </svg>
  );
}
