const { _product } = require("../models/ProductModel");
const { _inventory } = require("../models/InventoryModel");

module.exports = {
  //add product
  addProduct: async (product) => {
    return await _product.create(product);
  },
  // get products
  getProducts: async ({ page = 1, pagesize = 50 }) => {
    return await _product
      .find({})
      .skip((page - 1) * pagesize)
      .limit(pagesize);
  },
  // get product by id
  getProductById: async (id) => {
    return await _product
      .findOne({
        productId: id,
      })
      .populate("inStock", "quantity -_id");
  },
  // update product by id
  updateProductById: async (id, quantity, specs) => {
    _product.createIndexes({ "specs.k": 1, "specs.v": 1 }, (err, result) => {});
    await _inventory.findOneAndUpdate(
      { productId: id },
      {
        $inc: {
          quantity,
        },
      }
    );
    await _product.findOneAndUpdate(
      { productId: id },
      {
        $push: {
          specs,
        },
      }
    );
  },
  getBrandProducts: async (brand) => {
    // tinh tong inStock cua 1 brand

    // const listStock = await _inventory.aggregate([
    //   {
    //     $match: {
    //       brand,
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$productId",
    //       totalInStock: { $sum: "$quantity" },
    //     },
    //   },
    // ]);

    // const totalInStock = listStock.reduce(
    //   (acc, stock) => acc + stock.totalInStock,
    //   0
    // );

    return await _product
      .find({ brand })
      .populate("inStock", "quantity -_id")
      .select("name , image , -_id");
  },
};
