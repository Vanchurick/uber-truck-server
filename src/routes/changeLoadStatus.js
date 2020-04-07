const Load = require("../db/schemas/load");
const Truck = require("../db/schemas/truck");
const path = require("path");
const changeLoadStatusValidator = require(path.resolve(
  __dirname,
  "..",
  "db",
  "schemas",
  "requestsBodyValidators",
  "loadStateChange",
));

const LOAD_STATES = {
  atpu: "Arrived to Pick Up",
  ertd: "En route to delivery",
  atd: "Arrived to delivery",
};

const changeLoadStatus = async (req, res) => {
  const validation = changeLoadStatusValidator.validate(req.body);

  if (validation.error) {
    const response = {
      status: "Bad request",
      message: validation.error,
    };

    res.writeHead(400, {"Content-Type": "application/json"});
    res.end(JSON.stringify(response));
    return;
  }

  const {id} = req.params;
  const {state} = req.body;

  if (state === "atd") {
    const load = await Load.findByIdAndUpdate(
      id,
      {
        state: LOAD_STATES[state],
        status: "shipped",
      },
      (err, doc) => {
        if (err) {
          res.writeHead(404, {"Content-Type": "application/json"});
          res.end(JSON.stringify(err));
        }
      },
    );

    await Truck.findByIdAndUpdate(
      load.truck,
      {status: "is", load: ""},
      (err, doc) => {
        if (err) {
          res.writeHead(404, {"Content-Type": "application/json"});
          res.end(JSON.stringify(err));
        }
      },
    );

    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(load));

    return;
  }

  const load = await Load.findByIdAndUpdate(
    id,
    {state: LOAD_STATES[state]},
    (err, doc) => {
      if (err) {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify(err));
      }
    },
  );

  res.writeHead(200, {"Content-Type": "application/json"});
  res.end(JSON.stringify(load));
};

module.exports = changeLoadStatus;
