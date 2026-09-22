const { body } = require('express-validator');

// Validation rules for registration
const registerValidation = [
    body('firstName')
        .trim()
        .notEmpty()
        .withMessage('First name is required'),

    body('lastName')
        .trim()
        .notEmpty()
        .withMessage('Last name is required'),

    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email'),

    body('phoneNumber')
        .trim()
        .notEmpty()
        .withMessage('Phone number is required'),

    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
];

// Validation rules for login
const loginValidation = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email'),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
];

// Validation rules for forgot password
const forgotPasswordValidation = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email')
];

// Validation rules for resetting password
const resetPasswordValidation = [
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
];

module.exports = {
    registerValidation,
    loginValidation,
    forgotPasswordValidation,
    resetPasswordValidation
};