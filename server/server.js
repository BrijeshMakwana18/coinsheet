//Imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routesV1 = require("./routes");
const cors = require("cors");

const app = express();

dotenv.config();

//MongoDB Connect
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log("Connected to DB");
});
const db = mongoose.connection;

//Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/v1", routesV1);

app.listen(process.env.PORT || 8080, () => {
  console.log("Server is running");
});

module.exports = db;
