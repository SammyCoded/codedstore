'use client';

import React from 'react';
import { 
  Box, Container, Typography, Grid, Card, 
  CardContent, CardMedia, CardActionArea 
} from '@mui/material';
import Link from 'next/link';

// Mock data for categories
const categories = [
  { 
    title: 'Electronics', 
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=500', 
    href: '/categories/electronics',
    itemCount: '120+ Products'
  },
  { 
    title: 'Fashion', 
    image: 'https://images.unsplash.com/photo-1445205170230-053b830c6050?q=80&w=500', 
    href: '/categories/fashion',
    itemCount: '350+ Products'
  },
  { 
    title: 'Home & Garden', 
    image: 'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?q=80&w=500', 
    href: '/categories/home',
    itemCount: '80+ Products'
  },
  { 
    title: 'Sports', 
    image: 'https://images.unsplash.com/photo-1461896756913-c8b40e7246c2?q=80&w=500', 
    href: '/categories/sports',
    itemCount: '150+ Products'
  },
  { 
    title: 'Beauty', 
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=500', 
    href: '/categories/beauty',
    itemCount: '200+ Products'
  },
  { 
    title: 'Toys', 
    image: 'https://images.unsplash.com/photo-1532330393533-443990a51d10?q=80&w=500', 
    href: '/categories/toys',
    itemCount: '90+ Products'
  },
];

export default function CategoriesPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box mb={6}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Shop by Category
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Select a category to find the best deals and newest products.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {categories.map((category) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={category.title}>
            <Card 
              sx={{ 
                borderRadius: 4, 
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s',
                '&:hover': { 
                  transform: 'translateY(-8px)',
                  boxShadow: 10 
                } 
              }}
            >
              <CardActionArea component={Link} href={category.href}>
                <CardMedia
                  component="img"
                  height="200"
                  image={category.image}
                  alt={category.title}
                />
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {category.title}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    {category.itemCount}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}