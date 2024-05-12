const router = require('express').Router();
router.post('/create', require('./create.js'))
router.put('/:id', require('./edit.js'))

router.get('/', require('./get'))
module.exports = router;