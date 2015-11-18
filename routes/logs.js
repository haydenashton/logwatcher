var express = require('express');
var router = express.Router();
var logs = require('../controllers/logs');


router.get('/', logs.index);
router.get('/:logName', logs.getByName);

module.exports = router;
