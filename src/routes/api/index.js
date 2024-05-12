const express = require('express');
const { authenticateToken, adminAuthenticateToken } = require('@middleware/jwtauth');
const responseHandler = require('@helpers/responseHandler');

const router = express.Router();
router.use('/auth', require('./auth'));
router.use('/common', require('./common'));
router.use(authenticateToken);
router.use('/admin', require('./admin'));
// router.use('/admin', adminAuthenticateToken, require('./Admin'));

// Catch-all route for undefined routes
router.use((req, res) => {
  // Respond with a 404 status code and a message
  console.table({ status: 404, message: 'Route not found' });
  return responseHandler.handleErrorResponse(res, 404, 'Route not found');
});

module.exports = router;