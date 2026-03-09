export type QrDotStyle =
  | "square"
  | "dots"
  | "rounded"
  | "extra-rounded"
  | "classy";

export type QrEyeFrameStyle = "square" | "dot" | "extra-rounded";

export interface QrGradientConfig {
  enabled: boolean;
  color: string;
}

export interface QrConfig {
  text: string;
  dotsType: QrDotStyle;
  cornersType: QrEyeFrameStyle;
  cornersDotType: QrEyeFrameStyle;
  fgColor: string;
  bgColor: string;
  useGradient: boolean;
  gradientColor: string;
  logo: string;
  size: number;
}

