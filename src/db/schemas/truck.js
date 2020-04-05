const mongoose = require("mongoose");
const {Schema} = mongoose;

const truckSchema = new Schema({
  created_by: String,
  assigned_to: String,
  status: String,
  type: String,
  dimensions: {width: Number, length: Number, height: Number},
  payload: Number,
});

const Truck = mongoose.model("Trucks", truckSchema);

module.exports = Truck;
