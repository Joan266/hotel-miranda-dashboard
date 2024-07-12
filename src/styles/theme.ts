export const theme = {
  fontFamily: "'Poppins', sans-serif",
  colors: {
    primaryRed: '#E23428',
    black: '#212121',
    lightGray: '#F8F8F8',
    white: '#FFFFFF',
    gray: '#799283',
    mediumBlack: '#393939',
    darkGreen: '#135846',
  },
} as const;

export type Theme = typeof theme;
