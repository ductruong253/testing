const express = require('express');
var router = express.Router()
var APQP = require('../models/apqp');



router.get('/projects',function (req,res) {
  APQP.find({},function (err,allApqps) {
    if (err) {
      console.log(err);
    }else {
      res.render('./projects/index',{
        apqps: allApqps
      })
    }
  })
})

router.get('/projects/new',function (req,res) {
  res.render('projects/new')
})

//Define new projects
router.post('/projects',function (req,res) {
  console.log('ok');
  var apqp_number = req.body.apqp_number
  var apqp_quote_number = req.body.apqp_quote_number
  var apqp_customer = req.body.apqp_customer
  var apqp_customer_code = req.body.apqp_customer_code
  var apqp_prod_class = req.body.apqp_prod_class
  var apqp_indu_class = req.body.apqp_indu_class

  var new_APQP = {
    apqp_number: apqp_number,
    quote_num: apqp_quote_number,
    customer: apqp_customer,
    customer_code: apqp_customer_code,
    product_class: apqp_prod_class,
    industrial_class: apqp_indu_class
  }

  APQP.create(new_APQP,function (err,newlyCreated) {
    if(err){
      console.log(err);
    }else {
      console.log(newlyCreated);
      res.redirect("/projects")
    }
  })
})

module.exports = router
