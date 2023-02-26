var express = require('express');
var router = express.Router();
var preferencesCtrl = require('../controllers/preferences');
var ensureLoggedIn = require('../config/ensureLoggedIn');

router.put('/users/:id/preferences', ensureLoggedIn, preferencesCtrl.update);

router.put('/users/:id/preferences/theme', ensureLoggedIn, preferencesCtrl.updateTheme);

router.delete('/users/:id/preferences', ensureLoggedIn, preferencesCtrl.delete);

module.exports = router;