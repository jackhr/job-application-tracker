const Job = require('../models/job');
const Contact = require('../models/contact');
const User = require('../models/user');

const metaDataParser = require('page-metadata-parser');
const domino = require('domino');

module.exports = {
  getLinkMetaData,
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
  try {
    const user = await User.findById(req.user._id);
    const contact = await Contact.create({});
    const job = await Job.create({
      companyName: `My New Company ${++user.applicationCount}`,
      contact: contact._id,
      user: req.user._id
    });
    await user.save();
    job.contact = contact;
    res.json(job);
  } catch(error) {
    res.json({
      error: error.message
    });
  }
}

async function deleteOne(req, res) {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    const user = await User.findById(req.user._id);
    user.applicationCount--;
    await user.save();
    await Contact.findByIdAndDelete(job.contact);
    if (req.xhr) {
      return res.json({
        status: 200,
        message: `Job: ${job.title}, successfully deleted`
      });
    }
    res.redirect(`/users/${job.user}`);
  } catch(err) {
    if (err) {
      console.log(err);
      if (req.xhr) return res.json(err);
    }
  }
}

async function getLinkMetaData(req, res) {

  const url = req.body.link;
  let metadata = {};

  const controller = new AbortController();
  setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url, {
      mode: 'no-cors',
      signal: controller.signal
    });
    if (response.ok) {
      const html = await response.text();
      const doc = domino.createWindow(html).document;
      metadata = metaDataParser.getMetadata(doc, url);
    } else {
      metadata.error = 'Network response was not ok';
    }
  } catch (error) {
    console.log('getLinkMetaData catch error:', error);
    metadata.error = error;
    if (error.name === 'AbortError') {
      metadata.error.customMessage = 'Fetch request was aborted';
    } else {
      metadata.error.customMessage = 'There was a problem with the fetch request';
    }
  }

  metadata.icon ||= '/images/global.svg';
  metadata.hostName = new URL(url).hostname;
  res.json(metadata);
}