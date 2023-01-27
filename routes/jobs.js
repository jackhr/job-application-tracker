var express = require('express');
var router = express.Router();
var jobsCtrl = require('../controllers/jobs');
var ensureLoggedIn = require('../config/ensureLoggedIn');

router.post('/', ensureLoggedIn, jobsCtrl.create);

module.exports = router;
