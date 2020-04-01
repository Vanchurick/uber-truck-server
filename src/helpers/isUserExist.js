const Driver = require("../db/schemas/driver");
const Shipper = require("../db/schemas/shipper");

module.exports = async (email) => {
  const isDriverExist = await Driver.exists({email});
  const isShipperExist = await Shipper.exists({email});
  return isDriverExist || isShipperExist || false;
};
