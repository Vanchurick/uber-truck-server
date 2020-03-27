const startServer = require("./src/server");
const connectToDB = require("./src/db/connect-db");
const config = require("config");

const port = config.get("appConfig.port");

startServer(port);

const dbConfig = config.get("dbConfig");
connectToDB(dbConfig.name, dbConfig.password, dbConfig.dbName);
