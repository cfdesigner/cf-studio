// Gerado a partir de tokens.json (CFDesigner) e ajustado: chaves space12, sm/md/pill. Mantenha em sincronia com o JSON.

export type Theme = "cinema" | "daylight";

export const colors = {
  cinema: {
    void: "#0b0c0e",
    surface: "#16181c",
    surfaceRaised: "#202329",
    line: "#2e3238",
    lineStrong: "#5b626c",
    ink: "#eef2f5",
    inkMuted: "#9aa3ad",
    amber: "#d9a441",
    amberText: "#e2b45a",
    amberSoft: "#2a2112",
    onAmber: "#0b0c0e",
    petrol: "#0f4c5c",
    petrolText: "#7cbccb",
    petrolSoft: "#0d2a31",
    onPetrol: "#eef2f5",
    chrome: "#a9a5a5",
    graphite: "#706b68",
    bronze: "#8a6a2a",
    rec: "#ff5a5f",
    focus: "#e2b45a",
    link: "#e2b45a",
  },
  daylight: {
    void: "#f3f4f5",
    surface: "#ffffff",
    surfaceRaised: "#ffffff",
    line: "#d6dade",
    lineStrong: "#7d858e",
    ink: "#0b0c0e",
    inkMuted: "#545c66",
    amber: "#d9a441",
    amberText: "#855d12",
    amberSoft: "#f6ead0",
    onAmber: "#0b0c0e",
    petrol: "#0f4c5c",
    petrolText: "#0f4c5c",
    petrolSoft: "#dcebee",
    onPetrol: "#ffffff",
    chrome: "#706b68",
    graphite: "#a9a5a5",
    bronze: "#6b4e12",
    rec: "#b4232a",
    focus: "#0f4c5c",
    link: "#855d12",
  },
} as const;

export type ColorName = keyof typeof colors.cinema;

export const fontFamilies = {
  display: '"Bebas Neue", "Oswald", Impact, sans-serif',
  heading: '"Montserrat", "Segoe UI", system-ui, sans-serif',
  body: '"Lato", "Open Sans", system-ui, sans-serif',
  mono: '"IBM Plex Mono", ui-monospace, Menlo, monospace',
  /** Palavra de destaque em letra de pincel (principal, escolha do dono em 26/11/2026). */
  script: '"Kaushan Script", "Brush Script MT", cursive',
  /** Alternativas de pincel: mais fluida e mais redonda. */
  scriptFluida: '"Yellowtail", "Brush Script MT", cursive',
  scriptRedonda: '"Damion", "Brush Script MT", cursive',
} as const;

export const textStyles = {
  displayXl: {
    family: "display",
    fontSize: 96,
    lineHeight: 0.92,
    fontWeight: 400,
    letterSpacing: "0.01em",
  },
  displayL: {
    family: "display",
    fontSize: 64,
    lineHeight: 0.95,
    fontWeight: 400,
    letterSpacing: "0.01em",
  },
  displayM: {
    family: "display",
    fontSize: 40,
    lineHeight: 1,
    fontWeight: 400,
    letterSpacing: "0.02em",
  },
  title: {
    family: "heading",
    fontSize: 32,
    lineHeight: "38px",
    fontWeight: 700,
    letterSpacing: "-0.01em",
  },
  heading: {
    family: "heading",
    fontSize: 20,
    lineHeight: "28px",
    fontWeight: 600,
    letterSpacing: "normal",
  },
  eyebrow: {
    family: "heading",
    fontSize: 12,
    lineHeight: "16px",
    fontWeight: 600,
    letterSpacing: "0.18em",
  },
  bodyL: {
    family: "body",
    fontSize: 18,
    lineHeight: "28px",
    fontWeight: 400,
    letterSpacing: "normal",
  },
  body: {
    family: "body",
    fontSize: 16,
    lineHeight: "26px",
    fontWeight: 400,
    letterSpacing: "normal",
  },
  bodySm: {
    family: "body",
    fontSize: 14,
    lineHeight: "22px",
    fontWeight: 400,
    letterSpacing: "normal",
  },
  timecode: {
    family: "mono",
    fontSize: 13,
    lineHeight: "16px",
    fontWeight: 500,
    letterSpacing: "0.04em",
  },
} as const;

export const space = {
  space1: 4,
  space2: 8,
  space3: 12,
  space4: 16,
  space6: 24,
  space8: 32,
  space12: 48,
  space16: 64,
  space24: 96,
} as const;

export const radius = {
  none: 0,
  sm: 2,
  md: 4,
  pill: 999,
} as const;

export const shadow = {
  cinema: {
    shadowFrame: "0 24px 64px rgba(0,0,0,0.6)",
    shadowFlare: "0 0 40px rgba(217,164,65,0.28)",
  },
  daylight: {
    shadowFrame: "0 16px 40px rgba(11,12,14,0.14)",
    shadowFlare: "0 0 0 rgba(0,0,0,0)",
  },
} as const;

export const frame = {
  frameVertical: "9 / 16",
  framePortrait: "4 / 5",
  frameSquare: "1 / 1",
  frameWide: "16 / 9",
  frameScope: "2.39 / 1",
} as const;
