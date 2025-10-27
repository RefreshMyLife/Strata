/* https://mui.com/customization/theming/ */
import { ThemeOptions, createTheme } from '@mui/material/styles';

const fontFamily = ["Space Grotesk", 'Arial', 'sans-serif'].join(',');

export const FONTS = {
  primary: fontFamily,
  secondary: fontFamily,
  heading: "'Chakra Petch', sans-serif",
  labels: "'Space Grotesk', sans-serif",
  inter: "'Inter Tight', sans-serif",
  space: "'Space Grotesk', sans-serif",
};

export const PALETTE = {
  mode: 'dark',
  background: {
    // default: invertColor('rgba(24, 29, 39, 1)'),
    // paper: invertColor('rgba(30, 36, 49, 1)'),
    // black: invertColor('#1F2028'),
    "paper": "rgba(15, 19, 22, .91)",
    "default": "rgb(15, 18, 23)",
    "accent": "#eee"
  },
  primary: {
    // light: invertColor('#EBBF6E'),
    // main: invertColor('#EBBF6E'),
    // dark: 'var(--color-blue-hover)',
    "50": "#F0F7FF",
    "100": "#C2E0FF",
    "200": "#99CCF3",
    "300": "#66B2FF",
    "400": "#3399FF",
    "500": "#329EE1",
    "600": "#0072E5",
    "700": "#0059B2",
    "800": "#004C99",
    "900": "#003A75",
    "main": "#329EE1",
    "light": "#66B2FF",
    "dark": "#0059B2",
    "contrastText": "#000",
  },
  secondary: {
    // light: invertColor('rgba(45, 53, 73, 1)'),
    // main: invertColor('rgba(24, 29, 42, 1)'),
    // dark: invertColor('rgba(18, 22, 32, 1)'),
    "50": "#F3F6F9",
    "100": "#E5EAF2",
    "200": "#DAE2ED",
    "300": "#C7D0DD",
    "400": "#B0B8C4",
    "500": "#9DA8B7",
    "600": "#6B7A90",
    "700": "#434D5B",
    "800": "#303740",
    "900": "#1C2025",
    "main": "#DAE0E7",
    "contrastText": "#2F3A46",
    "light": "rgba(180, 180, 178, .1)",//"#232430",
    "dark": "rgba(180, 180, 178, .4)"
  },
  text: {
    // primary: 'rgb(0,0,0)', //invertColor('rgba(255, 255, 255, 1)'),
    // secondary: 'rgb(0,0,0)', //invertColor('rgba(170, 179, 202, 1)'),
    // disabled: 'rgb(0,0,0)', //invertColor('rgba(161, 161, 161, 1)'),
    "primary": "#fff", //"#E5F1FF",
    "secondary": "#DBDBDB",//"#969AB6", //"#CDE1FA",//"#2a2a2f",
    "tertiary": "#6EA9F5",
    "hint": "#414A5A",
    "disabled": "rgba(255, 255, 255, 0.38)"
  },
  button: {
    // main: invertColor('rgba(58, 120, 255, 1)'),
    // medium: invertColor('rgba(38, 90, 204, 1)'),
    // dark: invertColor('rgba(27, 67, 152, 1)'),
    main: 'white',
    light: 'rgba(109, 134, 164, .13)',
    medium: '#329EE1', //'rgba(38, 90, 204, 1)',
    dark: '#2F60B5',
    text: 'black',
    textLight: '#B4B4B2',//'#6EA9F5',
    stroke: '#2F60B5',
    strokeLight: '#27354C',
  },
  interactive: {
    // primary: invertColor('rgba(58, 120, 255, 1)'),
    // success: invertColor('rgba(0, 195, 142, 1)'),
    // success10: invertColor('rgba(24, 223, 139, 0.1)'),
    // success50: invertColor('rgba(24, 223, 139, 0.5)'),
    // error: invertColor('rgba(233, 61, 102, 1)'),
    // error50: invertColor('rgba(233, 61, 68, 0.5)'),
    // tan: invertColor('rgba(255, 231, 206, 1)'),
    // delimiter: invertColor('rgba(33, 41, 58, 1)'),
    // warning: invertColor('rgba(245, 120, 66, 1)'),
    // hover: invertColor('rgba(32, 39, 56, 1)'),

    primary: '#20B1FF',
    //primary: '#7F99FB',
    success: '#07AE3B',//'#FEEE48',
    success10: 'rgba(24, 223, 139, 0.1)',
    success50: '#07AE3B',
    error: 'rgba(233, 61, 102, 1)',
    error50: 'rgba(233, 61, 68, 0.5)',
    tan: 'rgba(255, 231, 206, 1)',
    delimiter: 'rgba(33, 41, 58, 1)',
    warning: 'rgb(255, 119, 16)',
    //hover: 'rgba(32, 39, 56, 1)',
  },
};

