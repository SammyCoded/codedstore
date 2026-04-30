"use client";

import React, { useState, useCallback } from 'react';
import ThemeRegistry from '../components/ThemeRegistry';
import { Theme } from '@mui/material/styles';
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

  const openDrawer  = useCallback(() => setDrawerOpen(true),  []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const handleNavigate = useCallback((href: string) => {
    setDrawerOpen(false);
    router.push(href);
  }, [router]);

  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <ThemeRegistry>
          {/* ── APP BAR ──────────────────────────────────────────────── */}
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
              <Toolbar disableGutters sx={{ gap: 1 }}>

                {/* LOGO */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    <ShoppingCartIcon color="primary" sx={{ fontSize: 28, mr: 1 }} />
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ 
                        fontWeight: 'bold', 
                        display: 'block',
                        fontSize: { xs: '0.9rem', sm: '1.25rem' } 
                      }}
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
                      minWidth: { xs: '80px', sm: '200px' },
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
                    <Button key={item.label} component={Link} href={item.href} color="inherit" sx={{ textTransform: 'none' }}>
                      {item.label}
                    </Button>
                  ))}
                  <Button component={Link} href="/account" color="inherit" sx={{ ml: 1, textTransform: 'none' }}>Account</Button>
                  <Button component={Link} href="/cart" color="primary" variant="contained" sx={{ borderRadius: '20px', ml: 1, textTransform: 'none' }}>
                    Cart
                  </Button>
                </Box>

                {/* MOBILE HAMBURGER */}
                <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', flexShrink: 0 }}>
                  <IconButton
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      openDrawer();
                    }}
                    onClick={openDrawer}
                    color="primary"
                    aria-label="Open navigation menu"
                    sx={{
                      p: 1.2,
                      bgcolor: '#f1f3f4',
                      WebkitTapHighlightColor: 'transparent',
                      cursor: 'pointer', 
                      minWidth: 44,
                      minHeight: 44,
                      touchAction: 'manipulation',
                      '&:active': { bgcolor: '#e0e0e0' },
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>

              </Toolbar>
            </Container>
          </AppBar>

          {/* ── MOBILE DRAWER ───────────────────────────────────────── */}
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={closeDrawer}
            // FIX: Prevent aria-hidden focus conflicts
            disableEnforceFocus
            disableScrollLock={false}
            ModalProps={{ 
              keepMounted: true,
              // Fix for older WebKit Modal layering
              disablePortal: false 
            }}
            PaperProps={{
              sx: {
                width: 280,
                pt: 1,
                zIndex: (theme: Theme) => theme.zIndex.drawer + 100,
                boxShadow: '-4px 0 20px rgba(0,0,0,0.12)',
              },
            }}
          >
             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5 }}>
               <Typography variant="subtitle1" fontWeight={700} color="primary">Menu</Typography>
               <IconButton onClick={closeDrawer} size="small" sx={{ WebkitTapHighlightColor: 'transparent' }}>
                 <CloseIcon fontSize="small" />
               </IconButton>
             </Box>
             <Divider />
             <List disablePadding>
               {navItems.map((item, index) => (
                 <React.Fragment key={item.label}>
                   {index === 4 && <Divider sx={{ my: 1 }} />}
                   <ListItem disablePadding>
                     <ListItemButton 
                       onClick={() => handleNavigate(item.href)} 
                       sx={{ py: 2, WebkitTapHighlightColor: 'transparent' }}
                      >
                       <ListItemText primary={item.label} />
                     </ListItemButton>
                   </ListItem>
                 </React.Fragment>
               ))}
             </List>
          </Drawer>

          {/* ── MAIN CONTENT ────────────────────────────────────────── */}
          <Box 
            component="main" 
            // FIX: Explicitly handle background state for accessibility
            aria-hidden={drawerOpen}
            sx={{ minHeight: '80vh', py: { xs: 2, md: 4 } }}
          >
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