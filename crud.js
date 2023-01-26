require('dotenv').config();
require('./config/database');
const User = require('./models/user');
const Job = require('./models/job');

let j, jobs;
let u, users;

Job.find({}, (err, jobDocs) => jobs = jobDocs);
User.find({}, (err, userDocs) => users = userDocs);