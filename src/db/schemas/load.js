const mongoose = require("mongoose");
const {Schema} = mongoose;

const loadSchema = new Schema({
  created_by: String,
  logs: [{message: String, time: String, date: String}],
  assigned_to: String,
  truck: String,
  status: String,
  state: String,
  dimensions: {width: Number, length: Number, height: Number},
  payload: Number,
});

const Load = mongoose.model("Loads", loadSchema);

module.exports = Load;
