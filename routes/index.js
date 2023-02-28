var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.loggedIn) {
    return res.redirect(`/users/${req.session.user._id}`);
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
