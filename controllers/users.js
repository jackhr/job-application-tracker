const User = require('../models/user');
const Job = require('../models/job');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  show,
  getAll,
  create,
  login,
  logout
};

async function show(req, res) {
  const token = req.cookies.token;
  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload.user._id;
  if (userId !== req.params.id) return redirect('/users/'+userId);
  const jobs = await Job.find({user: req.params.id}).populate(['user', 'contact']).exec()
  return res.render('users/show', {
    jobs,
    user: req.user
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
  if (!user) return res.redirect('/?invalid_creds=true');
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.redirect('/?invalid_creds=true');
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
    // expires in 1 hour
    { expiresIn: ('1h') }
  );
}

