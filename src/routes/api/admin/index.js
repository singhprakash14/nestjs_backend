const express = require('express');
const router = express.Router();
router.use('/stations', require('./stations'));
router.use('/feedback', require('./userfeedback'));
module.exports = router;