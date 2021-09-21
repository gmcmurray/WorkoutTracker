const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require('body-parser'); 
const routes = require("./controllers");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger("dev"));
app.use(routes);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.get("/trial",(req,res) => {
res.send(console.log(req))
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
