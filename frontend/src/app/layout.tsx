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
  Button, TextField, InputAdornment, IconButton, Menu, MenuItem 
} from '@mui/material';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Optimized for both Mouse and Touch
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Categories', href: '/categories' },
    { label: 'Whats New', href: '/whats-new' },
    { label: 'Marketplace', href: '/marketplace'}
  ];

  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <ThemeRegistry>
          <AppBar 
            position="sticky" 
            elevation={0} 
            sx={{ 
              borderBottom: '1px solid', 
              borderColor: 'divider', 
              bgcolor: 'background.paper',
              zIndex: 1100,
              // Fixes "flicker" on some iPhones during scroll
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            <Container maxWidth="lg">
              <Toolbar disableGutters sx={{ gap: { xs: 0.5, sm: 1 } }}>
                
                {/* LOGO */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
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

                {/* SEARCH BOX */}
                <Box sx={{ 
                  flexGrow: 1, 
                  display: 'flex', 
                  justifyContent: 'center',
                  px: { xs: 1, sm: 2 } 
                }}>
                  <TextField
                    variant="outlined" 
                    size="small" 
                    fullWidth 
                    placeholder="Search..."
                    sx={{ 
                      maxWidth: '400px',
                      minWidth: { xs: '100px', sm: '200px' },
                      '& .MuiOutlinedInput-root': { borderRadius: '20px', bgcolor: '#f1f3f4' }
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
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center' }}>
                  {navItems.map((item) => (
                    <Button key={item.label} component={Link} href={item.href} color="inherit" sx={{ textTransform: 'none' }}>
                      {item.label}
                    </Button>
                  ))}
                  <Button component={Link} href="/account" color="inherit" sx={{ textTransform: 'none' }}>Account</Button>
                  <Button component={Link} href="/cart" color="primary" variant="contained" sx={{ borderRadius: '20px', textTransform: 'none' }}>
                    Cart
                  </Button>
                </Box>

                {/* MOBILE NAV TRAY - THE IPHONE FIX */}
                <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
                  <IconButton 
                    id="mobile-menu-button"
                    aria-haspopup="true"
                    // TRIGGER 1: Standard click
                    onClick={handleOpenMenu} 
                    // TRIGGER 2: Immediate touch (The iPhone secret weapon)
                    onTouchStart={(e) => {
                       // Only trigger if it's a touch to avoid double-firing
                       if (e.type === 'touchstart') handleOpenMenu(e);
                    }}
                    color="primary"
                    sx={{ 
                      p: 1.2, 
                      bgcolor: '#f1f3f4',
                      // TRIGGER 3: Essential CSS for Safari
                      cursor: 'pointer', 
                      pointerEvents: 'auto',
                      WebkitTapHighlightColor: 'transparent', 
                      '&:active': { bgcolor: '#e0e0e0' } 
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                  
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleCloseMenu}
                    disableScrollLock
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    // Use SlotProps to ensure the Paper element is reachable on touch
                    slotProps={{
                      paper: {
                        sx: { width: '200px', mt: 1.5, borderRadius: 2, boxShadow: 3 }
                      }
                    }}
                  >
                    {navItems.map((item) => (
                      <MenuItem key={item.label} onClick={handleCloseMenu} component={Link} href={item.href}>
                        {item.label}
                      </MenuItem>
                    ))}
                    <hr style={{ border: '0.5px solid #eee', margin: '8px 0' }} />
                    <MenuItem onClick={handleCloseMenu} component={Link} href="/account">Account</MenuItem>
                    <MenuItem onClick={handleCloseMenu} component={Link} href="/cart">Cart</MenuItem>
                  </Menu>
                </Box>

              </Toolbar>
            </Container>
          </AppBar>

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