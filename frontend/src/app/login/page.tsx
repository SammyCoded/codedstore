'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, Container, Paper, Typography, TextField, 
  Button, Link as MuiLink, IconButton, InputAdornment, Alert
} from '@mui/material';
import Link from 'next/link';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// Add this import if you get an error with 'Stack'
import { Stack } from '@mui/material';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'info' | 'success' | 'warning' | '', text: string }>({ type: '', text: '' });
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const [lastUser, setLastUser] = useState<{ name?: string; email?: string } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          setLastUser(JSON.parse(userStr));
        }
      }
    }
  }, []);

  // Form State
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

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${apiBase}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setTimeout(() => router.push('/'), 1500);
      } else {
        setMessage({ type: 'error', text: data.message || 'Login failed' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage({ type: 'error', text: 'Connection error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      {/* Back Button */}
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
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Box textAlign="right">
                  <MuiLink component={Link} href="/forgot-password" variant="body2" underline="hover">
                    Forgot password?
                  </MuiLink>
                </Box>

                {/* Status Message */}
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
                  {loading ? 'Logging In...' : 'Log In'}
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

