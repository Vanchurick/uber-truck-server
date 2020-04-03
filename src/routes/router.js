const express = require("express");
const apiRoutes = new express.Router();
const auth = require("./middlewares/auth");

const registartion = require("./registartion");
const login = require("./login");
const user = require("./user");
const resetPassword = require("./resetPassword");

apiRoutes.post("/auth", registartion);
apiRoutes.post("/login", login);

apiRoutes.use(auth);
apiRoutes.get("/user", user);
apiRoutes.get("/reset-password", resetPassword);

module.exports = apiRoutes;
