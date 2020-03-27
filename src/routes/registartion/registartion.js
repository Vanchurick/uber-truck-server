const Driver = require("../../db/schemas/driver.js");

const registration = async (req, res) => {
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
};

module.exports = registration;
