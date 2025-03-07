const { body, validationResult } = require('express-validator');

const validateUserRegistration = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string')
    .isLength({ min: 3, max: 100 }).withMessage('Name must be between 3 and 100 characters'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('dni')
    .notEmpty().withMessage('DNI is required')
    .isString().withMessage('DNI must be a string')
    .isLength({ min: 5, max: 20 }).withMessage('DNI must be between 5 and 20 characters'),
    
  body('id_rol')
    .notEmpty().withMessage('Role ID is required')
    .isInt({ min: 1 }).withMessage('Role ID must be a positive integer'),

  body('address')
      .notEmpty().withMessage('Address is required')
      .isString().withMessage('Address must be a string')
      .isLength({ max: 100 }).withMessage('Address must be a maximum of 100 characters')
      .matches(/\d+/).withMessage('Address must contain at least one number')
      .matches(/\b\w+\b/).withMessage('Address must contain at least a street name'),
];

module.exports = {
  validateUserRegistration,
};

