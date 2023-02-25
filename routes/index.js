var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp * 1000 > Date.now()) {
      res.redirect(`/users/${payload.user._id}`)
    }
  }
  res.render('index', {
    invalid_creds: !!req.query.invalid_creds,
    email_exists: !!req.query.email_exists
  });
  
});

module.exports = router;
