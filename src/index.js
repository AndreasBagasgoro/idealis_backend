const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const { swaggerUi, specs } = require('./swagger');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'idealis_db',
  port: process.env.DB_PORT || 3307
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error('❌ Gagal connect ke MySQL:', err.message);
    return;
  }
  console.log('✅ Berhasil terhubung ke MySQL!');
});

// Make db available for routes
app.locals.db = db;

// Middleware
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Idealis Backend API',
    version: '1.0.0',
    endpoints: {
      api: '/api',
      health: '/health'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    database: 'connected',
    timestamp: new Date().toISOString()
  });
});

// API Routes
try {
  const apiRoutes = require('./routes/api');
  app.use('/api', apiRoutes);
  console.log('✅ API Routes loaded');
} catch (error) {
  console.error('❌ API routes error:', error.message);
}

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;