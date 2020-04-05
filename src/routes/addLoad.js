const path = require("path");
const creareTruckValidator = require(path.resolve(
  __dirname,
  "..",
  "db",
  "schemas",
  "requestsBodyValidators",
  "loadCreation",
));

const createLoad = require("../helpers/createLoad");
const Load = require("../db/schemas/load");

const addLoad = async (req, res) => {
  const validation = creareTruckValidator.validate(req.body);

  if (validation.error) {
    const response = {
      status: "Bad request",
      message: validation.error,
    };

    res.writeHead(400, {"Content-Type": "application/json"});
    res.end(JSON.stringify(response));
    return;
  }

  const {_id} = req.user;
  const load = createLoad(_id, req.body);

  await Load.create(load)
    .then((result) => {
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify({status: "Truck have been created", result}));
    })
    .catch((err) => {
      res.writeHead(500, {"Content-Type": "application/json"});
      res.end(JSON.stringify(err));
    });
};

module.exports = addLoad;
