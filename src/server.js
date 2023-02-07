const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv").config();
const db = require("./databases/mongodb");
const handlebars = require("express-handlebars");
const route = require("./router");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const secretKey = require("./helpers/generatekeysecret");

//set session
const oneDay = 1000 * 60 * 60 * 24;
const twoHours = 7200000;
app.use(
  sessions({
    secret: secretKey,
    saveUninitialized: true,
    resave: false,
  })
);

//db connection
mongoose.set("strictQuery", true);
db.connect();
mongoose.connection.on("disconnected", () => {
  console.log("db disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

app.use(express.static(path.join(__dirname, "src")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(cookieParser());

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: require("./helpers/handlebars"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

app.use("/", (req, res, next) => {
  res.cookie("userId", req.session.id);
  next();
});

route(app);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
