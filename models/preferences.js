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
}, {
  timestamps: true
});

module.exports = mongoose.model('Preferences', preferencesSchema);