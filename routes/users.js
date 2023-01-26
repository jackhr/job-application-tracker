var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users');

// GET /users
router.get('/', usersCtrl.getAll);
// GET /users/:id
router.get('/:id', usersCtrl.show);
// POST /users
router.post('/', usersCtrl.create);
// POST /users
router.post('/login', usersCtrl.login);

module.exports = router;
