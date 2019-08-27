const { query } = require('express-validator');
const validate = require('../validate');

module.exports = [
  query('limit')
    .exists()
    .withMessage('limit value is required')
    .isInt({ gt: 0 })
    .withMessage('invalid limit value')
    .customSanitizer((value) => {
      if (Number.isNaN(value)) {
        return 10;
      }
      return Number.parseInt(value, 10);
    }),
  query('offset')
    .exists()
    .withMessage('offset value is required')
    .isInt({ gt: -1 })
    .withMessage('invalid offset value')
    .customSanitizer((value) => {
      if (Number.isNaN(value)) {
        return 0;
      }
      return Number.parseInt(value, 10);
    }),
  validate,
];
