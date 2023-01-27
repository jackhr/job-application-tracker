var express = require('express');
var router = express.Router();
var jobsCtrl = require('../controllers/jobs');
var ensureLoggedIn = require('../config/ensureLoggedIn');

router.post('/', ensureLoggedIn, jobsCtrl.create);

router.delete('/:id', ensureLoggedIn, jobsCtrl.delete);

module.exports = router;
