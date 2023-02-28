var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users');
var ensureLoggedIn = require('../config/ensureLoggedIn');
var ensureCorrectUser = require('../config/ensureCorrectUser');

router.get('/logout', usersCtrl.logout);

router.get('/:id', ensureLoggedIn, ensureCorrectUser, usersCtrl.show);

router.post('/', usersCtrl.create);

router.post('/login', usersCtrl.login);

module.exports = router;
