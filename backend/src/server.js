import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import connectDB from './lib/db.js'; 
import authRoutes from './routes/auth.js';
import productsRoutes from './routes/products.js';

const app = express();

// --- REPLACED CORS BLOCK START ---
app.use(cors({
  origin: 'https://codedstorefrontend.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// --- REPLACED CORS BLOCK END ---

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);

app.get('/api/test', (req, res) => {
  res.json({ success: true, message: "Backend is officially connected!" });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect:', error);
    process.exit(1);
  }
};

startServer();
