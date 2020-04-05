const Load = require("../db/schemas/load");

const getLoads = (req, res) => {
  const {_id} = req.user;
  Load.find({created_by: _id})
    .then((loads) => {
      if (loads.length === 0) {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify({status: "No loads", loads}));
        return;
      }
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify({status: "Loads in DB", loads}));
    })
    .catch((err) => {
      res.writeHead(500, {"Content-Type": "application/json"});
      res.end(JSON.stringify(err));
    });
};

module.exports = getLoads;
