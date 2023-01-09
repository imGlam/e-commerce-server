const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv").config();
const db = require("./config/mongodb");
const handlebars = require("express-handlebars");
const route = require("./router");
const methodOverride = require("method-override");

// const route = require("./route");

//db connection
mongoose.set("strictQuery", true);
db.connect();

app.use(express.static(path.join(__dirname, "src")));
app.use(express.urlencoded());
app.use(express.json());
app.use(methodOverride("_method"));

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: require("./helpers/handlebars"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

route(app);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
