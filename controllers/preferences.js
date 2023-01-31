const User = require('../models/user');
const Preferences = require('../models/preferences');

module.exports = {
  update,
  delete: deleteOne
};

async function update(req, res) {
  
  try {
    const user = await User.findById(req.user._id).populate('preferences').exec();
    user.preferences[req.body.preference] = !user.preferences[req.body.preference];
    await user.preferences.save();

    res.json(user.preferences);
  } catch(error) {
    res.json({
      status: 500,
      error: error.message
    });
  }

}

async function deleteOne(req, res) {

  const preferences = await Preferences.findByIdAndDelete(req.user.preferences);
  
  if (req.xhr) return res.json(preferences);

  res.redirect('/users/logout');
  
}