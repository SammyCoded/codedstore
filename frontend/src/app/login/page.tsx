'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, Container, Paper, Typography, TextField, 
  Button, Link as MuiLink, IconButton, InputAdornment, Alert,
  Stack, CircularProgress
} from '@mui/material';
import Link from 'next/link';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// ✅ Strips trailing slash from env variable to prevent double slash bug
const getApiBase = () => {
  const url = process.env.NEXT_PUBLIC_API_URL || 'https://backendcstore.vercel.app';
  return url.endsWith('/') ? url.slice(0, -1) : url;
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'info' | 'success' | 'warning' | '', text: string }>({ type: '', text: '' });
  
  const apiBase = getApiBase(); 

  const [lastUser, setLastUser] = useState<{ name?: string; email?: string } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          try {
            setLastUser(JSON.parse(userStr)); 
          } catch {
            localStorage.removeItem('user'); 
          }
        }
      }
    }
  }, []);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLastUser(null);
    setFormData({ email: '', password: '' });
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${apiBase}/api/auth/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json', 
        },
        credentials: 'include', 
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get('content-type');
      const data = contentType?.includes('application/json')
        ? await response.json()
        : { message: await response.text() };

      if (response.ok) {
        setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
        if (data.token) localStorage.setItem('token', data.token);
        if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
        setTimeout(() => router.push('/'), 1500);
      } else {
        setMessage({ type: 'error', text: data.message || 'Login failed. Check your credentials.' });
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        setMessage({ type: 'error', text: 'Unable to reach server. Check your connection or CORS settings.' });
      } else {
        setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Button 
        component={Link} 
        href="/" 
        startIcon={<ArrowBackIcon />} 
        sx={{ mb: 2, color: 'text.secondary' }}
      >
        Back to Store
      </Button>

      <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
        {lastUser ? (
          <>
            <Box textAlign="center" mb={3}>
              <Typography variant="h4" fontWeight="bold">Welcome Back!</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Last login information
              </Typography>
            </Box>

            <Box sx={{ backgroundColor: '#f5f5f5', p: 3, borderRadius: 2, mb: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Name</Typography>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>{lastUser.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Email</Typography>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>{lastUser.email}</Typography>
            </Box>

            <Stack spacing={2}>
              <Button 
                variant="contained" 
                fullWidth 
                size="large" 
                onClick={() => router.push('/')}
                sx={{ py: 1.5, borderRadius: 8, fontWeight: 'bold' }}
              >
                Continue to Store
              </Button>
              <Button 
                variant="outlined" 
                fullWidth 
                size="large" 
                onClick={handleLogout}
                sx={{ py: 1.5, borderRadius: 8, fontWeight: 'bold' }}
              >
                Sign In as Different User
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <Box textAlign="center" mb={3}>
              <Typography variant="h4" fontWeight="bold">Sign In</Typography>
              <Typography variant="body2" color="text.secondary">
                Enter your details to access your account
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  required
                  type="email"
                  name="email"
                  autoComplete="email" // ✅ Added autocomplete for email
                  value={formData.email}
                  onChange={handleChange}
                />

                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  required
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password" // ✅ Added autocomplete for password
                  value={formData.password}
                  onChange={handleChange}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }
                  }}
                />

                <Box textAlign="right">
                  <MuiLink component={Link} href="/forgot-password" variant="body2" underline="hover">
                    Forgot password?
                  </MuiLink>
                </Box>

                {message.text && message.type && (
                  <Alert severity={message.type} sx={{ mb: 2 }}>
                    {message.text}
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  variant="contained" 
                  fullWidth 
                  size="large" 
                  sx={{ py: 1.5, borderRadius: 8, fontWeight: 'bold' }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
                </Button>
              </Stack>
            </form>

            <Box mt={4} textAlign="center">
              <Typography variant="body2">
                Do not have an account?{' '}
                <MuiLink component={Link} href="/signup" fontWeight="bold" underline="hover">
                  Sign Up
                </MuiLink>
              </Typography>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
}