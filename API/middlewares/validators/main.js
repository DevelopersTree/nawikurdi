const { query, body } = require('express-validator');
const validate = require('./validate');

module.exports = {
  genderValidator: [
    query('gender')
      .optional()
      .isIn(['M', 'F', 'O'])
      .withMessage('invalid gender option it should be one of M,F,O'),
    validate,
  ],
  submitNameValidator: [
    body('name')
      .isString()
      .isLength({ min: 2 })
      .withMessage('min length for a name is 2 char'),
    body('desc')
      .exists(),
    body('gender')
      .exists()
      .isIn(['M', 'F', 'O'])
      .withMessage('invalid gender option it should be one of M,F,O'),
    validate,
  ],
};
