var express = require('express');
var router = express.Router();
var contactsCtrl = require('../controllers/contacts');
var ensureLoggedIn = require('../config/ensureLoggedIn');

router.put('/:id', ensureLoggedIn, contactsCtrl.update);

module.exports = router;
