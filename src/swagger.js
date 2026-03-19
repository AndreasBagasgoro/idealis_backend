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
              type: 'string',
              format: 'uuid',
              description: 'User ID (UUID)',
            },
            first_name: {
              type: 'string',
              maxLength: 100,
              description: 'First name',
            },
            last_name: {
              type: 'string',
              maxLength: 100,
              description: 'Last name',
            },
            username: {
              type: 'string',
              maxLength: 255,
              description: 'Unique username, auto-generated from first_name + last_name',
            },
            email: {
              type: 'string',
              format: 'email',
              maxLength: 255,
              description: 'User email (unique)',
            },
            password_hash: {
              type: 'string',
              maxLength: 255,
              description: 'Bcrypt hashed password',
            },
            birth_date: {
              type: 'string',
              format: 'date',
              nullable: true,
              description: 'Date of birth',
            },
            gender: {
              type: 'string',
              enum: ['male', 'female', 'other'],
              nullable: true,
              description: 'Gender',
            },
            height_cm: {
              type: 'number',
              format: 'float',
              nullable: true,
              description: 'Height in centimeters',
            },
            weight_kg: {
              type: 'number',
              format: 'float',
              nullable: true,
              description: 'Weight in kilograms',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updated_at: {
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
              type: 'string',
              format: 'uuid',
              description: 'Ingredient ID (UUID)',
            },
            user_id: {
              type: 'string',
              format: 'uuid',
              description: 'Owner User ID',
            },
            name: {
              type: 'string',
              maxLength: 150,
              description: 'Ingredient name',
            },
            icon: {
              type: 'string',
              maxLength: 255,
              nullable: true,
              description: 'Icon URL or name',
            },
            category: {
              type: 'string',
              enum: ['protein', 'carbohydrate', 'vegetable', 'fruit', 'dairy'],
              description: 'Ingredient category',
            },
            quantity: {
              type: 'number',
              format: 'float',
              description: 'Quantity available',
            },
            unit: {
              type: 'string',
              maxLength: 50,
              description: 'Unit of measurement (gram, liter, buah, etc.)',
            },
            expired_at: {
              type: 'string',
              format: 'date',
              nullable: true,
              description: 'Expiration date',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updated_at: {
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
              type: 'string',
              format: 'uuid',
              description: 'Recipe ID (UUID)',
            },
            user_id: {
              type: 'string',
              format: 'uuid',
              description: 'User ID who saved the recipe',
            },
            name: {
              type: 'string',
              maxLength: 200,
              description: 'Recipe name',
            },
            description: {
              type: 'string',
              nullable: true,
              description: 'Recipe description',
            },
            photo_url: {
              type: 'string',
              maxLength: 500,
              nullable: true,
              description: 'Recipe photo URL',
            },
            flavor_preferences: {
              type: 'array',
              items: { type: 'string' },
              nullable: true,
              description: 'Flavor preferences (e.g. sweet, spicy, savory, sour)',
            },
            diet_targets: {
              type: 'array',
              items: { type: 'string' },
              nullable: true,
              description: 'Diet targets (e.g. low_calorie, high_protein, gluten_free, vegetarian)',
            },
            servings: {
              type: 'integer',
              nullable: true,
              description: 'Number of servings',
            },
            ingredients_used: {
              type: 'array',
              items: { type: 'object' },
              nullable: true,
              description: 'List of ingredients and quantities used',
            },
            steps: {
              type: 'array',
              items: { type: 'object' },
              nullable: true,
              description: 'Cooking steps generated by AI',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
          },
        },
        RecipeIngredient: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'RecipeIngredient ID (UUID)',
            },
            recipe_id: {
              type: 'string',
              format: 'uuid',
              description: 'Recipe ID',
            },
            ingredient_id: {
              type: 'string',
              format: 'uuid',
              nullable: true,
              description: 'Ingredient ID (nullable if ingredient not in inventory)',
            },
            ingredient_name: {
              type: 'string',
              nullable: true,
              description: 'Fallback ingredient name if not in inventory',
            },
            quantity_needed: {
              type: 'number',
              format: 'float',
              description: 'Quantity needed',
            },
            unit: {
              type: 'string',
              description: 'Unit of measurement',
            },
          },
        },
        RecipeCook: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'RecipeCook ID (UUID)',
            },
            user_id: {
              type: 'string',
              format: 'uuid',
              description: 'User ID who cooked',
            },
            recipe_id: {
              type: 'string',
              format: 'uuid',
              description: 'Recipe ID that was cooked',
            },
            servings_cooked: {
              type: 'integer',
              description: 'Number of servings cooked',
            },
            cooked_at: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the recipe was cooked',
            },
          },
        },
        FavoriteRecipe: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'FavoriteRecipe ID (UUID)',
            },
            user_id: {
              type: 'string',
              format: 'uuid',
              description: 'User ID',
            },
            recipe_id: {
              type: 'string',
              format: 'uuid',
              description: 'Recipe ID',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when favorited',
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