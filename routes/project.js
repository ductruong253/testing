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
    customer_code: apqp_customer_code,
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
      quote_item: quote_item_element.item,
      customer_part_number: quote_item_element.customer_part_number,
      assigned_cd: quote_item_element.cd,
      mold: true
    }
  }else {
    var new_Quote_item ={
      quote_item: quote_item_element.item,
      customer_part_number: quote_item_element.customer_part_number,
      assigned_cd: quote_item_element.cd,
      mold: false
    }
  }
  console.log(new_Quote_item);
})


})

module.exports = router
