const express = require("express");
const apiRoutes = new express.Router();
const auth = require("./middlewares/auth");

const registartion = require("./registartion");
const login = require("./login");
const user = require("./user");
const resetPassword = require("./resetPassword");
const changePassword = require("./changePassword");

apiRoutes.post("/auth", registartion);
apiRoutes.post("/login", login);

apiRoutes.use(auth);
apiRoutes.get("/user", user);
apiRoutes.get("/user/reset-password", resetPassword);
apiRoutes.post("/user/reset-password/code", changePassword);

module.exports = apiRoutes;
