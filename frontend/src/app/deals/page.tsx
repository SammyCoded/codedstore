'use client';

import React from 'react';
import { 
  Box, Container, Typography, Grid as Grid, Card, 
  CardContent, CardMedia, Chip, Button, Stack 
} from '@mui/material';
import Link from 'next/link';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const dealProducts = [
  {
    id: 1,
    title: 'Wireless Noise Cancelling Headphones',
    oldPrice: 299,
    newPrice: 199,
    discount: '33% OFF',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500',
    timer: '05:22:10'
  },
  {
    id: 2,
    title: 'Smart Watch Series 7',
    oldPrice: 399,
    newPrice: 249,
    discount: '37% OFF',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500',
    timer: '02:45:00'
  },
  {
    id: 3,
    title: 'Ultra Slim Laptop 13"',
    oldPrice: 1200,
    newPrice: 899,
    discount: '25% OFF',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=500',
    timer: '08:10:15'
  },
  {
    id: 4,
    title: 'Mechanical Gaming Keyboard',
    oldPrice: 150,
    newPrice: 75,
    discount: '50% OFF',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=500',
    timer: '01:30:45'
  }
];

export default function DealsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* FLASH SALE HEADER */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 6, 
          bgcolor: '#fff5f5', 
          borderRadius: 4, 
          border: '1px solid #feb2b2',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <LocalFireDepartmentIcon sx={{ color: '#f56565', fontSize: 40 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold" color="#c53030">
              FLASH SALE
            </Typography>
            <Typography variant="body1">Huge savings on top tech and fashion!</Typography>
          </Box>
        </Stack>
        
        <Stack direction="row" spacing={1} alignItems="center">
          <AccessTimeIcon color="action" />
          <Typography variant="h6" fontWeight="bold">Ends In: 12:00:00</Typography>
        </Stack>
      </Paper>

      <Grid container spacing={4}>
        {dealProducts.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product.id}>
            <Card sx={{ borderRadius: 4, position: 'relative', height: '100%' }}>
              {/* Discount Tag */}
              <Chip 
                label={product.discount} 
                color="error" 
                size="small" 
                sx={{ position: 'absolute', top: 12, left: 12, fontWeight: 'bold' }} 
              />
              
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
              />
              
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" noWrap gutterBottom>
                  {product.title}
                </Typography>
                
                <Stack direction="row" spacing={1} alignItems="baseline" mb={2}>
                  <Typography variant="h5" color="error" fontWeight="bold">
                    ${product.newPrice}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                    ${product.oldPrice}
                  </Typography>
                </Stack>

                <Typography variant="caption" display="block" color="text.secondary" mb={2}>
                  ⏱ Time Left: {product.timer}
                </Typography>

                <Button 
                  fullWidth 
                  variant="outlined" 
                  component={Link} 
                  href={`/product/${product.id}`}
                  sx={{ borderRadius: 20 }}
                >
                  View Deal
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

// Ensure Paper is imported
import { Paper } from '@mui/material';