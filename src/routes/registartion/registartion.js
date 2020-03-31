const path = require("path");
const jwt = require("jsonwebtoken");
const config = require("config");
const Driver = require("../../db/schemas/driver.js");
const Shipper = require("../../db/schemas/shipper");
const driverValidator = require(path.resolve(
  __dirname,
  "..",
  "..",
  "db",
  "schemas",
  "requestsBodyValidators",
  "driver",
));

const shipperValidator = require(path.resolve(
  __dirname,
  "..",
  "..",
  "db",
  "schemas",
  "requestsBodyValidators",
  "shipper",
));
const cryptPassword = require("../../helpers/cryptPassword");

const registration = async (req, res) => {
  const {driver, shipper} = req.body;
  const secret = config.get("appConfig.secret");

  if (driver) {
    const validation = driverValidator.validate(req.body);

    if (validation.error) {
      const resp = {
        status: "Driver have not been created",
        message: validation.error,
      };

      res.writeHead(400, {"Content-Type": "application/json"});
      res.end(JSON.stringify(resp));
      return;
    }

    const userDriver = req.body;
    userDriver.password = cryptPassword(req.body.password);

    await Driver.create(userDriver)
      .then((result) => {
        const jwtToken = jwt.sign(JSON.stringify(result), secret);
        const {trucks, _id, name, surname, phone, email} = result;

        const resp = {
          status: "Driver have been created",
          user: {trucks, _id, name, surname, phone, email},
          jwtToken,
        };

        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(resp));
      })
      .catch((err) => console.log(err));
    return;
  }

  if (shipper) {
    const validation = shipperValidator.validate(req.body);

    if (validation.error) {
      const resp = {
        status: "Shipper have not been created",
        message: validation.error,
      };

      res.writeHead(400, {"Content-Type": "application/json"});
      res.end(JSON.stringify(resp));
      return;
    }

    const userShipper = req.body;
    userShipper.password = cryptPassword(req.body.password);

    await Shipper.create(req.body)
      .then((result) => {
        const jwtToken = jwt.sign(JSON.stringify(result), secret);
        const {loads, _id, name, surname, phone, email} = result;

        const resp = {
          status: "Shipper have been created",
          user: {loads, _id, name, surname, phone, email},
          jwtToken,
        };

        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(resp));
      })
      .catch((err) => console.log(err));
    return;
  }

  res.writeHead(400, {"Content-Type": "application/json"});
  res.end(
    JSON.stringify({
      status: "Bad request",
      message: "Choose registration driver/shipper",
    }),
  );
};

module.exports = registration;
