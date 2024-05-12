const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const responseHandler = require('@helpers/responseHandler');
router.post('/',

  [
    check('email').isEmail(),
    check('stationId').isLength(),
    check('comment').isLength({ min: 5 }),
    check('rating').isNumeric(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responseHandler.handleErrorObject(res, 401, errors.array());
    }
    next();
  }, require('./create'));
router.get('/', require('./get'));
module.exports = router;