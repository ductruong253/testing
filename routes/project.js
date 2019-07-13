const express = require('express');
var router = express.Router()
var APQP = require('../models/apqp');
var Qpart = require('../models/quoted_part');

router.get('/projects', function(req, res) {
  APQP.find({}, function(err, allApqps) {
    if (err) {
      console.log(err);
    } else {
      res.render('./projects/index', {
        apqps: allApqps
      })
    }
  })
})
router.get('/projects/new', function(req, res) {
  res.render('projects/new')
})
//Define new projects
router.post('/projects', function(req, res) {
  console.log('ok');
  var apqp_number = req.body.apqp_number
  var apqp_quote_number = req.body.apqp_quote_number
  var apqp_customer = req.body.apqp_customer
  var apqp_customer_code = req.body.apqp_customer_code
  var apqp_prod_class = req.body.apqp_prod_class
  var apqp_indu_class = req.body.apqp_indu_class
  var quote_item_arr = req.body.quote_item

  var new_APQP = {
    apqp_number: apqp_number,
    quote_num: apqp_quote_number,
    customer: apqp_customer.toUpperCase(),
    customer_code: apqp_customer_code.toUpperCase(),
    product_class: apqp_prod_class,
    industrial_class: apqp_indu_class
  }
//Create new APQP
  APQP.create(new_APQP, function(err, newlyCreatedAPQP) {
    if (err) {
      console.log(err);
    } else {
      console.log(newlyCreatedAPQP);
      res.redirect("/projects")
    }
  })
// For each quote_item, create quote item in database

quote_item_arr.forEach(function (quote_item_element) {
  if (quote_item_element.mold=="True"){
    var new_Quote_item ={
      apqp: new_APQP.apqp_number,
      quote_item: quote_item_element.item.toUpperCase(),
      customer_part_number: quote_item_element.customer_part_number.toUpperCase(),
      assigned_cd: quote_item_element.cd.toUpperCase(),
      mold: true
    }
  }else {
    var new_Quote_item ={
      apqp: new_APQP.apqp_number,
      quote_item: quote_item_element.item.toUpperCase(),
      customer_part_number: quote_item_element.customer_part_number.toUpperCase(),
      assigned_cd: quote_item_element.cd.toUpperCase(),
      mold: false
    }
  }
  Qpart.create(new_Quote_item, function (err, newlyCreatedQpart) {
    if (err) {
      console.log(err);
    }else {
      //Adding newlyCreatedQpart to APQP
      APQP.findOne({apqp_number: new_APQP.apqp_number}, function (err, foundAPQP) {
        if (err) {
          console.log(err);
        }else {
          foundAPQP.quoted_part.push(newlyCreatedQpart)
          foundAPQP.save(function (err, saved_data) {
            if (err) {
              console.log(err);
            }else {
              console.log(saved_data);
            }
          })
        }
      })
    }
  })
})


})


router.get('/project/:id',function (req,res) {
  APQP.findById(req.params.id).populate('quoted_part').exec(function (err, foundAPQP) {
    if (err) {
      console.log(err);
    }else {

      res.render("projects/project", {apqp:foundAPQP})
    }
  })
})

router.get('/project/new_ds',function (req,res) {
  if (err) {
    console.log(err);
  }else {
    res.send("New Datasheet Page");
  }
})
module.exports = router
