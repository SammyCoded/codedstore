'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, Container, Paper, Typography, TextField, 
  Button, Link as MuiLink, IconButton, InputAdornment, Stack, Checkbox, FormControlLabel,
  Alert, CircularProgress
} from '@mui/material';
import Link from 'next/link';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getApiBase } from '@/lib/api';

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'info' | 'success' | 'warning' | '', text: string }>({ type: '', text: '' });
  
  const apiBase = getApiBase(); 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const togglePasswordVisibility = () => {
    setShowPassword((isVisible) => !isVisible);
  };

  const handlePasswordVisibilityTouch = (event: React.TouchEvent<HTMLButtonElement>) => {
    event.preventDefault();
    togglePasswordVisibility();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: 'info', text: 'Connecting to server...' });

    try {
      const response = await fetch(`${apiBase}/api/auth/signup`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json', 
        },
        // Removed credentials: 'include'—standard signup usually doesn't need it
        // unless you're setting a session cookie immediately.
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get('content-type');
      const data = contentType?.includes('application/json') 
        ? await response.json() 
        : { message: await response.text() };

      if (response.ok) {
        setMessage({ type: 'success', text: 'Account created! Redirecting to login...' });
        // We wait slightly longer (2 seconds) so they can read the success message
        setTimeout(() => router.push('/login'), 2000);
      } else {
        setMessage({ type: 'error', text: data.message || 'Signup failed' });
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage({ 
        type: 'error', 
        text: 'Server is waking up or unreachable. Please try again in 30 seconds.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4, mb: 4 }}>
      <Button 
        component={Link} 
        href="/login" 
        startIcon={<ArrowBackIcon />} 
        sx={{ mb: 2, color: 'text.secondary' }}
      >
        Back to Login
      </Button>

      <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" fontWeight="bold">Join Us</Typography>
          <Typography variant="body2" color="text.secondary">
            Create an account to start shopping
          </Typography>
        </Box>

        {message.text && message.type && (
          <Alert severity={message.type} sx={{ mb: 2 }}>
            {message.text}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            <Box>
              <Typography variant="body2" fontWeight={700} sx={{ mb: 0.75 }}>
                Full Name
              </Typography>
              <TextField
                placeholder="Full Name"
                name="name"
                variant="outlined"
                fullWidth
                required
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                slotProps={{
                  htmlInput: {
                    'aria-label': 'Full Name',
                  },
                }}
              />
            </Box>

            <Box>
              <Typography variant="body2" fontWeight={700} sx={{ mb: 0.75 }}>
                Email Address
              </Typography>
              <TextField
                placeholder="Email Address"
                name="email"
                type="email"
                variant="outlined"
                fullWidth
                required
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                slotProps={{
                  htmlInput: {
                    'aria-label': 'Email Address',
                  },
                }}
              />
            </Box>

            <Box>
              <Typography variant="body2" fontWeight={700} sx={{ mb: 0.75 }}>
                Password
              </Typography>
              <TextField
                placeholder="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                required
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                helperText={formData.password.length > 0 && formData.password.length < 8 ? "Password is too short" : "Minimum 8 characters"}
                error={formData.password.length > 0 && formData.password.length < 8}
                slotProps={{
                  htmlInput: {
                    'aria-label': 'Password',
                  },
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          type="button"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          onClick={togglePasswordVisibility}
                          onTouchEnd={handlePasswordVisibilityTouch}
                          edge="end"
                          sx={{ WebkitTapHighlightColor: 'transparent' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                }}
              />
            </Box>

            <FormControlLabel
              control={<Checkbox required size="small" />}
              label={
                <Typography variant="body2">
                  I agree to the <MuiLink href="#" underline="hover">Terms & Conditions</MuiLink>
                </Typography>
              }
            />

            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              size="large" 
              disabled={loading || formData.password.length < 8}
              sx={{ py: 1.5, borderRadius: 8, fontWeight: 'bold' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
            </Button>
          </Stack>
        </form>

        <Box mt={4} textAlign="center">
          <Typography variant="body2">
            Already have an account?{' '}
            <MuiLink component={Link} href="/login" fontWeight="bold" underline="hover">
              Sign In
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
