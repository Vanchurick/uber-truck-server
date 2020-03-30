const mongoose = require("mongoose");
const {Schema} = mongoose;

const shipperSchema = new Schema({
  name: String,
  surname: String,
  phone: String,
  email: String,
  password: String,
  loads: Array,
});

const Shipper = mongoose.model("Shipers", shipperSchema);

module.exports = Shipper;
