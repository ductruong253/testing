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
  res.send(req.body);
})

module.exports = router
