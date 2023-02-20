const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = Schema({
  title: {
    type: String,
    default: 'My New Role'
  },
  location: {
    type: String,
    default: 'A good place'
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
    enum: ['Remote', 'Hybrid', 'On-Site'],
    default: 'Remote'
  },
  dateApplied: {
    type: Date,
    default: new Date().setHours(0, 0, 0)
  },
  response: {
    type: String,
    enum: ['No Response', 'Interviewing', 'Offer Made', 'Declined'],
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
    default: 'I think this job is...'
  },
  coverLetter: {
    type: String,
    default: 'Link_to_my_cover_letter'
  },
  type: {
    type: String,
    enum: ['Contract', 'Temporary', 'Temp-To-Hire', 'Full Time'],
    default: 'Full Time'
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