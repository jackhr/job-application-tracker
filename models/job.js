const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = Schema({
  companyName: String,
  jobTitle: String,
  location: String,
  link: String,
  
  remote: {
    type: String,
    enum: ['Remote', 'Hybrid', 'On-site'],
    default: 'Remote'
  },
  dateFound: {
    type: Date,
    default: Date.now
  },
  dateApplied: {
    type: Date,
    default: Date.now
  },
  applied: {
    type: Boolean,
    default: False
  },
  response: {
    type: Boolean,
    default: False
  },
  preferance: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    default: 3
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);