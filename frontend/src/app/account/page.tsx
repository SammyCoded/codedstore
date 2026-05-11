'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, Container, Typography, Paper, 
  Button, Stack, Grid,
} from '@mui/material';
import Link from 'next/link';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

type AccountUser = {
  name: string;
  email: string;
};

const getStoredUser = (): AccountUser | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const storedUser = localStorage.getItem('user');
  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as AccountUser;
  } catch {
    localStorage.removeItem('user');
    return null;
  }
};

const hasStoredToken = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  return Boolean(localStorage.getItem('token'));
};

export default function AccountPage() {
  const router = useRouter();
  const [user] = useState<AccountUser | null>(() => getStoredUser());
  const [isAuthenticated] = useState(() => hasStoredToken());

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="md" sx={{ mt: { xs: 4, md: 8 }, mb: { xs: 4, md: 8 } }}>
        <Paper elevation={0} sx={{ p: { xs: 2.5, sm: 4 }, textAlign: 'center', border: '1px solid', borderColor: 'divider', borderRadius: { xs: 2, sm: 4 } }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Sign in to view your account
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Access your saved details, orders, and marketplace activity after logging in.
          </Typography>
          <Stack spacing={2}>
            <Box
              component={Link}
              href="/login"
              sx={{
                display: 'block',
                borderRadius: 8,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                px: 3,
                py: 1.25,
                fontWeight: 700,
                textAlign: 'center',
                textDecoration: 'none',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              Log In
            </Box>
            <Box
              component={Link}
              href="/signup"
              sx={{
                display: 'block',
                border: '1px solid',
                borderColor: 'primary.main',
                borderRadius: 8,
                color: 'primary.main',
                px: 3,
                py: 1.25,
                fontWeight: 700,
                textAlign: 'center',
                textDecoration: 'none',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              Create Account
            </Box>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: { xs: 4, md: 8 }, mb: { xs: 4, md: 8 } }}>
      <Box display="flex" justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} flexDirection={{ xs: 'column', sm: 'row' }} gap={2} mb={4}>
        <Box>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            My Account
          </Typography>
          {user ? (
            <Typography variant="body1" color="text.secondary">
              Welcome back, {user.name}! Your email is {user.email}.
            </Typography>
          ) : (
            <Typography variant="body1" color="text.secondary">
              You are authenticated. Manage your profile and orders below.
            </Typography>
          )}
        </Box>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Grid container spacing={{ xs: 2.5, md: 4 }}>
        {/* SIGN IN SECTION */}
        <Grid xs={12} md={6}>
          <Paper 
            elevation={3} 
            sx={{ p: { xs: 2.5, sm: 4 }, height: '100%', display: 'flex', flexDirection: 'column', borderRadius: { xs: 2, sm: 4 } }}
          >
            <Stack spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <LoginIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h5" fontWeight="bold">Returning Customer</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 4, flexGrow: 1 }}>
              Welcome back! Sign in to access your saved items, addresses, and order history.
            </Typography>
            <Button 
              component={Link} 
              href="/login" 
              variant="contained" 
              fullWidth 
              size="large"
              sx={{ borderRadius: 8 }}
            >
              Sign In
            </Button>
          </Paper>
        </Grid>

        {/* SIGN UP SECTION */}
        <Grid xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 2.5, sm: 4 },
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              borderRadius: { xs: 2, sm: 4 },
              border: '2px dashed',
              borderColor: 'divider'
            }}
          >
            <Stack spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <PersonAddIcon color="secondary" sx={{ fontSize: 40 }} />
              <Typography variant="h5" fontWeight="bold">New to Coded Store?</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 4, flexGrow: 1 }}>
              Creating an account is fast, easy, and free. You will be able to track your orders and checkout faster!
            </Typography>
            <Button 
              component={Link} 
              href="/signup" 
              variant="outlined" 
              fullWidth 
              size="large"
              sx={{ borderRadius: 8 }}
            >
              Create Account
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
