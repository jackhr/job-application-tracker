const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = {
  getAll,
  create
};

function getAll(req, res) {
  User.find({}, (err, users) => {
    res.render('users/sign-in.ejs', {
      users
    });
  })
}

async function create(req, res) {
  const user = new User(req.body);
  user.save(function(err) {
    const token = createJWT(user);
    if (err) console.log(err);
    res.json(token);
  });
}

/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}

