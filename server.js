require('dotenv').config();

const express = require('express');
const path = require('path');
// const firebase = require('firebase');
const axios = require('axios');

var mongoose = require('mongoose');
mongoose.connect(process.env.PROD_MONGODB, { useMongoClient: true });
var db = mongoose.connection;

// mongoose models
var employeeSchema = mongoose.Schema({
    name: String,
    department: String,
    origin: String,
    joinDate: String,
    attendances: mongoose.Schema.Types.Mixed
});
var Employee = mongoose.model('Employee', employeeSchema);

// Initialize Firebase
// const config = {
//   apiKey: "AIzaSyBUmUxknvTLySGJr2RqMjqdGts4mSmW4q8",
//   authDomain: "employee-attendance-tracker.firebaseapp.com",
//   databaseURL: "https://employee-attendance-tracker.firebaseio.com",
//   projectId: "employee-attendance-tracker",
//   storageBucket: "employee-attendance-tracker.appspot.com",
//   messagingSenderId: "490495213936"
// };
// firebase.initializeApp(config);

// var database = firebase.database();

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

var data = [
  { 
    id: 1,
    name: "Jacky Efendi",
    position: "Front End Engineer",
    birthday: "1996-01-13",
    joinDate: "2017-11-01" 
  },
  { 
    id: 2,
    name: "Clara Rita Christian",
    position: "Pianist",
    birthday: "1999-06-11",
    joinDate: "2017-11-01" 
  },
  { 
    id: 3,
    name: "Toped",
    position: "Mascot",
    birthday: "2009-08-15",
    joinDate: "2009-08-15" 
  }
];

// Put all API endpoints under '/api'
app.post('/api/employee/add', (req, res) => {
  // data.forEach((v, i) => {
  //   database.ref('employees/'+v.id).set(v);
  // });
  res.send("OK");
});

app.get('/api/employee/all', (req, res) => {
  Employee.find({}, function(err, employees){
    // kalau mau send object
    // var employeeMap = {};
    // employees.forEach(function(employee) {
    //   employeeMap[employee._id] = employee;
    // });
    // res.send(employeeMap);
    
    res.json(employees);
  });
});
app.get('/api/employee/delete', (req, res) => {
  var id = req.query.id;
  data = data.filter((v) => {
    return v.id != id;
  });
  res.status(200);
  res.send();
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port);

console.log(`Employee Attendance Tracker listening on ${port}`);