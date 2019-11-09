const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//db
//connecting local mongodb database named mydb
var db = mongoose.connect("mongodb://127.0.0.1:27017/mydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//testing connectivity
mongoose.connection.once("connected", function() {
  console.log("Database connected successfully");
});
// log
app.use(morgan("dev"));
// bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const productsRoute = require("./api/routes/products");
const categoryRoute = require("./api/routes/category");

// routes
app.use("/products", productsRoute);
app.use("/category", categoryRoute);

// errors
app.use("/", (req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
// 500 errors

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});
module.exports = app;
