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

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // ADDED 'Products' HERE - This updates both Desktop and Mobile automatically
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Categories', href: '/categories' },
    { label: 'Whats New', href: '/whats-new' },
    { label: 'Marketplace', href: '/marketplace'}
  ];

  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppBar 
            position="static" 
            elevation={0} 
            sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}
          >
            <Container maxWidth="lg">
              <Toolbar disableGutters>
                
                {/* LOGO */}
                <Box sx={{ mr: 2 }}>
                  <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    <ShoppingCartIcon color="primary" sx={{ fontSize: 28, mr: 1 }} />
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', display: { xs: 'none', sm: 'block' } }}>
                      CODED STORE
                    </Typography>
                  </Link>
                </Box>

                {/* SEARCH BOX */}
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                  <TextField
                    variant="outlined" size="small" fullWidth placeholder="Search..."
                    sx={{ 
                      maxWidth: '400px',
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
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, ml: 2, alignItems: 'center' }}>
                  {navItems.map((item) => (
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

                {/* MOBILE NAV */}
                <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 1 }}>
                  <IconButton onClick={handleOpenMenu} color="inherit">
                    <MenuIcon />
                  </IconButton>
                  
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleCloseMenu}
                    disableScrollLock
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    {navItems.map((item) => (
                      <MenuItem key={item.label} onClick={handleCloseMenu}>
                        <Link href={item.href} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                          {item.label}
                        </Link>
                      </MenuItem>
                    ))}
                    <MenuItem onClick={handleCloseMenu}>
                      <Link href="/account" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>Account</Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseMenu}>
                      <Link href="/cart" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>Cart</Link>
                    </MenuItem>
                  </Menu>
                </Box>

              </Toolbar>
            </Container>
          </AppBar>

          <Box component="main" sx={{ minHeight: '80vh', py: 4 }}>
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