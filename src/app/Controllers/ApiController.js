const Cloth = require("../Models/ClothModel");
const Order = require("../Models/OrderModel");
const Cart = require("../Models/CartModel");

class ApiController {
  //[POST] /api/upload
  upload(req, res, next) {
    const payload = req.body;
    const cloth = new Cloth(payload);

    cloth.save();
    res.redirect("back");
  }

  //[GET] /api/find
  find(req, res, next) {
    Cloth.find({})
      .then((clothes) => res.send(clothes))
      .catch(next);
  }

  //[GET] /api/find/:slug
  filter(req, res, next) {
    Cloth.findOne({ name: req.params.slug })
      .then((cloth) => res.json(cloth))
      .catch(next);
  }

  //[GET] /api/cart
  cart(req, res, next) {
    Cart.find({})
      .then((items) => res.json(items))
      .catch(next);
  }
  //[GET] /api/cart/:name
  cartFilter(req, res, next) {
    Cart.findOne({ name: req.params.name }).then((item) => {
      if (item) {
        console.log(item.amount);
      } else {
        next();
      }
    });
  }

  //[POST] /api/cart/add/:name
  addItem(req, res, next) {
    Cloth.findOne({ name: req.params.name }).then((item) => {
      const cartItem = new Cart({
        name: item.name,
        image: item.image,
        size: item.size,
        description: item.description,
        price: item.price,
        amount: req.query.q,
      });
      cartItem
        .save()
        .then(() => res.redirect("back"))
        .catch(next);
    });
  }

  //[DELETE] /api/cart/delete/:name
  delete(req, res, next) {
    Cart.findOneAndRemove({ name: req.params.name })
      .then(() => res.redirect("back") )
      .catch(next);
  }

}

module.exports = new ApiController();
