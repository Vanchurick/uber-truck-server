const path = require("path");
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

const registration = async (req, res) => {
  const {driver, shipper} = req.body;

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

    await Driver.create(req.body)
      .then((result) => {
        const resp = {
          status: "Driver have been created",
          user: result,
        };

        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(resp));
      })
      .catch((err) => console.log(err));
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
    await Shipper.create(req.body)
      .then((result) => {
        const resp = {
          status: "Shipper have been created",
          user: result,
        };

        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(resp));
      })
      .catch((err) => console.log(err));
  }
};

module.exports = registration;
