"use client";

import React, { useState } from 'react';
import ThemeRegistry from '../components/ThemeRegistry';
import './globals.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Box, AppBar, Toolbar, Typography, Container, 
  Button, TextField, InputAdornment, IconButton, Menu, MenuItem 
} from '@mui/material';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // FIX 1: Use router.push() instead of component={Link} on MenuItems.
  // MUI MenuItem + Next.js Link breaks touch events on iOS Safari.
  const handleNavigate = (href: string) => {
    handleCloseMenu();
    router.push(href);
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Categories', href: '/categories' },
    { label: 'Whats New', href: '/whats-new' },
    { label: 'Marketplace', href: '/marketplace' }
  ];

  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppBar 
            position="sticky"
            elevation={0} 
            sx={{ 
              borderBottom: '1px solid', 
              borderColor: 'divider', 
              bgcolor: 'background.paper',
              // FIX 2: Ensure AppBar renders above everything, including MUI modals/overlays
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
                      minWidth: { xs: '120px', sm: '200px' },
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
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center', flexShrink: 0 }}>
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

                {/* MOBILE HAMBURGER — FIX 3: flexShrink: 0 prevents it from being crushed by search bar */}
                <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', flexShrink: 0 }}>
                  <IconButton 
                    onClick={handleOpenMenu} 
                    color="primary"
                    aria-label="Open navigation menu"
                    sx={{ 
                      p: 1.5,
                      bgcolor: '#f1f3f4',
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
                    // FIX 4: keepMounted ensures the Menu DOM node exists before first interaction,
                    // preventing a race condition on iOS where the first tap does nothing.
                    keepMounted
                    PaperProps={{
                      sx: { width: '200px', mt: 1.5, borderRadius: 2, boxShadow: 3 }
                    }}
                  >
                    {navItems.map((item) => (
                      // FIX 1 applied: onClick + router.push instead of component={Link}
                      <MenuItem 
                        key={item.label} 
                        onClick={() => handleNavigate(item.href)}
                        // FIX 5: Explicit touch handler for iOS Safari reliability
                        onTouchEnd={() => handleNavigate(item.href)}
                      >
                        {item.label}
                      </MenuItem>
                    ))}
                    <hr style={{ border: '0.5px solid #eee', margin: '8px 0' }} />
                    <MenuItem onClick={() => handleNavigate('/account')} onTouchEnd={() => handleNavigate('/account')}>
                      Account
                    </MenuItem>
                    <MenuItem onClick={() => handleNavigate('/cart')} onTouchEnd={() => handleNavigate('/cart')}>
                      Cart
                    </MenuItem>
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
