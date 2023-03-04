const User = require('../models/user');
const Preferences = require('../models/preferences');

module.exports = {
  update,
  updateTheme,
  delete: deleteOne
};

async function updateTheme(req, res) {
  
  try {
    const user = await User.findById(req.session.user._id).populate('preferences').exec();
    user.preferences.theme = req.body.theme;
    await user.preferences.save();

    res.json(user.preferences);
  } catch(error) {
    res.json({
      status: 500,
      error: error.message
    });
  }

}

async function update(req, res) {

  console.log('req.body:', req.body);
  
  try {
    const user = await User.findById(req.session.user._id).populate('preferences').exec();
    if (req.body.isOrderDirection) {
      user.preferences.orderDirection = req.body.preference;
    } else {
      user.preferences[req.body.preference] = !user.preferences[req.body.preference];
    }
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

  const preferences = await Preferences.findByIdAndDelete(req.session.user.preferences);
  
  if (req.xhr) return res.json(preferences);

  res.redirect('/users/logout');
  
}