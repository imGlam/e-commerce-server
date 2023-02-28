const {
  addProduct,
  getProducts,
  getProductById,
  updateProductById,
  getBrandProducts,
} = require("../services/ProductService");
module.exports = {
  addProduct: async (req, res, next) => {
    try {
      const { product } = req.body;
      return res.json(await addProduct(product));
    } catch (err) {
      next(err);
    }
  },
  getProducts: async (req, res, next) => {
    try {
      const { page, pagesize } = req.query;
      return res.json(await getProducts({ page, pagesize }));
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
  updateProductById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { quantity, specs } = req.body;
      await updateProductById(id, quantity, specs);
      return res.send("updated successfully");
    } catch (err) {
      next(err);
    }
  },
  getBrandProducts: async (req, res, next) => {
    try {
      const  brand  = req.query.q;
      return res.json(await getBrandProducts(brand));
    } catch (error) {}
  },
};
