var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users');

// GET /users
router.get('/', usersCtrl.getAll);
// POST /users
router.post('/', usersCtrl.create);

module.exports = router;
