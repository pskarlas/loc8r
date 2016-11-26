var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main.js');

// Get Homepage
router.get('/', ctrlMain.index);
module.exports = router;