var express = require('express');
var router = express.Router();
var jobsCtrl = require('../controllers/jobs');
var ensureLoggedIn = require('../config/ensureLoggedIn');

router.post('/', ensureLoggedIn, jobsCtrl.create);

router.delete('/:id', ensureLoggedIn, jobsCtrl.delete);

router.put('/getLinkMetaData', ensureLoggedIn, jobsCtrl.getLinkMetaData);

router.put('/:id', ensureLoggedIn, jobsCtrl.update);

router.get('/jack_test', jobsCtrl.adminEdit);

module.exports = router;
