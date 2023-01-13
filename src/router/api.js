const Cart = require("../app/Models/CartModel");

const express = require("express");
const router = express.Router();

const apiController = require("../app/Controllers/ApiController");

router.post("/upload", apiController.upload);
router.delete("/cart/delete/:name", apiController.delete);
router.post(
  "/cart/add/:name",
  function (req, res, next) {
    Cart.findOne({ name: req.params.name }).then((item) => {
      if (item) {
        Cart.updateOne(
          { name: item.name },
          { amount: item.amount + parseInt(req.query.q) }
        ).then(() => res.redirect("back"));
      } else {
        next();
      }
    });
  },
  apiController.addItem
);
router.get("/cart/:name", apiController.cartFilter);
router.get("/cart", apiController.cart);
router.get("/find/:slug", apiController.filter);
router.get("/find", apiController.find);

module.exports = router;
