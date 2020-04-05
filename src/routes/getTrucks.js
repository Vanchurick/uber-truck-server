const Truck = require("../db/schemas/truck");

const getTrucks = (req, res) => {
  const {_id} = req.user;
  Truck.find({created_by: _id})
    .then((trucks) => {
      if (trucks.length === 0) {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify({status: "No trucks", trucks}));
        return;
      }
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify({status: "Trucks in DB", trucks}));
    })
    .catch((err) => {
      res.writeHead(500, {"Content-Type": "application/json"});
      res.end(JSON.stringify(err));
    });
};

module.exports = getTrucks;
