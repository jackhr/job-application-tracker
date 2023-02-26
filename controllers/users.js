const User = require('../models/user');
const Job = require('../models/job');
const Preferences = require('../models/preferences');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MobileDetect = require('mobile-detect');

module.exports = {
  show,
  create,
  login,
  logout
};

async function show(req, res) {
  const token = req.cookies.token;
  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload.user._id;
  if (userId !== req.params.id) return redirect('/users/'+userId);
  const jobs = await Job.find({user: req.params.id}).populate(['contact']).exec()
  const preferences = await Preferences.findById(req.user.preferences);
  return res.render('users/show', {
    jobs,
    preferences,
    user: req.user,
    onMobile: Number(req.cookies.onMobile)
  });
}

async function create(req, res) {
  try {
    const existingUser = await User.find({'email': req.body.email});
    if (existingUser.length) {
      req.session.emailExists = true;
      return res.redirect('/');
    }
    const preferences = await Preferences.create({});
    const user = await User.create({
      ...req.body,
      preferences: preferences._id
    });
    const md = new MobileDetect(req.headers['user-agent']);
    createCookies(res, {
      token: createJWT(user),
      onMobile: Number(!!md.phone())
    });
    res.redirect(`/users/${user._id}`);
  } catch(error) {
    console.log(error);
    req.session.invalidCreds = true;
    res.redirect('/');
  }
}

async function login(req, res) {
  const user = await User.findOne({ email: req.body.email }).populate('preferences').exec();
  if (!user) {
    req.session.invalidCreds = true;
    return res.redirect('/');
  }
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    req.session.invalidCreds = true;
    return res.redirect('/');
  }
  const md = new MobileDetect(req.headers['user-agent']);
  createCookies(res, {
    token: createJWT(user),
    onMobile: Number(!!md.phone())
  });
  res.redirect('/users/'+user._id);
}

function logout(req, res) {
  res.clearCookie('token');
  res.clearCookie('onMobile');
  res.redirect('/');
}

/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    { user },
    process.env.SECRET,
    { expiresIn: ('1h') }
  );
}

function createCookies(res, cookiesObj) {
  for (let cookieName in cookiesObj) {
    const cookieVal = cookiesObj[cookieName];
    res.cookie(cookieName, cookieVal, { httpOnly: true });
  }
}