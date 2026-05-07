import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import connectDB from './src/lib/db.js'; 
import authRoutes from './src/routes/auth.js';
import productsRoutes from './src/routes/products.js';

const app = express();
const allowedOrigins = [
  'http://localhost:3000',
  'https://codedstorefrontend.vercel.app',
  'https://codedstoreshop.vercel.app',
];

// 1. Apply CORS at the very top
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// 2. Debug middleware to log origin
app.use((req, res, next) => {
  console.log('🔎 Origin header:', req.headers.origin);
  next();
});

// 3. Standard Middleware
app.use(express.json());

// 4. Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);

app.get('/api/test', (req, res) => {
  res.json({ success: true, message: "Backend is officially connected!" });
});

// 5. Start the Server
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
