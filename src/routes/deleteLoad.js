const Load = require("../db/schemas/load");

const deleteLoad = async (req, res) => {
  const {id} = req.params;

  const load = await Load.findById(id, (err) => {
    if (err) {
      res.writeHead(404, {"Content-Type": "application/json"});
      res.end(JSON.stringify(err));
      return;
    }
  });

  if (load.status !== "new") {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(
      JSON.stringify({
        status: `Load has status ${load.status}. Load has not been deleted`,
      }),
    );
    return;
  }

  await Load.findByIdAndRemove(id, (err) => {
    if (err) {
      res.writeHead(404, {"Content-Type": "application/json"});
      res.end(JSON.stringify(err));
      return;
    }

    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({status: "Load has been removed"}));
    return;
  });
};

module.exports = deleteLoad;
