'use client';
import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Your brand blue
    },
    background: {
      default: '#f8f9fa', // Light grey for the "Main" body
      paper: '#ffffff',   // Pure white for Nav and Footer
    },
    divider: 'rgba(0, 0, 0, 0.12)', // Subtle lines for segmenting
  },
  components: {
    // 1. Styling the Nav Bar (AppBar)
    MuiAppBar: {
      defaultProps: {
        elevation: 0, // Flat look
        position: 'sticky',
      },
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#333',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        },
      },
    },
    // 2. Styling the Footer/Containers
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
    },
  },
});

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        {/* CssBaseline resets browser styles to match your theme */}
        <CssBaseline /> 
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

export default ThemeRegistry;