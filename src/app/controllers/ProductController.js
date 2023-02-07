const {
  addProduct,
  getProducts,
  getProductById,
} = require("../services/ProductService");
module.exports = {
  addProduct: async (req, res, next) => {
    try {
      const { product } = req.body;
      return res.json(addProduct(product));
    } catch (err) {
      next(err);
    }
  },
  getProducts: async (req, res, next) => {
    try {
      return res.json(await getProducts());
    } catch (err) {
      next(err);
    }
  },
  getProductById: async (req, res, next) => {
    try {
      return res.json(await getProductById(req.params.id));
    } catch (err) {
      next(err);
    }
  },
};
