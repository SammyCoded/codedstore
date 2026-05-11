'use client';

import React from 'react';
import { 
  Box, Container, Typography, Grid as Grid, Paper, 
  Button, IconButton, Stack, Divider, TextField 
} from '@mui/material';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

// Mock data for cart items
const cartItems = [
  {
    id: 1,
    title: 'Wireless Noise Cancelling Headphones',
    price: 199,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200',
  },
  {
    id: 2,
    title: 'Minimalist Leather Backpack',
    price: 120,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=200',
  }
];

export default function CartPage() {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping example
  const total = subtotal + shipping;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Your Shopping Cart ({cartItems.length} items)
      </Typography>

      <Grid container spacing={{ xs: 2.5, md: 4 }}>
        {/* LEFT SIDE: ITEM LIST */}
        <Grid xs={12} md={8}>
          <Stack spacing={3}>
            {cartItems.map((item) => (
              <Paper key={item.id} elevation={0} sx={{ p: { xs: 1.5, sm: 2 }, border: '1px solid', borderColor: 'divider', borderRadius: { xs: 2, sm: 4 } }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid xs={4} sm={2}>
                    <Box 
                      component="img" 
                      src={item.image} 
                      alt={item.title} 
                      sx={{ width: '100%', borderRadius: 2 }} 
                    />
                  </Grid>
                  <Grid xs={8} sm={5}>
                    <Typography variant="subtitle1" fontWeight="bold">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">In Stock</Typography>
                  </Grid>
                  <Grid xs={6} sm={3}>
                    <Stack direction="row" alignItems="center" spacing={0.75} flexWrap="wrap">
                      <IconButton size="small" sx={{ border: '1px solid #ddd' }}><RemoveIcon fontSize="small" /></IconButton>
                      <Typography fontWeight="bold">{item.quantity}</Typography>
                      <IconButton size="small" sx={{ border: '1px solid #ddd' }}><AddIcon fontSize="small" /></IconButton>
                    </Stack>
                  </Grid>
                  <Grid xs={6} sm={2} textAlign="right">
                    <Typography variant="h6" fontWeight="bold">${item.price * item.quantity}</Typography>
                    <IconButton color="error" size="small"><DeleteOutlineIcon /></IconButton>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Stack>
          
          <Button component={Link} href="/" sx={{ mt: 3 }} startIcon={<ShoppingBagIcon />}>
            Continue Shopping
          </Button>
        </Grid>

        {/* RIGHT SIDE: SUMMARY */}
        <Grid xs={12} md={4}>
          <Paper elevation={0} sx={{ p: { xs: 2, sm: 3, md: 4 }, bgcolor: '#f8f9fa', borderRadius: { xs: 2, sm: 4 }, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" fontWeight="bold" mb={3}>Order Summary</Typography>
            
            <Stack spacing={2} mb={3}>
              <Box display="flex" justifyContent="space-between">
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography fontWeight="bold">${subtotal}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography color="text.secondary">Shipping</Typography>
                <Typography color="success.main" fontWeight="bold">FREE</Typography>
              </Box>
              <Divider />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6" fontWeight="bold">Total</Typography>
                <Typography variant="h6" fontWeight="bold" color="primary">${total}</Typography>
              </Box>
            </Stack>

            <Box mb={3}>
              <Typography variant="body2" gutterBottom>Promo Code?</Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                <TextField size="small" fullWidth placeholder="Enter code" sx={{ bgcolor: 'white' }} />
                <Button variant="outlined" sx={{ textTransform: 'none' }}>Apply</Button>
              </Stack>
            </Box>

            <Button 
              variant="contained" 
              fullWidth 
              size="large" 
              sx={{ py: 1.5, borderRadius: 8, fontWeight: 'bold' }}
            >
              Checkout Now
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
