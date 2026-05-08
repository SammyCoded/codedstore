import type { Viewport } from 'next';
import { Box } from '@mui/material';
import ThemeRegistry from '../components/ThemeRegistry';
import NavBar from '../components/NavBar';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Box className="app-shell">
            <NavBar />

            <Box
              component="main"
              sx={{
                width: '100%',
                maxWidth: '100vw',
                minHeight: '80vh',
                overflowX: 'hidden',
                py: { xs: 2, md: 4 },
              }}
            >
              {children}
            </Box>
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
