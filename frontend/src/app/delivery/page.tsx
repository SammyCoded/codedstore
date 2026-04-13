'use client';

import React from 'react';
import { 
  Box, Container, Typography, Grid as Grid, Paper, 
  TextField, Button, Stack, Accordion, AccordionSummary, AccordionDetails 
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InventoryIcon from '@mui/icons-material/Inventory';
import PublicIcon from '@mui/icons-material/Public';

export default function DeliveryPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      
      {/* HEADER SECTION */}
      <Box textAlign="center" mb={8}>
        <LocalShippingIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Shipping & Delivery
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Everything you need to know about getting your items home.
        </Typography>
      </Box>

      <Grid container spacing={6}>
        {/* LEFT SIDE: TRACKING TOOL */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 4, bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Track Your Order
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
              Enter your tracking number to see the current status of your shipment.
            </Typography>
            <Stack spacing={2}>
              <TextField 
                placeholder="e.g. CS-12345678" 
                fullWidth 
                variant="outlined"
                sx={{ 
                  bgcolor: 'white', 
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': { borderRadius: 2 }
                }} 
              />
              <Button 
                variant="contained" 
                color="secondary" 
                size="large" 
                fullWidth 
                sx={{ fontWeight: 'bold', borderRadius: 2 }}
              >
                Track Now
              </Button>
            </Stack>
          </Paper>

          {/* QUICK STATS */}
          <Stack spacing={3} mt={4}>
            <Box display="flex" alignItems="center" gap={2}>
              <InventoryIcon color="primary" />
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">99% Delivery Rate</Typography>
                <Typography variant="caption" color="text.secondary">Reliable service you can trust.</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <PublicIcon color="primary" />
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">Global Shipping</Typography>
                <Typography variant="caption" color="text.secondary">We deliver to over 50 countries.</Typography>
              </Box>
            </Box>
          </Stack>
        </Grid>

        {/* RIGHT SIDE: DELIVERY INFO (FAQ) */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Common Questions
          </Typography>
          
          <Accordion elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="bold">How long does shipping take?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 day delivery.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="bold">What are the shipping costs?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                We offer FREE standard shipping on all orders over $50. For orders under $50, a flat rate of $5.99 applies.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="bold">Do you offer international delivery?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                Yes! We ship internationally. Customs fees and longer delivery times may apply depending on the destination.
              </Typography>
            </AccordionDetails >
          </Accordion>
        </Grid>
      </Grid>
    </Container>
  );
}