const Driver = require("../db/schemas/driver");
const Shipper = require("../db/schemas/shipper");
const bcrypt = require("bcrypt");

module.exports = async (email, password) => {
  const driver = await Driver.findOne({email}, (err, adventure) => {
    if (err) {
      console.log(err);
    }
  });

  if (driver) {
    if (bcrypt.compareSync(password, driver.password)) {
      const {_id, name, surname, phone, email} = driver;
      return {_id, name, surname, phone, email, driver: true};
    }
  }

  const shipper = await Shipper.findOne({email}, (err, adventure) => {
    if (err) {
      console.log(err);
    }
  });

  if (shipper) {
    if (bcrypt.compareSync(password, shipper.password)) {
      const {_id, name, surname, phone, email} = shipper;
      return {_id, name, surname, phone, email, shipper: true};
    }
  }

  return false;
};
