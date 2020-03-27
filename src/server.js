const express = require("express");
const app = express();

const router = require("./routes/router");

const startServer = (port) => {
  app.use(express.json());
  app.use("/", router);

  app.listen(port);

  console.log("Server was started at http://localhost:" + port);
};

module.exports = startServer;
