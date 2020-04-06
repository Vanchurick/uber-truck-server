const Load = require("../db/schemas/load");

const getDriverLoads = async (req, res) => {
  const {_id} = req.user;
  const loads = await Load.find({assigned_to: _id});

  if (loads.length === 0) {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({status: "No loads", loads}));
  }

  res.writeHead(200, {"Content-Type": "application/json"});
  res.end(JSON.stringify({loads}));
};

module.exports = getDriverLoads;
