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
  const invalid_creds = req.session.invalidCreds;
  const email_exists = req.session.emailExists;
  req.session.invalid_creds = false;
  req.session.emailExists = false;
  res.render('index', {
    invalid_creds,
    email_exists
  });
  
});

module.exports = router;
