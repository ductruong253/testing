var mongoose = require('mongoose');

var quotedPartSchema = new mongoose.Schema({
  apqp: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "APQP"
  }],
  quote_num: String,
  quote_item: String,
  customer_part_number: String,
  mold: Boolean,
  inchaged: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
})
module.exports = mongoose.model('Qpart',quotedPartSchema)
