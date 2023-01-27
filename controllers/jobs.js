const Job = require('../models/job');

module.exports = {
  create,
  delete: deleteOne
};

async function create(req, res) {
  
  req.body.response = !!Number(req.body.response);
  req.body.preference = Number(req.body.preference);
  req.body.dateFound = new Date(req.body.dateFound);
  req.body.dateApplied = new Date(req.body.dateApplied);

  if (isNaN(req.body.dateFound)) delete req.body.dateFound;
  if (isNaN(req.body.dateApplied)) delete req.body.dateApplied;

  console.log(req.body);
  
  await Job.create({
    ...req.body,
    user: req.user._id
  });
  
  res.redirect('/users/'+req.user._id);
}

function deleteOne(req, res) {
  Job.findByIdAndDelete(req.params.id, function(err, job) {
    if (err) console.log(err);
    res.redirect(`/users/${job.user}`);
  })
}