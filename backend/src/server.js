import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import connectDB from './lib/db.js'; 
import authRoutes from './routes/auth.js';
import productsRoutes from './routes/products.js';

const app = express();

// 1. Define your allowed origins clearly
const allowedOrigins = [
  'https://codedstorefrontend.vercel.app', // Your current live frontend
  'https://codedstore-v1e2.vercel.app',    // Fallback URL
  process.env.FRONTEND_URL,                // From Vercel environment variables
  'http://localhost:3000',
  'http://localhost:3001',
].filter(Boolean); // Removes empty values

// 2. Configure CORS (Only one block!)
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`❌ CORS blocked request from: ${origin}`);
      callback(new Error(`CORS policy: origin ${origin} not allowed`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// 3. Handle preflight (OPTIONS) requests
app.options('*', cors());

// 4. Standard Middleware
app.use(express.json());

// 5. Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);

app.get('/api/test', (req, res) => {
  res.json({ success: true, message: "Backend is officially connected!" });
});

// 6. Start the Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`✅ Allowed origins:`, allowedOrigins);
    });
  } catch (error) {
    console.error('Failed to connect:', error);
    process.exit(1);
  }
};

startServer();