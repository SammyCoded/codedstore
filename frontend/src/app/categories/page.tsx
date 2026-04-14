'use client';

import React from 'react';
import { Box, Container, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import Link from 'next/link';

// Mock data for categories
const categories = [
  { title: 'Electronics', description: 'Phones, gadgets, and accessories.', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3c0f3667?q=80&w=800' },
  { title: 'Fashion', description: 'Trendy clothes, shoes, and jewelry.', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800' },
  { title: 'Home', description: 'Decor, furniture, and kitchen essentials.', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800' },
  { title: 'Sports', description: 'Fitness gear, outdoor equipment, and more.', image: 'https://images.unsplash.com/photo-1526401485004-914a2f35aa0e?q=80&w=800' },
];

export default function CategoriesPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Categories
      </Typography>
      <Typography color="text.secondary" mb={6}>
        Explore the categories and discover items from our marketplace sellers.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, minmax(0, 1fr))' },
          gap: 3,
        }}
      >
        {categories.map((category) => (
          <Card key={category.title} sx={{ borderRadius: 4, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardMedia
              component="img"
              height="180"
              image={category.image}
              alt={category.title}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {category.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {category.description}
              </Typography>
            </CardContent>
            <Box sx={{ p: 2, pt: 0 }}>
              <Button component={Link} href="/marketplace" variant="outlined" fullWidth sx={{ borderRadius: 2 }}>
                Browse {category.title}
              </Button>
            </Box>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
