"use client";

import React, { useState } from 'react';
import ThemeRegistry from '../components/ThemeRegistry';
import './globals.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.alert('menu tapped');
    setMobileNavOpen((open) => !open);
  };

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
            }}
          >
            <Container maxWidth="lg">
              <Toolbar
                disableGutters
                sx={{
                  gap: { xs: 0.75, sm: 1, md: 2 },
                  minWidth: 0,
                  position: 'relative',
                  flexWrap: 'nowrap',
                  alignItems: 'center',
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
                    width: 'auto',
                    minHeight: { xs: 44, md: 'auto' },
                  }}
                >
                  <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', minWidth: 0 }}>
                    <ShoppingCartIcon color="primary" sx={{ fontSize: { xs: 23, sm: 26, md: 28 }, mr: { xs: 0.5, sm: 1 } }} />
                    <Typography
                      variant="h6"
                      color="primary"
                      noWrap
                      sx={{ fontWeight: 'bold', fontSize: { xs: '0.78rem', sm: '1rem', md: '1.25rem' } }}
                    >
                      CODED STORE
                    </Typography>
                  </Link>
                </Box>

                {/* SEARCH */}
                <Box
                  sx={{
                    width: 'auto',
                    flexBasis: { xs: 0, md: 'auto' },
                    flexGrow: 1,
                    minWidth: { xs: 82, sm: 140, md: 240 },
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
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '20px',
                        bgcolor: '#f1f3f4',
                        height: { xs: 36, sm: 40 },
                        fontSize: { xs: '0.8rem', sm: '0.875rem' },
                      },
                      '& .MuiOutlinedInput-input': {
                        px: { xs: 0.5, sm: 1 },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ mr: { xs: 0.25, sm: 1 } }}>
                          <SearchIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                {/* MOBILE NAV TOGGLE */}
                <Box
                  component="button"
                  type="button"
                  onClick={toggleMobileNav}
                  aria-label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  aria-expanded={mobileNavOpen}
                  sx={{
                    display: { xs: 'flex', md: 'none' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    position: 'relative',
                    zIndex: 99999,
                    width: { xs: 40, sm: 44 },
                    height: { xs: 36, sm: 40 },
                    p: 0,
                    border: '1px solid',
                    borderColor: 'primary.main',
                    borderRadius: 1.5,
                    bgcolor: 'background.paper',
                    color: 'primary.main',
                    cursor: 'pointer',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  {mobileNavOpen ? <CloseIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
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

              {/* MOBILE NAV */}
              <Box
                component="nav"
                aria-label="Mobile navigation"
                sx={{
                  display: { xs: mobileNavOpen ? 'grid' : 'none', md: 'none' },
                  gridTemplateColumns: '1fr',
                  gap: 0.5,
                  pb: 1,
                }}
              >
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    style={{ textDecoration: 'none' }}
                  >
                    <Box
                      component="span"
                      sx={{
                        display: 'block',
                        width: '100%',
                        borderRadius: 1,
                        px: 1.5,
                        py: 1.25,
                        color: 'primary.main',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        WebkitTapHighlightColor: 'transparent',
                        '&:active': {
                          bgcolor: 'action.selected',
                        },
                      }}
                    >
                      {item.label}
                    </Box>
                  </Link>
                ))}
              </Box>
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
