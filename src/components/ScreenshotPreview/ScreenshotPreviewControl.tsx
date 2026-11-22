import type { ReactNode } from "react";

type ScreenshotPreviewControlProps = {
  label: string;
  children: ReactNode;
  onClick: () => void;
  isPressed?: boolean;
};

export function ScreenshotPreviewControl({
  label,
  children,
  onClick,
  isPressed,
}: ScreenshotPreviewControlProps) {
  return (
    <button
      type="button"
      className="subtle-border subtle-border--quiet control-label screenshot-preview__control"
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-pressed={isPressed}
    >
      {children}
    </button>
  );
}
