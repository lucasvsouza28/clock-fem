import { createStitches } from '@stitches/react';

export const {
    config,
    css,
    createTheme,
    getCssText,
    globalCss,
    keyframes,
    prefix,
    reset,
    styled,
    theme,
} = createStitches({
  theme: {
    colors: {
      primary: '#FFF',
      secondary: '#FFF',
      bgDetails: '#000',
    },
    fonts: {
      Inter: 'Inter'
    },
    fontWeights: {
      300: '300',
      400: '400',
      700: '700'
    },
  },
  media:{
    xs: '(max-width: 767px)',
    sm: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
  },
  utils: {
    px: (value: string) => ({
      paddingLeft: value,
      paddingRight: value,
    })
  }
});

export const globalStyles = globalCss({
    html: {
    },
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
    body: {
      color: '$primary',
      fontFamily: '$Inter, sans-serif'
    },
    h1: {
      fontWeight: 'bold',
      fontSize: '100px',
      lineHeight: '100px',
      ['@sm']: {
        fontSize: '200px',
        lineHeight: '200px',
      },
    },
    h2: {
      fontWeight: 'bold',
      fontSize: '56px',
      lineHeight: '68px',
    },
    h3: {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '24px',
      lineHeight: '28px',
      letterSpacing: '4.8px',
      textTransform: 'uppercase',
    },
    h4: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      textTransform: 'uppercase',
      fontSize: '18px',
      lineHeight: '28px',
      letterSpacing: '3.6px',
      '@sm': {
        fontSize: '20px',
        lineHeight: '28px',
        letterSpacing: '4px',
      }
    },
    h5: {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '28px',
    },
    h6: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '15px',
      lineHeight: '28px',
      letterSpacing: '3px',
      textTransform: 'uppercase',
    }
});

export const lightTheme = createTheme({
  colors: {
    secondary: '#303030',
    bgDetails: '#979797',
  }
});
