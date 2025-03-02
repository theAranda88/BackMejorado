const { body, validationResult } = require('express-validator');

// Validation rules for user registration
const validateUserRegistration = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string')
    .isLength({ min: 3, max: 100 }).withMessage('Name must be between 3 and 100 characters'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter'),

  body('dni')
    .notEmpty().withMessage('DNI is required')
    .isString().withMessage('DNI must be a string')
    .isLength({ min: 5, max: 20 }).withMessage('DNI must be between 5 and 20 characters'),
    
  body('id_rol')
    .notEmpty().withMessage('Role ID is required')
    .isInt({ min: 1 }).withMessage('Role ID must be a positive integer'),
];


module.exports = {
  validateUserRegistration,
};

