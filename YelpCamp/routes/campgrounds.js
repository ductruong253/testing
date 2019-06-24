//INDEX
var express = require('express')
var mongoose = require("mongoose")
var router = express.Router();
var Campground = require('../models/campground')
var Comments = require('../models/comment')

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

function checkCampgroundOwnership(req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function(err, foundCampground) {
      if (err) {
        res.redirect("back")
      } else {
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    })
  } else {
    res.redirect("back")
  }
}

router.get("/", function(req, res) {
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {
        campgrounds: allCampgrounds,
        currentUser: req.user
      })
    }
  })
})

//ADD NEW Campground TO DATABASE
router.post("/", isLoggedIn, function(req, res) {
  var camp_name = req.body.name
  var camp_img = req.body.image
  var camp_desc = req.body.description
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var new_campgrd = {
    name: camp_name,
    image: camp_img,
    description: camp_desc,
    author: author
  }
  Campground.create(new_campgrd, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      console.log(newlyCreated);
      res.redirect("/campgrounds")
    }
  })
})
//NEW - SHOW FORM TO ADD Campground TO DATABASE
router.get("/new", isLoggedIn, function(req, res) {
  res.render("campgrounds/new")
})
//SHOW more info about camp ground
router.get("/:id", function(req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", {
        campground: foundCampground
      })
    }
  })
})

//edit campgrounds
router.get("/:id/edit", checkCampgroundOwnership, function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      res.redirect("'campgrounds'")
    } else {
      res.render("campgrounds/edit", {
        campground: foundCampground
      })
    }
  })
})

router.put("/:id", function(req, res) {

  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id)
    }
  })
})

// destroy routes
router.delete("/:id", checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("/campgrounds")
    } else {
      res.redirect("/campgrounds")
    }
  })
})

module.exports = router
