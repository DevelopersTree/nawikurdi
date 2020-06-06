const { query, body } = require('express-validator');
const validate = require('./validate');
const db = require('../../config');

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
  voteNameValidator: [
    body('name_id')
      .isInt({gt:0})
      .withMessage('invalid id for name'),
    body('uid')
      .isString()
      .escape()
      .custom((value,{req}) =>{
        const {body} = req;
        return db('votes').count('id as count')
          .where('uid', body.uid)
          .andWhere('nameid', body.name_id)
          .andWhere('impact', body.impact)
          .then(([result])=>{
            if(result.count > 0)
              return Promise.reject(new Error('you cannot vote same name twice with same impact'));
            
            return Promise.resolve(true);
          })
      }),
    
    body('impact')
      .isIn(['positive', 'negative'])
      .withMessage('invalid impact value'),
    validate,
  ],
};
