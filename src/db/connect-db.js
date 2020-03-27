const mongoose = require("mongoose");

const connectToDB = (name, password, dbName) => {
  const dbUrl = `mongodb+srv://${name}:${password}@uber-truck-fhdkm.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  mongoose
    .connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((resp) => {
      console.log("Database connection successful");
    })
    .catch((err) => {
      console.error("Database connection error");
    });
};

module.exports = connectToDB;
