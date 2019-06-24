var express = require('express')
var router = express.Router();
var Campground = require('../models/campground')
var Comment = require('../models/comment')
//=========================Comments route==================================================
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {
        campground: campground
      })
    }
  })
})
router.post("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
      redirect("/campgrounds")
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {

          comment.author.id = req.user._id
          comment.author.username = req.user.username
          comment.save()
          campground.comments.push(comment)
          campground.save()
          console.log(comment);
          res.redirect("/campgrounds/" + campground._id)
        }
      })
    }
  })
})

router.get("/campgrounds/:id/comments/:comment_id/edit", function(req, res) {
  Comment.findById(req.params.comment_id, function(err, foundComment) {
    if (err) {
      res.render("back")
    } else {
      res.render("comments/edit", {
        campgroundId: req.params.id,
        comment: foundComment
      })
    }
  })
})

router.put("/campgrounds/:id/comments/:comment_id/edit",function (req,res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
    if (err) {
      res.redirect("back")
    }else {
      res.redirect("/campgrounds/"+req.params.id)
    }
  })
})

module.exports = router
