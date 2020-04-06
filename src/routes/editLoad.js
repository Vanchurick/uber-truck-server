const path = require("path");
const editLoadValidator = require(path.resolve(
  __dirname,
  "..",
  "db",
  "schemas",
  "requestsBodyValidators",
  "editLoad",
));
const Load = require("../db/schemas/load");
const findTruck = require("../helpers/findTruck");

const OPERATION = {
  POST: "post",
  UPDATE: "update",
};

const editLoad = async (req, res) => {
  const validation = editLoadValidator.validate(req.body);

  if (validation.error) {
    const response = {
      status: "Bad request",
      message: validation.error,
    };

    res.writeHead(400, {"Content-Type": "application/json"});
    res.end(JSON.stringify(response));
    return;
  }

  const {operation} = req.body;
  const {id} = req.params;

  if (operation === OPERATION.POST) {
    const load = await Load.findById(id, (err, doc) => {
      if (err) {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify(err));
      }
    });

    const {logs} = load;

    logs.push({message: "Posted", time: Date.now()});

    const result = await findTruck(load);

    console.log(result);

    if (!result) {
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify({status: "No trucks", trucks: []}));
      return;
    }

    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({status: "Load has been posted", result}));
  }

  if (operation === OPERATION.UPDATE) {
    const {data} = req.body;

    const load = await Load.findById(id, (err, doc) => {
      if (err) {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify(err));
      }
    });

    if (load.status !== "new") {
      res.writeHead(404, {"Content-Type": "application/json"});
      res.end(
        JSON.stringify({status: "Load should be with status NEW for editing"}),
      );
      return;
    }

    const result = await Load.findByIdAndUpdate(id, data, (err, doc) => {
      if (err) {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify(err));
      }
    });

    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({status: "Load has been updated", load: result}));
  }
};

module.exports = editLoad;
