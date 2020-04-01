const express = require("express");
const apiRoutes = new express.Router();
const auth = require("./middlewares/auth");

const registartion = require("./registartion");
const login = require("./login");

apiRoutes.post("/auth", registartion);
apiRoutes.post("/login", login);

apiRoutes.use(auth);
apiRoutes.get("/me", (req, res) => {
  res.writeHead(200, {"Content-Type": "application/json"});
  res.end(JSON.stringify(req.user));
});

module.exports = apiRoutes;
