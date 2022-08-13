require("dotenv").config();
// import
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var noteRoute = require("./route/noteRoute");
var userRoute = require("./route/userRoute");
// Create app and porst
var app = express();
var port = process.env.PORT;
// app use :
app.use(cors());
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("<h1>hello world</h1>");
});
app.use("/api", noteRoute);
app.use("/api", userRoute);

app.listen(port, "localhost", () => {
  console.log("work ...");
});
