const { _inventory } = require("../models/InventoryModel");
const { _cart } = require("../models/CartModel");
const { _product } = require("../models/ProductModel");

module.exports = {
  //add to cart
  addToCart: async (productId, quantity, userId, price) => {
    var productIdList;
    const stock = await _inventory.updateOne(
      {
        productId: productId,
        quantity: { $gt: quantity },
      },
      {
        $inc: {
          quantity: -quantity,
        },
        $push: {
          reservation: {
            userId,
            productId,
            quantity,
          },
        },
      }
    );
    const isAlreadyInCartCheck = await _cart
      .findOne({ userId })
      .select({ products: 1 });

    if (isAlreadyInCartCheck) {
      const { products } = isAlreadyInCartCheck;
      productIdList = products.map((product) => product.productId);
    }

    const isAlreadyInCart = productIdList
      ? productIdList.includes(productId)
      : 0;

    if (stock.modifiedCount) {
      if (isAlreadyInCart) {
        const addToCart = await _cart.updateOne(
          {
            userId,
          },
          {
            $inc: {
              "products.$[elem].quantity": quantity,
            },
          },
          {
            arrayFilters: [{ "elem.productId": productId }],
          }
        );
      } else {
        const addToCart = await _cart.findOneAndUpdate(
          {
            userId,
          },
          {
            $push: {
              products: {
                productId,
                quantity,
                price,
              },
            },
          },
          {
            new: true,
            upsert: true,
          }
        );
      }
    }
  },
  // remove from cart
  removeFromCart: async (userId, productId, quantity) => {
    const removeItems = await _cart.updateOne(
      {
        userId,
      },
      {
        status: "inactive",
        $pull: {
          products: {
            productId,
            quantity,
          },
        },
      }
    );
    if (removeItems.modifiedCount) {
      await _inventory.updateOne(
        {
          productId,
        },
        {
          $inc: {
            quantity: quantity,
          },
          $pull: {
            reservation: {
              userId,
              productId,
              quantity,
            },
          },
        }
      );
    }
  },

  //get cart items by userId
  getCartItems: async (userId) => {
    const { products } = await _cart
      .findOne({ userId })
      .select({ products: 1 });
    const productIdList = products.map((product) => Number(product.productId));
    const cartItems = await _product.find({
      productId: { $in: productIdList },
    });

    return [products, cartItems];
  },
};
