import React from 'react';
import ThemeRegistry from '../components/ThemeRegistry';
import NavBar from '../components/NavBar';
import './globals.css';
import { Box } from '@mui/material';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <ThemeRegistry>
          <NavBar />

          <Box component="main" sx={{ minHeight: '80vh', py: { xs: 2, md: 4 } }}>
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
