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
  
  req.body.preference = Number(req.body.preference);
  req.body.dateApplied = new Date(req.body.dateApplied);

  if (isNaN(req.body.dateFound)) delete req.body.dateFound;
  if (isNaN(req.body.dateApplied)) delete req.body.dateApplied;
  if (!req.body.companyName) delete(req.body.companyName);
  if (!req.body.name) delete req.body.name;
  if (!req.body.email) delete req.body.email;
  if (!req.body.tel) delete req.body.tel;

  // console.log(req.user);

  if (true) {

    const contact = await Contact.create({
      name: req.body.name,
      email: req.body.email,
      tel: req.body.tel,
    });

    delete req.body.name;
    delete req.body.email;
    delete req.body.tel;

    req.body.contact = contact._id;

    console.log(req.body);

    console.log(contact);
    
    await Job.create({
      ...req.body,
      user: req.user._id
    });
  }
  
  
  res.redirect('/users/'+req.user._id);
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