export const backgrounds = [
  "BlueTriangles",
  "Constellation",
  "Dalmation",
  "Diamonds",
  "Polka",
  "Prism",
  "Rainbow",
  "RosePetals",
  "Scales",
  "Shapes",
  "Spiral",
  "Squares",
] as const;

export type BackgroundId = (typeof backgrounds)[number];
