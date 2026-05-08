'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Grid as Grid, 
  Button, Card, CardContent, CardMedia, Paper, Stack 
} from '@mui/material';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { getApiBase } from '@/lib/api';

type Product = {
  _id: string;
  title: string;
  price: string | number;
  description: string;
  address?: string;
  image?: string;
  seller?: {
    name?: string;
  };
};

export default function HomePage() {
  const [marketplaceProducts, setMarketplaceProducts] = useState<Product[]>([]);
  const [marketplaceLoading, setMarketplaceLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const apiBase = getApiBase();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchMarketplaceProducts = async () => {
        setMarketplaceLoading(true);
        try {
          const response = await fetch(`${apiBase}/api/products`);
          if (response.ok) {
            const data = await response.json() as Product[];
            setMarketplaceProducts(data);
          } else {
            console.error('Failed to fetch marketplace products from homepage');
          }
        } catch (error) {
          console.error('Homepage fetch error:', error);
        } finally {
          setMarketplaceLoading(false);
        }
      };

      fetchMarketplaceProducts();
    }
  }, [apiBase, isLoggedIn]);

  return (
    <Box>
      {/* 1. HERO SECTION */}
      <Paper 
        elevation={0} 
        sx={{ 
          bgcolor: '#f0f4fb', 
          py: { xs: 8, md: 12 }, 
          borderRadius: 0,
          mb: 8 
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid xs={12} md={6}>
              <Typography variant="overline" color="primary" fontWeight="bold" sx={{ letterSpacing: 2 }}>
                SUMMER COLLECTION 2026
              </Typography>
              <Typography variant="h1" sx={{ fontWeight: 800, fontSize: { xs: '2.5rem', md: '4rem' }, mb: 2, lineHeight: 1.2 }}>
                Shop the Best <br />
                <span style={{ color: '#1976d2' }}>Tech & Style</span>
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontWeight: 400 }}>
                Discover the latest arrivals in electronics, fashion, and home essentials. 
                Free shipping on all orders over $50.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ maxWidth: { xs: 360, sm: 'none' } }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  component={Link} 
                  href="/marketplace"
                  sx={{ borderRadius: 8, px: { xs: 2.5, sm: 4 }, py: 1.5 }}
                >
                  Browse Marketplace
                </Button>
                <Button 
                  variant="outlined" 
                  size="large" 
                  component={Link} 
                  href="/account"
                  sx={{ borderRadius: 8, px: { xs: 2.5, sm: 4 }, py: 1.5 }}
                >
                  My Account
                </Button>
              </Stack>
            </Grid>
            <Grid xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box 
                component="img" 
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800"
                sx={{ width: '100%', borderRadius: 8, boxShadow: 20 }}
              />
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* 3. MARKETPLACE LISTINGS SECTION */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'flex-end' }}
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap={2}
          mb={4}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold">Latest Marketplace Listings</Typography>
            <Typography color="text.secondary">Fresh items from sellers in the community</Typography>
          </Box>
          <Button component={Link} href="/marketplace" endIcon={<ArrowForwardIcon />}>
            Browse Marketplace
          </Button>
        </Box>

        {!isLoggedIn ? (
          <Paper elevation={0} sx={{ p: 6, textAlign: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 4 }}>
            <StorefrontIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Join the Marketplace
            </Typography>
            <Typography color="text.secondary" mb={4}>
              Log in to view and browse marketplace items from our community sellers.
            </Typography>
            <Stack spacing={2}>
              <Button variant="contained" size="large" component={Link} href="/login" sx={{ borderRadius: 8 }}>
                Log In to View Items
              </Button>
              <Button variant="text" component={Link} href="/signup">
                Don t have an account? Sign Up
              </Button>
            </Stack>
          </Paper>
        ) : marketplaceLoading ? (
          <Box textAlign="center" py={8}>
            <Typography variant="h6">Loading latest marketplace items...</Typography>
          </Box>
        ) : marketplaceProducts.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Typography variant="h6" color="text.secondary">
              No marketplace products yet. Upload your first item in the marketplace.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {marketplaceProducts.slice(0, 4).map((product: Product) => (
              <Grid xs={12} sm={6} md={3} key={product._id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 4, transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
                  <CardMedia
                    component="img"
                    height="250"
                    image={product.image || 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800'}
                    alt={product.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold" noWrap>
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {product.description}
                    </Typography>
                    <Typography variant="h6" color="primary" fontWeight="bold" sx={{ mt: 1 }}>
                      ${product.price}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                      Seller: {product.seller?.name || 'Community'}
                    </Typography>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      sx={{ mt: 2, borderRadius: 2 }}
                      component={Link}
                      href="/marketplace"
                    >
                      View Marketplace
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
