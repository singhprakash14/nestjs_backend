const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const responseHandler = require('@helpers/responseHandler');
const processFile = require('@middleware/processFile');
const getRoutes = require('./get'); // Import get routes
const parkingOptionsRoutes = require('./parkingOptions'); // Import parkingOptions routes


router.post('/create',
  processFile.processSingleFileOptionalMiddleware,
  [
    check('name').isLength({ min: 5 }),
    check('capacity').isNumeric(),
    check('orgName').isLength({ min: 5 }),
    check('stringaddress').isLength({ min: 5 }),
    check('lat').isNumeric(),
    check('lng').isNumeric(), // Corrected: Added parentheses after isNumeric
    check('country').isLength({ min: 5 }),
    check('country_code').isLength({ min: 2 }),
    check('postalCode').isLength({ min: 5 }),
    check('city').isLength({ min: 3 }),
    check('state').isLength({ min: 3 })
  ],
  (req, res, next) => {
    console.log("req.body", req.body)
    const errors = validationResult(req);
    console.log("errors", errors)
    if (!errors.isEmpty()) {
      return responseHandler.handleErrorObject(res, 400, errors.array());
    }
    next();
  },
  require('./create')
);

router.get('/', getRoutes.get); // Handle GET request to '/'
router.use('/parkingoptions', parkingOptionsRoutes); // Delegate requests starting with '/parkingoptions' to the parkingOptions routes
router.get('/radius', getRoutes.getStationByRadius); // Handle GET request to '/radius
router.get('/:id', getRoutes.getById); // Handle GET request to '/:id'
router.delete('/:id', require('./delete')); // Handle DELETE request to '/:id'
router.post('/:id', processFile.processSingleFileOptionalMiddleware, require('./edit')); // Handle POST request to '/:id
module.exports = router;
