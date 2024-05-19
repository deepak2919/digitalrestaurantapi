const { query, validationResult } = require('express-validator');


const testValidate = [
    query('name').notEmpty().withMessage('name is required'),
    query('name').isLength({min:10}).withMessage('name length should be 5'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
  
  module.exports = { testValidate };
  