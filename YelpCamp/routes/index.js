var express = require('express')
var router = express.Router()
var passport = require('passport')
var user = require('../models/user')


//Root route
router.get("/", function(req, res) {
  res.render("landing")
})

//Authenticate route
router.get('/register', function(req, res) {
  res.render('register')
})
router.post('/register', function(req, res) {
  var newUser = new User({
    username: req.body.username
  })
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render('register')
    }
    passport.authenticate('local')(req, res, function() {
      res.redirect('/campgrounds')
    })
  })
})
//Show login FORM
router.get('/login', function(req, res) {
  res.render('login')
})
router.post('/login', passport.authenticate('local', {
  sucessRedirect: '/campgrounds',
  failureRedirect: '/login'
}), function(req, res) {
  res.redirect('/campgrounds')
})
//logout route
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/campgrounds')
})

module.exports = router
