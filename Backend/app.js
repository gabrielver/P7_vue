const express = require("express");
const { check, validationResult } = require("express-validator");
const bodyParser = require("body-parser");
var validator = require("validator");
require("dotenv").config({ path: "./.env" });
//datbase connection
require("./mysql");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const path = require("path");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/post", commentRoutes);

module.exports = app;
