"use client";

import React, { useState, useRef } from 'react';
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

  // Ref for the menu button (fixes iOS Safari issue)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleToggleMenu = () => {
    if (open) {
      setAnchorEl(null); // close if already open
    } else {
      setAnchorEl(menuButtonRef.current); // open using ref
    }
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
              zIndex: 1100 
            }}
          >
            <Container maxWidth="lg">
              <Toolbar disableGutters sx={{ gap: 1, justifyContent: 'space-between' }}>
                
                {/* LOGO */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    <ShoppingCartIcon color="primary" sx={{ fontSize: { xs: 24, sm: 28 }, mr: 0.5 }} />
                    <Typography 
                      variant="h6" 
                      color="primary" 
                      sx={{ 
                        fontWeight: 'bold', 
                        fontSize: { xs: '0.9rem', sm: '1.25rem' } 
                      }}
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
                  px: { xs: 0.5, sm: 2 },
                  maxWidth: { xs: '120px', sm: '400px' } 
                }}>
                  <TextField
                    variant="outlined" 
                    size="small" 
                    fullWidth 
                    placeholder="Search..."
                    sx={{ 
                      '& .MuiOutlinedInput-root': { 
                        borderRadius: '20px', 
                        bgcolor: '#f1f3f4',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' } 
                      }
                    }}
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
                  <Button component={Link} href="/account" color="inherit" sx={{ textTransform: 'none' }}>Account</Button>
                  <Button component={Link} href="/cart" color="primary" variant="contained" sx={{ borderRadius: '20px', textTransform: 'none' }}>
                    Cart
                  </Button>
                </Box>

                {/* MOBILE NAV */}
                <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
                  <IconButton 
                    ref={menuButtonRef}   // ✅ attach ref
                    onClick={handleToggleMenu}
                    color="primary"
                    sx={{ 
                      p: 1, 
                      bgcolor: '#f1f3f4',
                      cursor: 'pointer',
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
                    PaperProps={{
                      sx: { width: '180px', mt: 1, borderRadius: 2, boxShadow: 3 }
                    }}
                  >
                    {navItems.map((item) => (
                      <MenuItem 
                        key={item.label} 
                        onClick={handleCloseMenu} 
                        component={Link} 
                        href={item.href}
                        sx={{ fontSize: '0.9rem', py: 1.5 }}
                      >
                        {item.label}
                      </MenuItem>
                    ))}
                    <hr style={{ border: '0.5px solid #eee', margin: '4px 0' }} />
                    <MenuItem onClick={handleCloseMenu} component={Link} href="/account" sx={{ py: 1.5 }}>Account</MenuItem>
                    <MenuItem onClick={handleCloseMenu} component={Link} href="/cart" sx={{ py: 1.5 }}>Cart</MenuItem>
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
