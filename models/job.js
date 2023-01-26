const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = Schema({
  dateFound: Date,
  dateApplied: Date,
  companyName: String,
  jobTitle: String,
  location: String,
  remote: String,
  applied: Boolean,
  response: Boolean,
  link: String,
  preferance: {
    type: Number,
    enum: [1, 2, 3, 4, 5]
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);