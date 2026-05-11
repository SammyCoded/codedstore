'use client';
import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  },
  typography: {
    h1: {
      fontSize: '2.125rem',
      lineHeight: 1.12,
      '@media (min-width: 600px)': {
        fontSize: '3rem',
      },
      '@media (min-width: 900px)': {
        fontSize: '4rem',
      },
    },
    h3: {
      fontSize: '2rem',
      lineHeight: 1.16,
      '@media (min-width: 600px)': {
        fontSize: '2.5rem',
      },
      '@media (min-width: 900px)': {
        fontSize: '3rem',
      },
    },
    h4: {
      fontSize: '1.5rem',
      lineHeight: 1.22,
      '@media (min-width: 600px)': {
        fontSize: '1.875rem',
      },
      '@media (min-width: 900px)': {
        fontSize: '2.125rem',
      },
    },
    h5: {
      fontSize: '1.25rem',
      lineHeight: 1.28,
      '@media (min-width: 600px)': {
        fontSize: '1.5rem',
      },
    },
    h6: {
      fontSize: '1.05rem',
      lineHeight: 1.35,
      '@media (min-width: 600px)': {
        fontSize: '1.25rem',
      },
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#333',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          isolation: 'isolate',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          boxSizing: 'border-box',
          maxWidth: '100%',
          paddingLeft: '12px',
          paddingRight: '12px',
          '@media (min-width: 600px)': {
            paddingLeft: '24px',
            paddingRight: '24px',
          },
          '@media (min-width: 900px)': {
            paddingLeft: '32px',
            paddingRight: '32px',
          },
        },
      },
    },
  },
});

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

export default ThemeRegistry;
