const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const routes = require("./controllers");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger("dev"));
app.use(routes);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
