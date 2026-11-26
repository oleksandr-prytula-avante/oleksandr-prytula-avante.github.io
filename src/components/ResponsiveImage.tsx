import type { ImgHTMLAttributes } from "react";

type ResponsiveImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc: string;
  avifSrc: string;
};

export function ResponsiveImage({
  fallbackSrc,
  avifSrc,
  alt = "",
  ...props
}: ResponsiveImageProps) {
  return (
    <picture>
      <source srcSet={avifSrc} type="image/avif" />
      <img
        src={fallbackSrc}
        alt={alt}
        decoding="async"
        loading="lazy"
        {...props}
      />
    </picture>
  );
}
