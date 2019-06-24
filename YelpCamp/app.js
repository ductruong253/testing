var express = require("express")
var mongoose = require("mongoose")
var bodyParser = require("body-parser")
var passport = require('passport')
var User = require('./models/user')
var methodOverride = require('method-override');
var LocalStrategy = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose');
mongoose.connect("mongodb://localhost:27017/yelpcamp", {
  useNewUrlParser: true
})
var app = express()
app.use(methodOverride("_method"))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(require('express-session')({
  secret: "key word",
  resave: false,
  saveUninitialized: false
}))
app.use(function (req,res,next) {
  res.locals.currentUser = req.user
  next()
})
var commentRoutes = require('./routes/comments');
var campgroundRoutes = require('./routes/campgrounds')
var indexRoutes = require('./routes/index')

app.set("view engine", 'ejs')
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
passport.use(new LocalStrategy(User.authenticate()))
var Campground = require("./models/campground")
var seedDB = require("./seed")
var Comments = require("./models/comment")
app.use(express.static("public"))
app.use(commentRoutes)
app.use('/campgrounds', campgroundRoutes)
app.use(indexRoutes)

//seedDB()
/*Campground.create({
  name: "Son Tra",
  image: "http://static.asiawebdirect.com/m/bangkok/portals/vietnam/homepage/da-nang/attractions/son-tra-mountain/pagePropertiesImage/son-tra-da-nang.jpg",
  description: "Nice place"
}, function(err, campground){
  if (err){
    console.log(err);
  } else {
    console.log("Added new place: ");
    console.log(campground);
  }
})*/
app.use(bodyParser.urlencoded({
  extended: true
}))
app.set("view engine", "ejs")

//======================start up server on port 3000========================================
app.listen(3000, function() {
  console.log("Server Started!");
})
