var mongoose = require('mongoose');

var apqpSchema = new mongoose.Schema({
  apqp_number: String,
  customer: String,
  customer_code: String,
  product_class: String,
  industrial_class: String,
  quote_num: String,
  quoted_part: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Qpart"
  }]
})

module.exports = mongoose.model("APQP",apqpSchema)
