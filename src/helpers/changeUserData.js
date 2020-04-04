const Driver = require("../db/schemas/driver");
const Shipper = require("../db/schemas/shipper");

module.exports = async (id, data) => {
  const driver = await Driver.findByIdAndUpdate(id, data, (err, doc) => {
    if (err) {
      throw new Error("error");
    }
  });

  const shipper = await Shipper.findByIdAndUpdate(id, data, (err, doc) => {
    if (err) {
      throw new Error("error");
    }
  });

  if (driver) {
    return true;
  }

  if (shipper) {
    return true;
  }

  return false;
};
