'use client';

import React, { useState } from 'react';
import { Box, Container, Paper, Typography, TextField, Button, Alert, Stack } from '@mui/material';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<{ type: 'error' | 'success' | '', text: string }>({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${apiBase}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage({ type: response.ok ? 'success' : 'error', text: data.message || 'Unable to submit request' });
    } catch (error) {
      console.error('Forgot password error:', error);
      setMessage({ type: 'error', text: 'Connection error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, mb: 8 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" fontWeight="bold">Forgot Password</Typography>
          <Typography variant="body2" color="text.secondary">
            Enter your email and we will send instructions to reset your password.
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
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />

            <Button type="submit" variant="contained" fullWidth disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </Stack>
        </form>

        <Box mt={3} textAlign="center">
          <Typography variant="body2">
            Remembered your password? <Link href="/login">Sign in</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}