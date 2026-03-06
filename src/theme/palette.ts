export const enum EPaletteColor {
  Background = "#272727",
  Accent = "#ff652e",
}

const HEX_PREFIX = "#";
const HEX_PREFIX_LENGTH = 1;
const HEX_COLOR_LENGTH = 6;
const HEX_CHANNEL_LENGTH = 2;
const HEX_RADIX = 16;
const PALETTE_STYLE_ID = "app-palette-vars";

function hexToRgbChannels(hex: string): string {
  const normalized = hex.startsWith(HEX_PREFIX)
    ? hex.slice(HEX_PREFIX_LENGTH)
    : hex;

  if (normalized.length !== HEX_COLOR_LENGTH) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  const red = parseInt(normalized.slice(0, HEX_CHANNEL_LENGTH), HEX_RADIX);
  const green = parseInt(
    normalized.slice(HEX_CHANNEL_LENGTH, HEX_CHANNEL_LENGTH * 2),
    HEX_RADIX,
  );
  const blue = parseInt(
    normalized.slice(HEX_CHANNEL_LENGTH * 2, HEX_CHANNEL_LENGTH * 3),
    HEX_RADIX,
  );

  return `${red} ${green} ${blue}`;
}

export function installPaletteCssVars() {
  if (typeof document === "undefined") {
    return;
  }

  const styleId = PALETTE_STYLE_ID;

  if (document.getElementById(styleId)) {
    return;
  }

  const style = document.createElement("style");

  style.id = styleId;

  const accentRgb = hexToRgbChannels(EPaletteColor.Accent);

  style.textContent = `:root{--color-bg:${EPaletteColor.Background};--color-accent:${EPaletteColor.Accent};--color-accent-rgb:${accentRgb};}`;

  document.head.appendChild(style);
}
