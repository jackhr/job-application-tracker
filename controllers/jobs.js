const Job = require('../models/job');
const Contact = require('../models/contact');

module.exports = {
  create,
  update,
  delete: deleteOne,
};

async function update(req, res) {

  const job = await Job.findById(req.params.id);

  for (jobField in req.body) {
    const newVal = req.body[jobField];
    if (newVal != job[jobField]) job[jobField] = newVal;
  }

  await job.save();
  res.json(job);
}

async function create(req, res) {

  const contact = await Contact.create({});
  const job = await Job.create({
    contact: contact._id,
    user: req.user._id
  });

  job.contact = contact;

  res.json(job);
}

function deleteOne(req, res) {
  Job.findByIdAndDelete(req.params.id, function(err, job) {
    if (err) console.log(err);
    if (req.xhr) {
      if (err) return res.json(err);
      return res.json({
        status: 200,
        message: `Job: ${job.title}, successfully deleted`
      });
    }
    res.redirect(`/users/${job.user}`);
  })
}