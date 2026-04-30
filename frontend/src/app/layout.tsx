"use client";

import React, { useState } from 'react';
import ThemeRegistry from '../components/ThemeRegistry';
import './globals.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { 
  Box, AppBar, Toolbar, Typography, Container, 
  Button, TextField, InputAdornment, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText
} from '@mui/material';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Categories', href: '/categories' },
    { label: 'Whats New', href: '/whats-new' },
    { label: 'Marketplace', href: '/marketplace'},
    { label: 'Account', href: '/account' },
    { label: 'Cart', href: '/cart' }
  ];

  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <ThemeRegistry>
          <AppBar position="sticky" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', zIndex: 1100 }}>
            <Container maxWidth="lg">
              <Toolbar disableGutters sx={{ gap: 1, justifyContent: 'space-between' }}>
                
                {/* LOGO */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    <ShoppingCartIcon color="primary" sx={{ fontSize: { xs: 24, sm: 28 }, mr: 0.5 }} />
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', fontSize: { xs: '0.9rem', sm: '1.25rem' } }}>
                      CODED STORE
                    </Typography>
                  </Link>
                </Box>

                {/* SEARCH BOX */}
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', px: { xs: 0.5, sm: 2 }, maxWidth: { xs: '120px', sm: '400px' } }}>
                  <TextField
                    variant="outlined" 
                    size="small" 
                    fullWidth 
                    placeholder="Search..."
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '20px', bgcolor: '#f1f3f4', fontSize: { xs: '0.75rem', sm: '0.875rem' } } }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                {/* DESKTOP NAV */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center' }}>
                  {navItems.map((item) => (
                    <Button key={item.label} component={Link} href={item.href} color="inherit" sx={{ textTransform: 'none' }}>
                      {item.label}
                    </Button>
                  ))}
                </Box>

                {/* MOBILE NAV */}
                <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
                  <IconButton
                    onClick={() => setDrawerOpen(true)}
                    color="primary"
                    sx={{ p: 1, bgcolor: '#f1f3f4', cursor: 'pointer', '&:active': { bgcolor: '#e0e0e0' } }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>

          {/* Drawer for mobile navigation */}
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <List sx={{ width: 200 }}>
              {navItems.map((item) => (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton component={Link} href={item.href} onClick={() => setDrawerOpen(false)}>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>

          <Box component="main" sx={{ minHeight: '80vh', py: { xs: 2, md: 4 } }}>
            {children}
          </Box>

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
