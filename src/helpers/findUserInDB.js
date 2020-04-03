const Driver = require("../db/schemas/driver");
const Shipper = require("../db/schemas/shipper");

module.exports = async (user) => {
  const {_id, driver, shipper} = user;

  if (driver) {
    const driverInDB = await Driver.findById(_id, function(err, driver) {
      if (err) {
        console.log(err);
      }
    });

    const {trucks, name, surname, phone, email} = driverInDB;

    return {trucks, name, surname, phone, email};
  }

  if (shipper) {
    const shipperInDB = await Shipper.findById(_id, function(err, shipper) {
      if (err) {
        console.log(err);
      }
    });

    const {loads, name, surname, phone, email} = shipperInDB;

    return {loads, name, surname, phone, email};
  }

  return null;
};
