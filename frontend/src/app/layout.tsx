"use client";

import React, { useState, useCallback } from 'react';
import ThemeRegistry from '../components/ThemeRegistry';
import './globals.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Box, AppBar, Toolbar, Typography, Container,
  Button, TextField, InputAdornment, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemText, Divider,
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
  const router = useRouter();

  // useCallback so the reference is stable — avoids accidental re-renders
  const openDrawer  = useCallback(() => setDrawerOpen(true),  []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const handleNavigate = useCallback((href: string) => {
    // Close first, navigate after a tiny delay so the Drawer
    // animation doesn't fight the page transition on iOS
    setDrawerOpen(false);
    setTimeout(() => router.push(href), 50);
  }, [router]);

  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          {/* ── APP BAR ──────────────────────────────────────────────── */}
          <AppBar
            position="sticky"
            elevation={0}
            sx={{
              borderBottom: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
              zIndex: (theme) => theme.zIndex.appBar,
            }}
          >
            <Container maxWidth="lg">
              <Toolbar disableGutters sx={{ gap: 1 }}>

                {/* LOGO */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    <ShoppingCartIcon color="primary" sx={{ fontSize: 28, mr: 1 }} />
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ fontWeight: 'bold', display: { xs: 'none', sm: 'block' } }}
                    >
                      CODED STORE
                    </Typography>
                  </Link>
                </Box>

                {/* SEARCH */}
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', px: { xs: 1, sm: 2 } }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    placeholder="Search..."
                    sx={{
                      maxWidth: '400px',
                      minWidth: { xs: '120px', sm: '200px' },
                      '& .MuiOutlinedInput-root': { borderRadius: '20px', bgcolor: '#f1f3f4' },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                {/* DESKTOP NAV */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center', flexShrink: 0 }}>
                  {navItems.slice(0, 4).map((item) => (
                    <Button
                      key={item.label}
                      component={Link}
                      href={item.href}
                      color="inherit"
                      sx={{ textTransform: 'none', fontWeight: 500 }}
                    >
                      {item.label}
                    </Button>
                  ))}
                  <Button component={Link} href="/account" color="inherit" sx={{ ml: 1, textTransform: 'none' }}>
                    Account
                  </Button>
                  <Button component={Link} href="/cart" color="primary" variant="contained" sx={{ borderRadius: '20px', ml: 1, textTransform: 'none' }}>
                    Cart
                  </Button>
                </Box>

                {/* MOBILE HAMBURGER
                    ─────────────────────────────────────────────────────────
                    KEY FIX: We use a Drawer instead of MUI Menu.
                    MUI Menu renders in a Portal + uses a backdrop div that
                    swallows touch events on iOS Safari. A Drawer avoids
                    this entire class of bugs.

                    The button itself uses `sx={{ WebkitTapHighlightColor: 'transparent' }}`
                    so iOS doesn't show the grey flash that makes it look "broken"
                    even when it's actually working.
                ───────────────────────────────────────────────────────── */}
                <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', flexShrink: 0 }}>
                  <IconButton
                    onClick={openDrawer}
                    color="primary"
                    aria-label="Open navigation menu"
                    sx={{
                      p: 1.5,
                      bgcolor: '#f1f3f4',
                      // Prevents iOS from showing the grey highlight box,
                      // which makes taps look ignored even when they work
                      WebkitTapHighlightColor: 'transparent',
                      cursor: 'pointer',
                      // Minimum 44×44 pt touch target (Apple HIG)
                      minWidth: 44,
                      minHeight: 44,
                      '&:active': { bgcolor: '#e0e0e0' },
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>

              </Toolbar>
            </Container>
          </AppBar>

          {/* ── MOBILE DRAWER ─────────────────────────────────────────
              Replaces MUI Menu entirely.
              • No Portal backdrop fighting touch events
              • No scroll-lock conflicts
              • Native slide animation iOS users expect
              • Full 44pt touch targets on every row
          ───────────────────────────────────────────────────────── */}
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={closeDrawer}
            // ModalProps.keepMounted keeps the DOM node alive so the
            // first tap never hits an unmounted tree
            ModalProps={{ keepMounted: true }}
            PaperProps={{
              sx: { width: 240, pt: 1 },
            }}
          >
            {/* Close button row */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 1, pb: 1 }}>
              <IconButton
                onClick={closeDrawer}
                aria-label="Close menu"
                sx={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Divider />

            <List disablePadding>
              {navItems.map((item, index) => (
                <React.Fragment key={item.label}>
                  {/* Divider before Account to visually separate utility links */}
                  {index === 4 && <Divider sx={{ my: 1 }} />}
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => handleNavigate(item.href)}
                      sx={{
                        py: 1.5,                            // ~48px touch target
                        WebkitTapHighlightColor: 'transparent',
                        '&:active': { bgcolor: 'action.selected' },
                      }}
                    >
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{ fontWeight: index < 4 ? 500 : 400 }}
                      />
                    </ListItemButton>
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Drawer>

          {/* ── MAIN CONTENT ────────────────────────────────────────── */}
          <Box component="main" sx={{ minHeight: '80vh', py: { xs: 2, md: 4 } }}>
            {children}
          </Box>

          {/* ── FOOTER ──────────────────────────────────────────────── */}
          <Box component="footer" sx={{ py: 3, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              &copy; {new Date().getFullYear()} Coded Store
            </Typography>
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
