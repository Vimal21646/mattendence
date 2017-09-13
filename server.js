require('dotenv').config();

const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect(process.env.PROD_MONGODB, { useMongoClient: true });
var db = mongoose.connection;

// mongoose models
var employeeSchema = mongoose.Schema({
    name: String,
    department: String,
    origin: String,
    joinDate: String,
    attendances: Object
});
var Employee = mongoose.model('Employee', employeeSchema);

const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.post('/api/employee/add', (req, res) => {
  // inserting a new employee
  var employee = new Employee({
    name: req.body.name,
    department: req.body.department,
    origin: req.body.origin,
    joinDate: req.body.joinDate,
    attendances: {}
  });
  
  employee.save(function(err, employee){
    if(err) {
      res.status(500); 
      res.send(err);
    } else {
      res.status(200);
      res.send(); // no error!
    }
  });

});
app.post('/api/employee/update', (req, res) => {
  // inserting a new employee
  var _id = req.body._id;
  var employee = {
    name: req.body.name,
    department: req.body.department,
    origin: req.body.origin,
    joinDate: req.body.joinDate
  };

  Employee.findByIdAndUpdate(_id, { $set: employee }, { new: true }, function (err, employee) {
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      res.status(200);
      res.send();
    }
  });
  
});

app.get('/api/employee/all', (req, res) => {
  // querying all employees
  Employee.find({}, null, {sort: {name: 1}}, function(err, employees){
    // kalau mau send object
    // var employeeMap = {};
    // employees.forEach(function(employee) {
    //   employeeMap[employee._id] = employee;
    // });
    // res.send(employeeMap);
    if(err){
      res.status(500);
      res.send(err);
    } else {
      res.json(employees);
    }
  });
});
app.get('/api/employee/:id', (req, res) => {
  // querying all employees
  var _id = req.params.id;

  Employee.findOne({_id: _id}, function(err, employee){
    // kalau mau send object
    // var employeeMap = {};
    // employees.forEach(function(employee) {
    //   employeeMap[employee._id] = employee;
    // });
    // res.send(employeeMap);
    if(err){
      res.status(500);
      res.send(err);
    } else {
      res.json(employee);
    }
  });
});
app.get('/api/employee/mark/:id/:date/:label', (req, res) => {
  var _id = req.params.id;
  var date = req.params.date;
  var label = req.params.label;
  if(label == "Absent") label = false;
  var employee = {};
  var updatedField = 'attendances.'+date;
  employee[updatedField] = label;
  
  Employee.findByIdAndUpdate(_id, { $set: employee }, { new: true }, function (err, employee) {
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      res.status(200);
      res.send(employee);
    }
  });
});
app.get('/api/employee/delete/:id', (req, res) => {
  var _id = req.params.id;
  Employee.findByIdAndRemove(_id, function(err){
    if(err) {
      res.status(500);
      res.send(err);
    } else {
      res.status(200);
      res.send();
    }
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port);

console.log(`Employee Attendance Tracker listening on ${port}`);