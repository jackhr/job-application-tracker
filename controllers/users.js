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
  const jobs = await Job.find({user: req.session.user._id}).populate(['contact']).exec()
  const preferences = await Preferences.findById(req.session.user.preferences);
  return res.render('users/show', {
    jobs,
    preferences,
    user: req.session.user,
    onMobile: Number(req.session.onMobile)
  });
}

async function create(req, res) {
  try {
    if (req.body.password.length < 5) throw new Error();
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
    updateSessionVals(req, {
      token: createJWT(user),
      onMobile: Number(!!md.phone()),
      loggedIn: true,
      user,
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
  updateSessionVals(req, {
    token: createJWT(user),
    onMobile: Number(!!md.phone()),
    loggedIn: true,
    user
  });
  res.redirect('/users/'+user._id);
}

function logout(req, res) {
  req.session.destroy();
  return res.redirect('/');
}

/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    { user },
    process.env.SECRET,
    { expiresIn: process.env.JWT_MAX_AGE.toString() }
  );
}

function updateSessionVals(req, newSessionVals) {
  for (const sessionKey in newSessionVals) {
    const sessionVal = newSessionVals[sessionKey];
    if (sessionKey === 'user') {
      if (typeof sessionVal.preferences === 'object') {
        sessionVal.preferences = sessionVal.preferences._id
      }
    }
    req.session[sessionKey] = sessionVal;
  }
}