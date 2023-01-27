const Job = require('../models/job');

module.exports = {
  create
};

async function create(req, res) {
  
  req.body.dateFound = new Date(req.body.dateFound);
  req.body.dateApplied = new Date(req.body.dateApplied);
  req.body.response = !!Number(req.body.response);
  req.body.preference = Number(req.body.preference);
  
  await Job.create({
    ...req.body,
    user: req.user._id
  });
  
  res.redirect('/users/'+req.user._id);
}