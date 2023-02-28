const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preferencesSchema = Schema({
  showNotes: {
    type: Boolean,
    default: true
  },
  showCoverLetter: {
    type: Boolean,
    default: true
  },
  showJobLink: {
    type: Boolean,
    default: true
  },
  showJobLocation: {
    type: Boolean,
    default: true
  },
  showContact: {
    type: Boolean,
    default: true
  },
  showColors: {
    type: Boolean,
    default: true
  },
  showSalary: {
    type: Boolean,
    default: true
  },
  theme: {
    type: String,
    default: 'default'
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Preferences', preferencesSchema);