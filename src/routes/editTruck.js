const path = require("path");
const editTruckValidator = require(path.resolve(
  __dirname,
  "..",
  "db",
  "schemas",
  "requestsBodyValidators",
  "editTruck",
));
const assignTruck = require("../helpers/assignTruck");
const updateTruck = require("../helpers/updateTruck");
const Truck = require("../db/schemas/truck");

const OPERATION = {
  ASSIGN: "assign",
  UPDATE: "update",
  REMOVE: "remove",
};

const editTruck = async (req, res) => {
  const {id} = req.params;
  const {operation} = req.body;
  const {_id} = req.user;

  const validation = editTruckValidator.validate(req.body);

  if (validation.error) {
    const response = {
      status: "Bad request",
      message: validation.error,
    };

    res.writeHead(400, {"Content-Type": "application/json"});
    res.end(JSON.stringify(response));
    return;
  }

  if (operation === OPERATION.ASSIGN) {
    const assignedTruck = await assignTruck(id, _id);

    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(assignedTruck));
    return;
  }

  if (operation === OPERATION.UPDATE) {
    const {data} = req.body;
    const updatedTruck = await updateTruck(id, data, _id);

    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(updatedTruck));
    return;
  }

  if (operation === OPERATION.REMOVE) {
    const truck = await Truck.findById(id);

    if (truck.assigned_to === _id) {
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify({status: "Truck is assigned to driver"}));
      return;
    }

    await Truck.findByIdAndRemove(id, (err) => {
      if (err) {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify(err));
        return;
      }

      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify({status: "Truck have been removed"}));
      return;
    });
  }
};

module.exports = editTruck;
