const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  show,
  getAll,
  create,
  login,
  logout
};

function show(req, res) {
  User.findById(req.params.id, function(err, user) {
    res.render('users/show', {
      user
    });
  });
}

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
    res.cookie('token', token, { httpOnly: true }).redirect('/users/'+user._id);
  });
}

async function login(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new Error();
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) throw new Error();
  const token = createJWT(user);
  res.cookie('token', token, { httpOnly: true }).redirect('/users/'+user._id);
}

function logout(req, res) {
  res.clearCookie('token');
  res.redirect('/');
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

