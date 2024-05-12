const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const processFile = require('@middleware/processFile');
const responseHandler = require('@helpers/responseHandler');

const registerHandler = require('./register');

router.post('/register',
  processFile.processSingleFileOptionalMiddleware,
  [
    check('email').isEmail(),
    check('password').isLength({ min: 5 }),
    check('firstName').isLength({ min: 3 }),
    check('lastName').isLength({ min: 3 }),
    check("stationName").isLength({ min: 4 }),
    check('phone').isLength({ min: 10 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responseHandler.handleErrorObject(res, 401, errors.array());
    }
    next();
  },
  registerHandler
);

router.post('/login',
  [check("email").isEmail(),
  check("password").isLength({ min: 5 })
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responseHandler.handleErrorObject(res, 401, errors.array());
    }
    next();
  }, require('./login'));
module.exports = router;
