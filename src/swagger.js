const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Idealis Backend API',
      version: '1.0.0',
      description: 'API documentation for Idealis Application Backend',
      contact: {
        name: 'Andreas',
        email: 'andreas@example.com'
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'User ID',
            },
            username: {
              type: 'string',
              description: 'Username',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
          },
        },
        Ingredient: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Ingredient ID',
            },
            name: {
              type: 'string',
              description: 'Ingredient name',
            },
            unit: {
              type: 'string',
              description: 'Unit of measurement',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
          },
        },
        Recipe: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Recipe ID',
            },
            title: {
              type: 'string',
              description: 'Recipe title',
            },
            description: {
              type: 'string',
              description: 'Recipe description',
            },
            instructions: {
              type: 'string',
              description: 'Cooking instructions',
            },
            userId: {
              type: 'integer',
              description: 'User ID who created the recipe',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
          },
        },
        UserProfile: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Profile ID',
            },
            userId: {
              type: 'integer',
              description: 'Associated User ID',
            },
            firstName: {
              type: 'string',
              description: 'First name',
            },
            lastName: {
              type: 'string',
              description: 'Last name',
            },
            bio: {
              type: 'string',
              description: 'User biography',
            },
            avatar: {
              type: 'string',
              description: 'Avatar URL',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
          },
        },
        RecipeIngredient: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Recipe ingredient ID',
            },
            recipeId: {
              type: 'integer',
              description: 'Recipe ID',
            },
            ingredientId: {
              type: 'integer',
              description: 'Ingredient ID',
            },
            quantity: {
              type: 'number',
              description: 'Quantity of ingredient',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API routes
};

const specs = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  specs,
};