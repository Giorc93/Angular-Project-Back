"use strict";

var mongoose = require("mongoose");
var app = require("./app");
var port = 3700;

mongoose
  .connect("mongodb://localhost:27017/portfolio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected...");

    //Create Server
    app.listen(port, () => {
      console.log("Server created, listening on localhost:3700...");
    });
  })
  .catch((err) => console.log("Connection failed..."));
