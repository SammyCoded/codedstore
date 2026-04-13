import 'dotenv/config'; // This loads your .env variables automatically
import express from 'express';
import cors from 'cors';
import connectDB from './lib/db.js'; // Remember the .js extension!
import authRoutes from './routes/auth.js';
import productsRoutes from './routes/products.js';

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'http://localhost:3001',
];

// Configure CORS for local frontend development
app.use(cors({ 
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middleware to parse JSON data
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);

// 3. Your Test Route
app.get('/api/test', (req, res) => {
  console.log("Frontend just knocked on the door!");
  res.json({ 
    success: true,
    message: "Backend is officially connected!",
    timestamp: new Date().toISOString()
  });
});

// 4. Start the Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    console.log('📦 Connected to MongoDB');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is flying at http://localhost:${PORT}`);
      console.log(`👉 Test the API here: http://localhost:${PORT}/api/test`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

startServer();