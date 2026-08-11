export type PaletteRole =
  | "primary"
  | "secondary"
  | "accent"
  | "background"
  | "text";

export type PrototypeType =
  | "website"
  | "mobile"
  | "blog";

export interface PaletteColor {
  name: string;
  role: PaletteRole;

  red: number;
  green: number;
  blue: number;

  reason: string;
}

export interface TypographyDirection {
  headingStyle: string;
  bodyStyle: string;
  description: string;
}

export interface UIStyle {
  borderRadius: "small" | "medium" | "large";
  spacing: "compact" | "balanced" | "spacious";
  visualStyle: string;
  buttonStyle: string;
  cardStyle: string;
}

export interface PrototypeCopy {
  brandName: string;

  headline: string;
  subheadline: string;

  primaryCta: string;

  featureOne: string;
  featureTwo: string;
  featureThree: string;

  articleOne: string;
  articleTwo: string;
  articleThree: string;
}

export interface BrandAnalysis {
  name: string;

  summary: string;

  mood: string[];

  palette: PaletteColor[];

  typography: TypographyDirection;

  uiStyle: UIStyle;

  copy: PrototypeCopy;
}

export function colorToRGB(
  color: PaletteColor
) {
  return `rgb(${color.red}, ${color.green}, ${color.blue})`;
}

export function getColorByRole(
  analysis: BrandAnalysis,
  role: PaletteRole
) {
  return analysis.palette.find(
    (color) => color.role === role
  );
}

export function getRGBByRole(
  analysis: BrandAnalysis,
  role: PaletteRole,
  fallback: string
) {
  const color = getColorByRole(
    analysis,
    role
  );

  if (!color) {
    return fallback;
  }

  return colorToRGB(color);
}