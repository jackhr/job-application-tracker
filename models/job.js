const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = Schema({
  title: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: 'https://www.my_new_job.com'
  },
  companyName: {
    type: String,
    default: 'My New Company'
  },
  remote: {
    type: String,
    enum: ['Remote', 'Hybrid', 'On-site'],
    default: 'Remote'
  },
  dateApplied: {
    type: Date,
    default: new Date().setHours(0, 0, 0)
  },
  response: {
    type: String,
    enum: ['No Response', 'Interviewing', 'Declined'],
    default: 'No Response'
  },
  preference: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    default: 3
  },
  salary: {
    type: Number,
    default: 0,
  },
  notes: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Not Started Yet', 'In Progress', 'Submitted'],
    default: 'Not Started Yet'
  },
  contact: {
    type: Schema.Types.ObjectId,
    ref: 'Contact'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);