const express = require("express");
const app = express();

const router = require("./routes/router");
const log = require("./routes/middlewares/log");

const startServer = (port) => {
  app.use(express.json());
  app.use(log);

  app.use("/api", router);

  app.listen(port);

  console.log("Server was started at http://localhost:" + port);
};

module.exports = startServer;
