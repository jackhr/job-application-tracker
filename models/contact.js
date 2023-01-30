const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = Schema({
  name: {
    type: String,
    default: 'Contact'
  },
  email: {
    type: String,
    default: 'contact@company.com'
  },
  tel: {
    type: String,
    default: '(123)456-7890'
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);