const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Get API information
 *     description: Returns basic information about the API
 *     responses:
 *       200:
 *         description: API information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 version:
 *                   type: string
 *                 endpoints:
 *                   type: object
 *                 timestamp:
 *                   type: string
 */
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the Idealis API!',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      userProfiles: '/api/profiles',
      ingredients: '/api/ingredients',
      recipes: '/api/recipes',
      recipeIngredients: '/api/recipeIngredients',
      test: '/api/test',
      health: '/api/health'
    },
    timestamp: new Date().toISOString()
  });
});

// Test endpoint
/**
 * @swagger
 * /api/test:
 *   get:
 *     summary: Test endpoint
 *     description: Returns test data to verify API functionality
 *     responses:
 *       200:
 *         description: Test data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Test endpoint working!',
    data: {
      timestamp: new Date().toISOString(),
      randomNumber: Math.floor(Math.random() * 1000),
      environment: process.env.NODE_ENV || 'development'
    }
  });
});

// API health check
/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: API health check
 *     description: Checks the health status of the API and database connection
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 status:
 *                   type: string
 *                 database:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *       500:
 *         description: API is unhealthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.get('/health', (req, res) => {
  const db = req.app.locals.db;
  
  if (!db) {
    return res.status(500).json({
      success: false,
      message: 'Database not available'
    });
  }

  db.ping((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        status: 'unhealthy',
        database: 'disconnected',
        error: err.message
      });
    }
    
    res.json({
      success: true,
      status: 'API healthy',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  });
});

// Users API
try {
  const userRoutes = require('./users');
  router.use('/users', userRoutes);
  console.log('✅ Users routes mounted at /api/users');
} catch (error) {
  console.warn('⚠️ Users route not found');
  
  // Fallback users route
  router.get('/users', (req, res) => {
    res.status(503).json({
      success: false,
      message: 'Users endpoint not available',
      reason: 'Route file not found'
    });
  });
}

// User Profiles API
try {
  const userProfileRoutes = require('./userProfiles');
  router.use('/profiles', userProfileRoutes);
  console.log('✅ User Profile routes mounted at /api/profiles');
} catch (error) {
  console.warn('⚠️ User Profile route not found');

  // Fallback user profiles route
  router.get('/profiles', (req, res) => {
    res.status(503).json({
      success: false,
      message: 'User Profiles endpoint not available',
      reason: 'Route file not found'
    });
  });
}

// Ingredients API
try {
  const ingredientRoutes = require('./ingredient');
  router.use('/ingredients', ingredientRoutes);
  console.log('✅ Ingredients routes mounted at /api/ingredient');
} catch (error) {
  console.warn('⚠️ Ingredients route not found');

  // Fallback ingredients route
  router.get('/ingredients', (req, res) => {
    res.status(503).json({
      success: false,
      message: 'Ingredients endpoint not available',
      reason: 'Route file not found'
    });
  });
}

// Recipe API
try {
  const recipeRoutes = require('./recipes');
  router.use('/recipes', recipeRoutes);
  console.log('✅ Recipe routes mounted at /api/recipes');
} catch (error) {
  console.warn('⚠️ Recipe route not found');

  // Fallback recipe route
  router.get('/recipes', (req, res) => {
    res.status(503).json({
      success: false,
      message: 'Recipes endpoint not available',
      reason: 'Route file not found'
    });
  });
}

//Recipe Ingredient API
try {
  const recipeIngredientRoutes = require('./recipeIngredient');
  router.use('/recipeIngredients', recipeIngredientRoutes);
  console.log('✅ Recipe Ingredient routes mounted at /api/recipeIngredients');
} catch (error) {
  console.warn('⚠️ Recipe Ingredient route not found');

  router.get('/recipeIngredients', (req, res) => {
    res.status(503).json({
      succes: false,
      message: 'Recipe Ingredients endpoint not available',
      reason: 'Route file not found'
    })
  })
}

// API Documentation
router.get('/docs', (req, res) => {
  res.json({
    success: true,
    message: 'API Documentation',
    version: '1.0.0',
    base_url: `${req.protocol}://${req.get('host')}/api`,
    endpoints: [
      {
        path: '/',
        method: 'GET',
        description: 'API information and available endpoints'
      },
      {
        path: '/health',
        method: 'GET', 
        description: 'API health check with database status'
      },
      {
        path: '/test',
        method: 'GET',
        description: 'Test endpoint for connectivity'
      },
      {
        path: '/users',
        method: 'GET',
        description: 'Users endpoint'
      },
      {
        path: '/docs',
        method: 'GET',
        description: 'This documentation'
      }
    ],
    timestamp: new Date().toISOString()
  });
});

// Catch-all untuk undefined API routes - HARUS DI AKHIR
router.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    path: req.originalUrl,
    method: req.method,
    available_endpoints: [
      '/api',
      '/api/health', 
      '/api/test',
      '/api/users',
      '/api/profiles',
      '/api/ingredients',
      '/api/recipes',
      '/api/recipeIngredients',
      '/api/docs'
    ],
    timestamp: new Date().toISOString()
  });
});

module.exports = router;