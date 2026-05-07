'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container, Paper, Typography, TextField, Button, Alert, Stack } from '@mui/material';
import { getApiBase } from '@/lib/api';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'error' | 'success' | '', text: string }>({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const apiBase = getApiBase();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urlToken = new URLSearchParams(window.location.search).get('token') || '';
    setToken(urlToken);

    if (!urlToken) {
      setMessage({ type: 'error', text: 'Reset token is missing or invalid.' });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${apiBase}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage({ type: 'success', text: 'Password reset successfully. Redirecting to login...' });
        setTimeout(() => router.push('/login'), 2000);
      } else {
        setMessage({ type: 'error', text: data.message || 'Unable to reset password.' });
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setMessage({ type: 'error', text: 'Connection error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, mb: 8 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" fontWeight="bold">Reset Password</Typography>
          <Typography variant="body2" color="text.secondary">
            Choose a new password for your account.
          </Typography>
        </Box>

        {message.text && message.type && (
          <Alert severity={message.type} sx={{ mb: 2 }}>
            {message.text}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              fullWidth
            />
            <Button type="submit" variant="contained" fullWidth disabled={loading || !token}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
