const Application = require('../models/application');

module.exports = {
  index
};

function index(req, res) {
  res.render('users/index', {
    applications: Application.getAll()
  });
}