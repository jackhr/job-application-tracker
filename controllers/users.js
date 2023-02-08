const User = require('../models/user');
const Job = require('../models/job');
const Preferences = require('../models/preferences');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MobileDetect = require('mobile-detect');

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
  const jobs = await Job.find({user: req.params.id}).populate(['contact']).exec()
  const preferences = await Preferences.findById(req.user.preferences);
  return res.render('users/show', {
    jobs,
    preferences,
    user: req.user,
    onMobile: Number(req.cookies.onMobile)
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
  try {
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
    res.redirect('/?invalid_creds=true')
  }
}

async function login(req, res) {
  const user = await User.findOne({ email: req.body.email }).populate('preferences').exec();
  if (!user) return res.redirect('/?invalid_creds=true');
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.redirect('/?invalid_creds=true');
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
    // data payload
    { user },
    process.env.SECRET,
    // expires in 1 hour
    { expiresIn: ('1h') }
  );
}

function createCookies(res, cookiesObj) {
  for (let cookieName in cookiesObj) {
    const cookieVal = cookiesObj[cookieName];
    res.cookie(cookieName, cookieVal, { httpOnly: true });
  }
}