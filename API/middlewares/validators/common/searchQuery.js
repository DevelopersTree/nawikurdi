const { query } = require('express-validator');
const validate = require('../validate');

module.exports = [
  query('q')
    .optional()
    .isLength({ min: 1, max: 255 })
    .withMessage('invalid query length must be between 1->255'),
  validate,
];
