const express = require("express");
const apiRoutes = new express.Router();
const auth = require("./middlewares/auth");

const registartion = require("./registartion");
const login = require("./login");
const user = require("./user");
const resetPassword = require("./resetPassword");
const changePassword = require("./changePassword");
const addTruck = require("./addTruck");
const getTrucks = require("./getTrucks");
const editTruck = require("./editTruck");
const deleteTruck = require("./deleteTruck");

const addLoad = require("./addLoad");
const getLoads = require("./getLoads");

apiRoutes.post("/auth", registartion);
apiRoutes.post("/login", login);

apiRoutes.use(auth);
apiRoutes.get("/user", user);
apiRoutes.get("/user/reset-password", resetPassword);
apiRoutes.post("/user/reset-password/code", changePassword);
apiRoutes.post("/create-truck", addTruck);
apiRoutes.get("/trucks", getTrucks);
apiRoutes.put("/truck/:id", editTruck);
apiRoutes.delete("/truck/:id", deleteTruck);

apiRoutes.post("/create-load", addLoad);
apiRoutes.get("/loads", getLoads);

module.exports = apiRoutes;
