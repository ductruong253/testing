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

//Router Define
var projectRoute = require('./routes/project');


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(projectRoute)

//Landing page
app.get('/', function (req,res) {
  res.render('landing')
})



//Start app on port 3000
app.listen(3000, function() {
  console.log("Server Started!");
})
