var express = require('express');
var router = express.Router();

var applicationsCtrl = require('../controllers/applications');

/* GET applications listing. */
router.get('/', applicationsCtrl.index);

module.exports = router;
