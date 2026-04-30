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
  Box, AppBar, Toolbar, Typography, Container, TextField, InputAdornment, IconButton,
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
              <Toolbar disableGutters sx={{ gap: { xs: 0.75, sm: 1 }, minWidth: 0 }}>
                
                {/* LOGO */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0, minWidth: 0 }}>
                  <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    <ShoppingCartIcon color="primary" sx={{ fontSize: 28, mr: 1 }} />
                    <Typography
                      variant="h6"
                      color="primary"
                      noWrap
                      sx={{ fontWeight: 'bold', fontSize: { xs: '0.85rem', sm: '1.25rem' } }}
                    >
                      CODED STORE
                    </Typography>
                  </Link>
                </Box>

                {/* SEARCH */}
                <Box sx={{ flexGrow: 1, minWidth: 0, display: 'flex', justifyContent: 'center', px: { xs: 0.5, sm: 2 } }}>
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

                {/* MOBILE HAMBURGER */}
                <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', flexShrink: 0 }}>
                  <IconButton
                    onClick={openDrawer}
                    color="primary"
                    aria-label="Open menu"
                    aria-haspopup="dialog"
                    aria-expanded={drawerOpen ? 'true' : undefined}
                    sx={{
                      width: 44,
                      height: 44,
                      bgcolor: '#f1f3f4',
                      cursor: 'pointer',
                      touchAction: 'manipulation',
                      WebkitTapHighlightColor: 'transparent',
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>

          {/* DRAWER */}
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={closeDrawer}
            disableEnforceFocus 
            ModalProps={{ keepMounted: true }}
            PaperProps={{
              sx: { width: 280, pt: 1, zIndex: (theme: Theme) => theme.zIndex.drawer + 100 },
            }}
          >
             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5 }}>
               <Typography variant="subtitle1" fontWeight={700} color="primary">Menu</Typography>
               <IconButton onClick={closeDrawer} size="small">
                 <CloseIcon fontSize="small" />
               </IconButton>
             </Box>
             <Divider />
             <List>
               {navItems.map((item) => (
                 <ListItem key={item.label} disablePadding>
                   <ListItemButton onClick={() => handleNavigate(item.href)} sx={{ py: 2 }}>
                     <ListItemText primary={item.label} />
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
