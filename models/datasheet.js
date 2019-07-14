var mongoose = require('mongoose');

var datasheetSchema = new mongoose.Schema({
  quote_item:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Qpart"
  }],
  pic: String,
  input_date: Date,
  submit_date: Date,
  status: String
})
module.exports = mongoose.model('Datasheet',datasheetSchema)
