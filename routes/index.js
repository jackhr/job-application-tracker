var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    invalid_creds: !!req.query.invalid_creds
  });
});

module.exports = router;
