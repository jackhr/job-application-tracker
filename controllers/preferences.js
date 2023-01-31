const User = require('../models/user');
const Preferences = require('../models/preferences');

module.exports = {
  create,
  update,
  delete: deleteOne
};

async function create(req, res) {

  const preferences = await Preferences.create({});
  const user = await User.findById(req.user._id);

  user.preferences = preferences._id;
  await user.save();

  res.redirect('/users/'+user._id);

}

async function update(req, res) {
  
  const user = await User.findById(req.user._id).populate('preferences').exec();
  const preferences = {
    ...user.preferences,
    ...req.body
  };

  await preferences.save();

  if (req.xhr) return res.json(preferences);

  res.redirect(`/users/${req.user._id}`);
  
}

async function deleteOne(req, res) {

  const preferences = await Preferences.findByIdAndDelete(req.user.preferences);
  
  if (req.xhr) return res.json(preferences);

  res.redirect('/users/logout');
  
}