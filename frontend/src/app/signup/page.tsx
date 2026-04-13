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

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'info' | 'success' | 'warning' | '', text: string }>({ type: '', text: '' });
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // 1. Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  // 2. Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${apiBase}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Account created! Redirecting...' });
        setTimeout(() => router.push('/'), 1500);
      } else {
        setMessage({ type: 'error', text: data.message || 'Signup failed' });
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage({ type: 'error', text: 'Connection error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4, mb: 4 }}>
      <Button 
        component={Link} 
        href="/account" 
        startIcon={<ArrowBackIcon />} 
        sx={{ mb: 2, color: 'text.secondary' }}
      >
        Back to Account
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
            <TextField
              label="Full Name"
              name="name" // Matches state key
              variant="outlined"
              fullWidth
              required
              value={formData.name}
              onChange={handleChange}
            />

            <TextField
              label="Email Address"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
            />

            <TextField
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              required
              value={formData.password}
              onChange={handleChange}
              helperText="Must be at least 8 characters"
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

            <FormControlLabel
              control={<Checkbox required size="small" />}
              label={
                <Typography variant="body2">
                  I agree to the <MuiLink href="#">Terms & Conditions</MuiLink>
                </Typography>
              }
            />

            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              size="large" 
              disabled={loading}
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