const router = require('express').Router();
router.post('/create', require('./create'));
module.exports = router;