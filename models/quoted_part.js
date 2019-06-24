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
  }],
  datasheet: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Datasheet"
  }],
  purchase_order: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:"PurchaseOrder"
  }]
})
module.exports = mongoose.model('Qpart',quotedPartSchema)
