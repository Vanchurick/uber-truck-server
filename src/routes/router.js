const express = require("express");
const apiRoutes = new express.Router();

const registartion = require("./registartion/registartion");

apiRoutes.get("/login", registartion);

module.exports = apiRoutes;
