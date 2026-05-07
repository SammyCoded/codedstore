'use client';

import React from 'react';
import { 
  Box, Container, Typography, Grid as Grid, Card, 
  CardContent, CardMedia, Chip, Button, Select, MenuItem, FormControl, InputLabel 
} from '@mui/material';
import Link from 'next/link';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const newArrivals = [
  {
    id: 101,
    title: 'Minimalist Leather Backpack',
    price: 120,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=500',
    dateAdded: '2 days ago'
  },
  {
    id: 102,
    title: 'Pro Gaming Mouse Z2',
    price: 85,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527814050087-379371549a28?q=80&w=500',
    dateAdded: 'Today'
  },
  {
    id: 103,
    title: 'Organic Cotton Summer Tee',
    price: 35,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500',
    dateAdded: 'Yesterday'
  },
  {
    id: 104,
    title: 'Smart Home Hub v3',
    price: 199,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=500',
    dateAdded: '3 days ago'
  }
];

export default function WhatsNewPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      
      {/* HEADER WITH SORT FILTER */}
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" mb={6} gap={3}>
        <Box>
          <Box display="flex" alignItems="center" gap={1}>
            <NewReleasesIcon color="primary" />
            <Typography variant="h3" fontWeight="bold">Whats New</Typography>
          </Box>
          <Typography variant="body1" color="text.secondary">
            Fresh arrivals from our top brands, updated daily.
          </Typography>
        </Box>

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Sort By</InputLabel>
          <Select label="Sort By" defaultValue="newest">
            <MenuItem value="newest">Newest First</MenuItem>
            <MenuItem value="price-low">Price: Low to High</MenuItem>
            <MenuItem value="trending">Trending Now</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* PRODUCTS GRID */}
      <Grid container spacing={4}>
        {newArrivals.map((product) => (
          <Grid xs={12} sm={6} md={3} key={product.id}>
            <Card sx={{ 
              borderRadius: 4, 
              overflow: 'hidden', 
              height: '100%',
              display: 'flex', 
              flexDirection: 'column',
              position: 'relative'
            }}>
              {/* NEW BADGE */}
              <Chip 
                label="NEW" 
                size="small" 
                color="primary" 
                sx={{ position: 'absolute', top: 12, left: 12, fontWeight: 'bold' }} 
              />
              
              <CardMedia
                component="img"
                height="280"
                image={product.image}
                alt={product.title}
                sx={{ objectFit: 'cover' }}
              />
              
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                  {product.category}
                </Typography>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {product.title}
                </Typography>
                <Typography variant="h6" color="primary.main" fontWeight="bold" sx={{ mb: 1 }}>
                  ${product.price}
                </Typography>
                <Typography variant="caption" color="success.main" display="block" mb={2}>
                  Added: {product.dateAdded}
                </Typography>

                <Button 
                  fullWidth 
                  variant="contained" 
                  component={Link} 
                  href="/marketplace"
                  sx={{ borderRadius: 2, textTransform: 'none' }}
                >
                  View Marketplace
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
