"use client";

import React from 'react';
import ThemeRegistry from '../components/ThemeRegistry';
import './globals.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import {
  Box, AppBar, Toolbar, Typography, Container, TextField, InputAdornment, Button,
} from '@mui/material';

const navItems = [
  { label: 'Home',        href: '/' },
  { label: 'Categories',  href: '/categories' },
  { label: "What's New",  href: '/whats-new' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Account',     href: '/account' },
  { label: 'Cart',        href: '/cart' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <ThemeRegistry>
          <AppBar
            elevation={0}
            sx={{
              position: ['-webkit-sticky', 'sticky'],
              top: 0,
              borderBottom: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
              zIndex: (theme) => theme.zIndex.appBar,
              WebkitTransform: 'translateZ(0)',
            }}
          >
            <Container maxWidth="lg">
              <Toolbar
                disableGutters
                sx={{
                  gap: { xs: 1, md: 2 },
                  minWidth: 0,
                  position: 'relative',
                  flexWrap: { xs: 'wrap', md: 'nowrap' },
                  alignItems: { xs: 'flex-start', md: 'center' },
                  py: { xs: 1, md: 0 },
                }}
              >
                
                {/* LOGO */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexShrink: 0,
                    minWidth: 0,
                    width: { xs: '100%', md: 'auto' },
                    minHeight: { xs: 44, md: 'auto' },
                  }}
                >
                  <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    <ShoppingCartIcon color="primary" sx={{ fontSize: 28, mr: 1 }} />
                    <Typography
                      variant="h6"
                      color="primary"
                      noWrap
                      sx={{ fontWeight: 'bold', fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.25rem' } }}
                    >
                      CODED STORE
                    </Typography>
                  </Link>
                </Box>

                {/* SEARCH */}
                <Box
                  sx={{
                    order: { xs: 3, md: 0 },
                    width: { xs: '100%', md: 'auto' },
                    flexBasis: { xs: '100%', md: 'auto' },
                    flexGrow: 1,
                    minWidth: { xs: 0, md: 240 },
                    display: 'flex',
                    justifyContent: 'center',
                    px: { xs: 0, md: 2 },
                  }}
                >
                  <TextField
                    variant="outlined" size="small" fullWidth placeholder="Search..."
                    sx={{
                      maxWidth: '400px',
                      minWidth: 0,
                      '& .MuiOutlinedInput-root': { borderRadius: '20px', bgcolor: '#f1f3f4' },
                    }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>,
                    }}
                  />
                </Box>

                {/* DESKTOP NAV */}
                <Box
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    alignItems: 'center',
                    gap: 0.5,
                    flexShrink: 0,
                    width: { xs: 0, md: 'auto' },
                    overflow: 'hidden',
                    pointerEvents: { xs: 'none', md: 'auto' },
                  }}
                >
                  {navItems.map((item) => (
                    <Button
                      key={item.label}
                      component={Link}
                      href={item.href}
                      color="primary"
                      sx={{
                        px: 1.25,
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        textTransform: 'none',
                      }}
                    >
                      {item.label}
                    </Button>
                  ))}
                </Box>
              </Toolbar>
            </Container>
          </AppBar>

          <Box component="main" sx={{ minHeight: '80vh', py: { xs: 2, md: 4 } }}>
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
