var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users');
var ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /users
// router.get('/', usersCtrl.getAll);
// GET /users/logout
router.get('/logout', usersCtrl.logout);
// GET /users/:id
router.get('/:id', ensureLoggedIn, usersCtrl.show);
// POST /users
router.post('/', usersCtrl.create);
// POST /users
router.post('/login', usersCtrl.login);

module.exports = router;
