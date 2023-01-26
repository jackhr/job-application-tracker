require('dotenv').config();
require('./config/database');
const User = require('./models/user');
const Job = require('./models/job');


let u, users;
let j, jobs;

Job.find({}, (err, jobDocs) => jobs = jobDocs);
User.find({}, (err, userDocs) => users = userDocs);

// async function main() {
//   // List all users
  
//   // User.find({}, (err, userDocs) => users = userDocs);
//   // Job.find({}, (err, jobDocs) => jobs = jobDocs);
//   const jobs = await Job.find({});
//   console.log(jobs);

//   const j = new User({
//     name: 'James Finn',
//     email: 'jf@gmail.com',
//     avatar: 'No comment'
//   });

//   j.save(function(err) {
//     // one way to handle errors
//     if (err) return console.log(err);
//     console.log(j);
//   });

//   // process.exit();
// }

// main();
