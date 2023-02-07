const { _product } = require("../models/ProductModel");

module.exports = {
  //add product
  addProduct: async (product) => {
    return await _product.create(product);
  },
  // get products
  getProducts: async () => {
    return await _product.find({});
  },
  // get product by id
  getProductById: async (id) => {
    return await _product.findOne({
      productId: id,
    });
  },
};
