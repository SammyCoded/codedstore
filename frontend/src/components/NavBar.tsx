"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((isOpen) => !isOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
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
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
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
              minWidth: { xs: 0, sm: 140, md: 240 },
              display: { xs: 'none', sm: 'flex' },
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
            color="primary"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-controls="mobile-navigation-menu"
            aria-haspopup="true"
            aria-expanded={mobileMenuOpen}
            onClick={toggleMobileMenu}
            sx={{
              display: { xs: 'inline-flex', md: 'none' },
              flexShrink: 0,
              ml: 'auto',
              position: 'relative',
              zIndex: (theme) => theme.zIndex.appBar + 1,
              width: 44,
              height: 44,
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
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

        <Box
          id="mobile-navigation-menu"
          sx={{
            display: { xs: mobileMenuOpen ? 'block' : 'none', md: 'none' },
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: { xs: 12, sm: 24 },
            width: 'min(260px, calc(100vw - 24px))',
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            boxShadow: 8,
            overflow: 'hidden',
            zIndex: (theme) => theme.zIndex.appBar + 2,
          }}
        >
          {navItems.map((item) => (
            <Box
              key={item.label}
              component={Link}
              href={item.href}
              onClick={closeMobileMenu}
              sx={{
                display: 'block',
                minHeight: 48,
                px: 2,
                py: 1.5,
                color: 'primary.main',
                fontWeight: 700,
                textDecoration: 'none',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {item.label}
            </Box>
          ))}
        </Box>
      </Container>
    </AppBar>
  );
}
