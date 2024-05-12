const router = require('express').Router();

router.get('/', require('./get').get);
router.get('/:id', require('./get').getById);

module.exports = router;
