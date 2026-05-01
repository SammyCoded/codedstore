'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, Container, Typography, TextField, Button, 
  Paper, Grid as Grid, InputAdornment, Stack, 
  Alert, AlertTitle, Divider, CircularProgress
} from '@mui/material';
import Link from 'next/link';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import StorefrontIcon from '@mui/icons-material/Storefront';

type Product = {
  _id: string;
  title: string;
  price: string | number;
  description: string;
  address: string;
  image?: string;
  seller?: {
    name?: string;
  };
};

export default function MarketplacePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success' | '', text: string }>({ type: '', text: '' });
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const apiBase = process.env.NEXT_PUBLIC_API_URL;

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    address: '',
    image: null as File | null,
  });

  const fetchProducts = useCallback(async () => {
    setProductsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const headers: Record<string, string> = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${apiBase}/api/products`, {
        headers,
      });

      if (response.ok) {
        const data = await response.json() as Product[];
        setProducts(data);
      } else if (response.status === 401) {
        console.warn('Unauthorized when fetching marketplace products');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setProductsLoading(false);
    }
  }, [apiBase]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchProducts(); // Only fetch products if logged in
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false);
  }, [fetchProducts]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: '', text: '' });

    if (!formData.title || !formData.price || !formData.description || !formData.address) {
      setMessage({ type: 'error', text: 'Please fill in all required fields.' });
      setSubmitting(false);
      return;
    }

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('price', formData.price);
      data.append('description', formData.description);
      data.append('address', formData.address);
      if (formData.image) {
        data.append('image', formData.image);
      }

      const token = localStorage.getItem('token');
      if (!token) {
        setMessage({ type: 'error', text: 'You must be logged in to upload an item.' });
        setSubmitting(false);
        return;
      }

      const response = await fetch(`${apiBase}/api/products`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();

      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setMessage({ type: 'error', text: 'Session expired. Please log in again.' });
        setSubmitting(false);
        return;
      }

      if (response.ok) {
        setMessage({ type: 'success', text: 'Item listed successfully!' });
        setFormData({ title: '', price: '', description: '', address: '', image: null });
        fetchProducts(); // Refresh products list
        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 3000);
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to list item' });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ type: 'error', text: 'Error uploading item. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ py: 12, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!isLoggedIn) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Marketplace
        </Typography>
        
        <Paper elevation={0} sx={{ p: 6, textAlign: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 4, mb: 4 }}>
          <StorefrontIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Want to Sell?
          </Typography>
          <Typography color="text.secondary" mb={4}>
            Create an account to list your items on the marketplace. 
            It only takes a minute!
          </Typography>
          <Stack spacing={2}>
            <Button variant="contained" size="large" component={Link} href="/signup" sx={{ borderRadius: 8 }}>
              Create an Account
            </Button>
            <Button variant="text" component={Link} href="/login">
              Already have one? Log In
            </Button>
          </Stack>
        </Paper>

        {/* PRODUCTS DISPLAY SECTION */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Available Items
          </Typography>
          
          {productsLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : products.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
              <Typography variant="h6" color="text.secondary">
                No items listed yet. Sign up to start selling!
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {products.map((product: Product) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product._id}>
                  <Paper elevation={2} sx={{ borderRadius: 3, overflow: 'hidden', height: '100%' }}>
                    {product.image ? (
                      <Box
                        component="img"
                        src={product.image}
                        alt={product.title}
                        sx={{
                          width: '100%',
                          height: 200,
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          height: 200,
                          bgcolor: 'grey.200',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography variant="h6" color="text.secondary">
                          No Image
                        </Typography>
                      </Box>
                    )}
                    
                    <Box sx={{ p: 2 }}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {product.title}
                      </Typography>
                      
                      <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
                        ${product.price}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {product.description.length > 100 
                          ? `${product.description.substring(0, 100)}...` 
                          : product.description}
                      </Typography>
                      
                      <Typography variant="caption" color="text.secondary">
                        📍 {product.address}
                      </Typography>
                      
                      {product.seller && (
                        <Typography variant="caption" color="text.secondary" display="block">
                          👤 {product.seller.name || 'Seller'}
                        </Typography>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Marketplace
      </Typography>
      
      {isLoggedIn && (
        <>
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
            List Your Item
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Fill out the details below to reach thousands of buyers.
          </Typography>

          <Grid container spacing={4}>
            {/* FORM SECTION */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Paper elevation={0} sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 4 }}>
                <form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    {message.text && (
                      <Alert severity={message.type as 'error' | 'success'}>
                        {message.text}
                      </Alert>
                    )}

                    <TextField
                      label="Item Name"
                      name="title"
                      fullWidth
                      placeholder="e.g. Vintage Camera"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                    
                    <TextField
                      label="Price"
                      name="price"
                      type="number"
                      fullWidth
                      required
                      value={formData.price}
                      onChange={handleInputChange}
                      slotProps={{
                        input: {
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        },
                      }}
                    />

                    <TextField
                      label="Description"
                      name="description"
                      multiline
                      rows={4}
                      fullWidth
                      required
                      placeholder="Tell buyers about your item's condition and features..."
                      value={formData.description}
                      onChange={handleInputChange}
                    />

                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold" mb={1}>
                        Upload Image
                      </Typography>
                      <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                        sx={{ py: 2, borderRadius: 2 }}
                      >
                        Choose Image
                        <input
                          hidden
                          accept="image/*"
                          type="file"
                          onChange={handleFileChange}
                        />
                      </Button>
                      {formData.image && (
                        <Typography variant="caption" display="block" color="success.main" mt={1}>
                          ✓ {formData.image.name}
                        </Typography>
                      )}
                    </Box>

                    <Divider>
                      <Typography variant="caption" color="text.secondary">CONTACT DETAILS</Typography>
                    </Divider>

                    <TextField
                      label="Pick-up Address"
                      name="address"
                      fullWidth
                      required
                      placeholder="Enter your street address or city"
                      helperText="This helps buyers see if they can pick up the item."
                      value={formData.address}
                      onChange={handleInputChange}
                    />

                    <Button 
                      variant="contained" 
                      size="large" 
                      startIcon={<CloudUploadIcon />}
                      type="submit"
                      disabled={submitting}
                      sx={{ borderRadius: 2, py: 1.5, fontWeight: 'bold' }}
                    >
                      {submitting ? <CircularProgress size={24} /> : 'Post Listing'}
                    </Button>
                  </Stack>
                </form>
              </Paper>
            </Grid>

            {/* SIDEBAR: TIPS */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Alert severity="info" sx={{ borderRadius: 4 }}>
                <AlertTitle sx={{ fontWeight: 'bold' }}>Selling Tip</AlertTitle>
                Items with clear descriptions and fair prices sell 3x faster. Dont forget to mention any flaws!
              </Alert>
              
              <Box sx={{ mt: 3, p: 3, bgcolor: '#f0f7ff', borderRadius: 4 }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Marketplace Rules
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                  • No prohibited items<br />
                  • Authentic photos only<br />
                  • Fair pricing strictly enforced
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </>
      )}

      {/* PRODUCTS DISPLAY SECTION */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Available Items
        </Typography>
        
        {productsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : products.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No items listed yet. {isLoggedIn ? 'Be the first to list an item!' : 'Sign up to start selling!'}
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {products.map((product: Product) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product._id}>
                <Paper elevation={2} sx={{ borderRadius: 3, overflow: 'hidden', height: '100%' }}>
                  {product.image ? (
                    <Box
                      component="img"
                      src={product.image}
                      alt={product.title}
                      sx={{
                        width: '100%',
                        height: 200,
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        height: 200,
                        bgcolor: 'grey.200',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="h6" color="text.secondary">
                        No Image
                      </Typography>
                    </Box>
                  )}
                  
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {product.title}
                    </Typography>
                    
                    <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
                      ${product.price}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {product.description.length > 100 
                        ? `${product.description.substring(0, 100)}...` 
                        : product.description}
                    </Typography>
                    
                    <Typography variant="caption" color="text.secondary">
                      📍 {product.address}
                    </Typography>
                    
                    {product.seller && (
                      <Typography variant="caption" color="text.secondary" display="block">
                        👤 {product.seller.name || 'Seller'}
                      </Typography>
                    )}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}
