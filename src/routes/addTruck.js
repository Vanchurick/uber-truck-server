const path = require("path");
const truckValidator = require(path.resolve(
  __dirname,
  "..",
  "db",
  "schemas",
  "requestsBodyValidators",
  "truckCreation",
));
const createTruck = require("../helpers/createTruck");
const Truck = require("../db/schemas/truck");

const addTruck = async (req, res) => {
  const validation = truckValidator.validate(req.body);

  if (validation.error) {
    const response = {
      status: "Bad request",
      message: validation.error,
    };

    res.writeHead(400, {"Content-Type": "application/json"});
    res.end(JSON.stringify(response));
    return;
  }

  const {type} = req.body;
  const {_id} = req.user;

  const truck = createTruck(_id, type);

  await Truck.create(truck)
    .then((result) => {
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify({status: "Truck have been created", result}));
    })
    .catch((err) => {
      res.writeHead(500, {"Content-Type": "application/json"});
      res.end(JSON.stringify(err));
    });
};

module.exports = addTruck;