export const BREAKPOINTS = {
  values: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1280,
    xxl: 1440,
  },
};

export const SPACING = 4;

export type TypographyVariant =
  | 'button'
  | 'caption'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'inherit'
  | 'overline'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'small1'
  | 'small2'
  | undefined;

export const SHAPE = {
  borderRadius: {
    verySmall: SPACING,
    small: SPACING * 2,
    medium: SPACING * 4,
    large: SPACING * 6,
  } as any, // our custom types seem to clash with the default MUI types
  iconSize: {
    small: SPACING * 3,
    medium: SPACING * 4,
    large: SPACING * 5,
    xLarge: SPACING * 6,
    xxLarge: SPACING * 10,
  },
  footerHeight: '56px',
  drawerWidthDesktop: '0px',
  drawerWidthTablet: '80px',
};

export default createTheme({
  spacing: SPACING,
  palette: PALETTE,
  breakpoints: BREAKPOINTS,
  shape: SHAPE,
  typography: {
    fontFamily: FONTS.primary,
    fontFamilyHeading: FONTS.heading,
    fontSize: 14,
    color: PALETTE.text.primary,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      fontFamily: FONTS.heading
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '1rem',
      fontWeight: 600,
      letterSpacing: '0.3px',
      lineHeight: 1.5,
    },
    small1: {
      fontSize: '1rem',
      fontWeight: 600,
      color: PALETTE.text.secondary,
      lineHeight: 1.5,
    },
    small2: {
      fontSize: '1rem',
      fontWeight: 400,
      color: PALETTE.text.secondary,
      lineHeight: 1.5,
    },
    tiny: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: PALETTE.background.paper,
          borderRadius: SHAPE.borderRadius.large,
          padding: SPACING * 6,
          boxShadow: 'none',
          //border: '1px solid rgb(225, 230, 235)'
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
        paper: {
          padding: 0,
          borderRadius: 0,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          top: 0,
          border: 'none',
        },
      },
    }
  },
} as ThemeOptions);


function invertColor(color) {
  if (color.startsWith("#")) {
    // Hex color format
    color = color.slice(1); // Remove the "#" character
    const r = parseInt(color.slice(0, 2), 16);
    const g = parseInt(color.slice(2, 4), 16);
    const b = parseInt(color.slice(4, 6), 16);

    const invertedR = 255 - r;
    const invertedG = 255 - g;
    const invertedB = 255 - b;

    const invertedHex = (
      (1 << 24) | (invertedR << 16) | (invertedG << 8) | invertedB
    ).toString(16).slice(1).toUpperCase();

    return `#${invertedHex}`;
  } else if (color.startsWith("rgb")) {
    // RGB color format
    const values = color.match(/\d+/g).map(Number);
    if (values.length < 3) {
      throw new Error("Invalid RGB color format");
    }

    const invertedR = 255 - values[0];
    const invertedG = 255 - values[1];
    const invertedB = 255 - values[2];

    return `rgb(${invertedR}, ${invertedG}, ${invertedB})`;
  } else {
    throw new Error("Invalid color format. Supported formats: Hex (e.g., #RRGGBB), RGB (e.g., rgb(255, 0, 0))" + color);
  }
}
