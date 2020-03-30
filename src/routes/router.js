const express = require("express");
const apiRoutes = new express.Router();

const registartion = require("./registartion/registartion");

apiRoutes.post("/auth", registartion);

module.exports = apiRoutes;
