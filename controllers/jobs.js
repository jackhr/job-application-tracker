const Job = require('../models/job');

module.exports = {
  index
};

function index(req, res) {
  res.render('users/index', {
    jobs: Job.getAll()
  });
}