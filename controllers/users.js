const User = require('../models/user');

module.exports = {
  getAll,
  create
};

function getAll(req, res) {
  User.find({}, (err, users) => {
    res.render('users/index', {
      users
    });
  })
}

async function create(req, res) {
  const user = new User(req.body);
  user.save(function(err) {
    if (err) console.log(err);
    res.redirect(`/`);
  });
}