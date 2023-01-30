const Contact = require('../models/contact');

module.exports = {
  update
}

async function update(req, res) {

  const contact = await Contact.findById(req.params.id);

  for (contactField in req.body) {
    const newVal = req.body[contactField];
    if (newVal != contact[contactField]) contact[contactField] = newVal;
  }

  await contact.save();
  res.json(contact);
}