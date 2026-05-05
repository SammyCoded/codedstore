"use client";

import React, { useCallback, useState } from 'react';
import ThemeRegistry from '../components/ThemeRegistry';
import './globals.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import {
  Box, AppBar, Toolbar, Typography, Container, TextField, InputAdornment, Button,
  IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider,
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
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

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
                    width: { xs: 'calc(100% - 52px)', md: 'auto' },
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

                {/* MOBILE MENU BUTTON */}
                <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', justifyContent: 'flex-end', ml: 'auto', flexShrink: 0 }}>
                  <IconButton
                    component="button"
                    type="button"
                    onClick={openDrawer}
                    color="primary"
                    aria-label="Open menu"
                    aria-haspopup="dialog"
                    aria-expanded={drawerOpen ? 'true' : undefined}
                    edge="end"
                    disableRipple
                    sx={{
                      minWidth: 44,
                      minHeight: 44,
                      p: 1,
                      bgcolor: '#f1f3f4',
                      flexShrink: 0,
                      pointerEvents: 'auto',
                      '&:hover': {
                        bgcolor: '#e8eaed',
                      },
                    }}
                  >
                    <MenuIcon fontSize="medium" />
                  </IconButton>
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

          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={closeDrawer}
            sx={{ zIndex: 20000 }}
            ModalProps={{
              keepMounted: true,
              sx: { zIndex: 20000 },
            }}
            PaperProps={{
              sx: {
                width: { xs: 'min(86vw, 320px)', sm: 320 },
                maxWidth: 360,
                pt: 1,
                zIndex: 20001,
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5 }}>
              <Typography variant="subtitle1" fontWeight={700} color="primary">
                Menu
              </Typography>
              <IconButton onClick={closeDrawer} size="small" aria-label="Close menu">
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
            <Divider />
            <List>
              {navItems.map((item) => (
                <ListItem key={item.label} disablePadding sx={{ width: '100%' }}>
                  <ListItemButton
                    component={Link}
                    href={item.href}
                    onClick={closeDrawer}
                    sx={{
                      width: '100%',
                      minHeight: 52,
                      px: 2.5,
                      py: 1.5,
                    }}
                  >
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        noWrap: true,
                        fontWeight: 600,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>

          <Box component="main" sx={{ minHeight: '80vh', py: { xs: 2, md: 4 } }}>
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
