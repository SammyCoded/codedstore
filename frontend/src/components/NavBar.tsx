"use client";

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Categories', href: '/categories' },
  { label: "What's New", href: '/whats-new' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Account', href: '/account' },
  { label: 'Cart', href: '/cart' },
];

export default function NavBar() {
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<HTMLElement | null>(null);
  const mobileNavOpen = Boolean(mobileMenuAnchor);

  const openMobileNav = () => {
    setMobileMenuAnchor(mobileMenuButtonRef.current);
  };

  const openMobileNavFromTouch = (event: React.TouchEvent<HTMLButtonElement>) => {
    event.preventDefault();
    openMobileNav();
  };

  const closeMobileNav = () => {
    setMobileMenuAnchor(null);
  };

  return (
    <AppBar
      elevation={0}
      sx={{
        position: 'sticky',
        WebkitPosition: 'sticky',
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
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Search..."
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

          <IconButton
            ref={mobileMenuButtonRef}
            type="button"
            color="primary"
            onClick={openMobileNav}
            onTouchEnd={openMobileNavFromTouch}
            aria-label="Open navigation menu"
            aria-controls={mobileNavOpen ? 'mobile-navigation-menu' : undefined}
            aria-expanded={mobileNavOpen}
            aria-haspopup="menu"
            sx={{
              display: { xs: 'inline-flex', md: 'none' },
              flexShrink: 0,
              position: 'relative',
              zIndex: (theme) => theme.zIndex.appBar + 1,
              width: 44,
              height: 44,
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <MenuIcon />
          </IconButton>

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

        <Menu
          id="mobile-navigation-menu"
          anchorEl={mobileMenuAnchor}
          open={mobileNavOpen}
          onClose={closeMobileNav}
          keepMounted
          disableScrollLock
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          slotProps={{
            paper: {
              sx: {
                display: { xs: 'block', md: 'none' },
                minWidth: 190,
                mt: 0.5,
              },
            },
          }}
        >
          {navItems.map((item) => (
            <MenuItem
              key={item.label}
              component={Link}
              href={item.href}
              onClick={closeMobileNav}
              sx={{
                minHeight: 44,
                fontWeight: 700,
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </Container>
    </AppBar>
  );
}
