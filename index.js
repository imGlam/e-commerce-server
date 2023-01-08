const express = require("express");
const app = express();
const port = 4000;
const dotenv = require("dotenv").config();
const db = require("./src/config/mongodb");

//db connection
db.connect();

const products = require("./src/data/products");

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((product) => (product.id = req.params.id));
  res.json(product);
});

app.get("/", (req, res) => {
  res.send("Api running ..." + PORT);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
