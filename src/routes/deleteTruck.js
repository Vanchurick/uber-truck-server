const Truck = require("../db/schemas/truck");

const deleteTruck = async (req, res) => {
  const {id} = req.params;
  const {_id} = req.user;

  const truck = await Truck.findById(id, (err) => {
    if (err) {
      res.writeHead(404, {"Content-Type": "application/json"});
      res.end(JSON.stringify(err));
      return;
    }
  });

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
};

module.exports = deleteTruck;
