const mongoose = require("mongoose");
const {Schema} = mongoose;

const driverSchema = new Schema({
  name: String,
  surname: String,
  phone: String,
  email: String,
  password: String,
});

const Driver = mongoose.model("Drivers", driverSchema);

module.exports = Driver;
