var express = require('express');
var app = express()

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}))

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/eg_db',{
  useNewUrlParser:true
})
var APQP = require('./models/apqp');
var Qpart = require('./models/quoted_part')

app.set('view engine', 'ejs')
app.use(express.static('public'))

//Landing page
app.get('/', function (req,res) {
  res.render('landing')
})

app.get('/projects',function (req,res) {
  APQP.find({},function (err,allApqps) {
    if (err) {
      console.log(err);
    }else {
      res.render('projects/index',{
        apqps: allApqps
      })
    }
  })
})

app.get('/projects/new',function (req,res) {
  res.render('projects/new')
})

//Define new projects
app.post('/projects',function (req,res) {
  console.log('ok');
  res.send(req.body);
})

//Start app on port 3000
app.listen(3000, function() {
  console.log("Server Started!");
})
