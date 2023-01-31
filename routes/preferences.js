var express = require('express');
var router = express.Router();
var preferencesCtrl = require('../controllers/preferences');
var ensureLoggedIn = require('../config/ensureLoggedIn');

router.post('/users/:id/preferences', ensureLoggedIn, preferencesCtrl.create);

router.put('/users/:id/preferences', ensureLoggedIn, preferencesCtrl.update);

router.delete('/users/:id/preferences', ensureLoggedIn, preferencesCtrl.delete);

module.exports = router;