const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = Schema({
  title: String,
  location: String,
  link: String,
  companyName: {
    type: String,
    default: 'My New Company'
  },
  remote: {
    type: String,
    enum: ['Remote', 'Hybrid', 'On-site'],
    default: 'Remote'
  },
  dateFound: {
    type: Date,
    default: new Date().setHours(0, 0, 0)
  },
  dateApplied: {
    type: Date,
    default: new Date().setHours(0, 0, 0)
  },
  response: {
    type: Boolean,
    default: false
  },
  preference: {
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