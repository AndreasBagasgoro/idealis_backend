const { body, param, validationResult } = require('express-validator');
import { isFloat } from './../../node_modules/@types/validator/index.d';
import { Duration } from './../../node_modules/moment/src/lib/duration/constructor';

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation errors',
            errors: errors.array()

        });
    }
    next();
}

const userValidation = {
    create: [   
        body('firstName').noEmpty().withMessage('First name is required'),
        body('lastName').noEmpty().withMessage('Last name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').isLength({ min : 8}).withMessage('Password must be at least 8 characters'),
        validate
    ],
    update: [
        body('email').optional().isEmail().withMessage('Valid email is required'),
        body('password').optional().isLength({ min : 8}).withMessage('Password must be at least 8 characters'),
        validate
    ]
};

const userProfileValidation = {
    create: [
        body('userId').isInt().withMessage('Valid userId is required'),
        body('birthDate').optional().isISO8601().toDate().withMessage('Valid birthDate is required'),
        body('gender').optional().isIn(['Laki-laki', 'Perempuan']).withMessage('Gender harus laki-laki ataupun perempuan'),
        body('heightCm').optional().isFloat({min : 0, max: 300}).withMessage('Height must be a valid number between 0 and 300'),
        body('weightKg').optional().isFloat({min : 0, max: 500}).withMessage('Weight must be a valid number between 0 and 500'),
        validate
    ],
    update: [
        body('birthDate').optional().isISO8601().toDate().withMessage('Valid birthDate is required'),
        body('gender').optional().isIn(['Laki-laki', 'Perempuan']).withMessage('Gender harus laki-laki ataupun perempuan'),
        body('heightCm').optional().isFloat({min : 0, max: 300}).withMessage('Height must be a valid number between 0 and 300'),
        body('weightKg').optional().isFloat({min : 0, max: 500}).withMessage('Weight must be a valid number between 0 and 500'),
        validate
    ]
};

const recipeValidation = {
    create: [
        body('userId').optional().isInt().withMessage('Valid userId is required'),
        body('name').noEmpty().withMessage('Recipe name is required'),
        body('duration').optional().isInt({ min: 0}).wihtMessage('Duration  must be a positive integer'),
        body('servings').optional().isInt({ min: 1}).withMessage('Servings must be at least 1'),
        body('calories').optional().isFloat({ min: 0}).withMessage('Calories must be a positive number'),
        validate
    ],
    update: [
        body('name').optional().noEmpty().withMessage('Recipe name is required'),
        body('duration').optional().isInt({ min: 0}).wihtMessage('Duration  must be a positive integer'),
        body('servings').optional().isInt({ min: 1}).withMessage('Servings must be at least 1'),
        validate
    ]
};

const ingredientValidation = {
    create: [
        body('name').noEmpty().withMessage('Ingredient name is required'),
        body('category').optional().withMessage('Category must be a string'),
        body('quantity').optional().isFloat({ min : 0.1 }).withMessage('Quantity must be a positive number'),
        body('unit').optional().withMessage('Unit must be a string')
    ],
    update: [
        body('quantity').optional().isFloat({ min : 0.1 }).withMessage('Quantity must be a positive number'),
        validate
    ]
}

const recipeIngredientValidations = {
    create: [
        body('ingredientId').isInt().withMessage('Valid ingredientId is required'),
        body('recipeId').isInt().withMessage('Valid recipeId is required'),
        body('quantity').optional().isFloat({ min : 0.1 }).withMessage('Quantity must be a positive number'),
        body('amountNeeded').optional().isFloat({ min : 0.1 }).withMessage('Amount needed must be a positive number'),
        body('unit').optional().withMessage('Unit must be a string'),
        validate
    ],
    update: [
        body('quantity').optional().isFloat({ min : 0.1 }).withMessage('Quantity must be a positive number'),
        body('amountNeeded').optional().isFloat({ min : 0.1 }).withMessage('Amount needed must be a positive number'),
        body('unit').optional().withMessage('Unit must be a string'),
        validate
    ]
};

const idValidation = [
    param('id').isInt().withMessage('Valid ID is required'),
    validate
];

const userIdValidation = [
    param('userId').isInt().withMessage('Valid user ID is required'),
    validate
];

module.exports = {
    userValidation,
    userProfileValidation,
    recipeValidation,
    recipeIngredientValidations,
    idValidation,
    userIdValidation,
    ingredientValidation
};