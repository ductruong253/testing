var mongoose = require('mongoose');

var datasheetSchema = new mongoose.Schema({
  quote_item: String,
  customer_part_number: String,
  pic: String,
  rev: String,
  input_date: Date,
  confirmed_date: Date,
  org_date: Date,
  status: String
})
module.exports = mongoose.model('Datasheet',datasheetSchema)
