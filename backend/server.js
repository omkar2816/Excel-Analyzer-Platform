import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import analyticsRoutes from './routes/analytics.js';
import analyticsEnhancedRoutes from './routes/analyticsEnhanced.js';
import historyRoutes from './routes/history.js';
import notificationRoutes from './routes/notifications.js';
import tabNotificationRoutes from './routes/tabNotifications.js';
import ratingRoutes from './routes/ratings.js';
import reviewPopupRoutes from './routes/reviewPopup.js';
import { getTransporter } from './utils/mailer.js';

// Load environment variables
dotenv.config();

// Track server startup time for real uptime calculation
global.serverStartTime = Date.now();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174', 
    'http://localhost:5175',
    'http://localhost:5176',
    'http://localhost:5177',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true
}));
app.use(compression());
app.use(morgan('combined'));
// Increase payload limits for file uploads (100MB)
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// Database connection
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/excelAnalytics')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/analytics-enhanced', analyticsEnhancedRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/tab-notifications', tabNotificationRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/review-popup', reviewPopupRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Excel Analytics API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
  console.log(`Server started at: ${new Date(global.serverStartTime).toISOString()}`);
  console.log(`Real-time uptime tracking enabled`);
  // Warm up SMTP transporter on boot so failures are visible early
  getTransporter().catch(() => {});
});
