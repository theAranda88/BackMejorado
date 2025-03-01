const { body } = require('express-validator');

const registerValidationRules = [
    body('nombre')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isString()
        .withMessage('Name must be a string'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email address'),

    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/^(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter and one number'),
    body('n_documento_identidad')
        .trim()
        .notEmpty()
        .withMessage('Documento identidad is required')
        .isString()
        .withMessage('Documento identidad must be a string'),

    body('sede')
        .trim()
        .notEmpty()
        .withMessage('Sede is required')
        .isString()
        .withMessage('Sede must be a string'),

    body('id_rol')
        .notEmpty()
        .withMessage('Id Rol is required')
        .isInt()
        .withMessage('Id Rol must be an integer'),

    body('n_ficha')
        .trim()
        .notEmpty()
        .withMessage('Ficha is required')
        .isString()
        .withMessage('Ficha must be a string'),

    body('jornada')
        .trim()
        .notEmpty()
        .withMessage('Jornada is required')
        .isString()
        .withMessage('Jornada must be a string'),

    body('nombre_del_programa')
        .trim()
        .notEmpty()
        .withMessage('Nombre del programa is required')
        .isString()
        .withMessage('Nombre del programa must be a string')
];

const loginValidatorRules =  [
        body('email')
            .trim()
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Please enter a valid email address'),

        body('password')
            .trim()
            .notEmpty()
            .withMessage('Password is required')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long')
            .matches(/^(?=.*[A-Z])(?=.*\d)/)
            .withMessage('Password must contain at least one uppercase letter and one number')
    ]

module.exports = { registerValidationRules: registerValidationRules, loginValidatorRules: loginValidatorRules };
