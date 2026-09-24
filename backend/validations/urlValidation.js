const { body, param } = require('express-validator');

const createUrlValidation = [
  body('originalUrl')
    .trim()
    .notEmpty()
    .withMessage('Original URL is required')
    .isURL({
      protocols: ['http', 'https'],
      require_protocol: true
    })
    .withMessage('Please provide a valid URL')
];

const shortCodeValidation = [
  param('shortCode')
    .trim()
    .notEmpty()
    .withMessage('Short code is required')
];

module.exports = {
  createUrlValidation,
  shortCodeValidation
};