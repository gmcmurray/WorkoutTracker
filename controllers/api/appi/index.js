const router = require('express').Router();
const ranges = require('./rangeRoute');

router.use('/range', ranges);

module.exports = router;
