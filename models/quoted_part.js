var mongoose = require('mongoose');

var quotedPartSchema = new mongoose.Schema({
  apqp: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "APQP"
  }],
  quote_num: String,
  quote_item: String,
  customer_part_number: String,
  assigned_cd: String,
  mold: Boolean,
  pic: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member"
  }]
})
module.exports = mongoose.model('Qpart',quotedPartSchema)
