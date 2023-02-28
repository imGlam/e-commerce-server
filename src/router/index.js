const productRouter = require("./product");
const inventoryRouter = require("./inventory");
const cartRouter = require("./cart");
const orderRouter = require("./order");
const redisRouter = require("./redis");
const userRouter = require("./user");
const httpErrors = require("http-errors");

function route(app) {
  app.use("/products", productRouter);
  app.use("/inventories", inventoryRouter);
  app.use("/carts", cartRouter);
  app.use("/orders", orderRouter);
  app.use("/redis", redisRouter);
  app.use("/users", userRouter);
  app.use("/", async (req, res, next) => {
    res.render("home");
  });
  //error 404 catch
  app.use((req, res, next) => {
    next(httpErrors(404, "Page not found !"));
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      status: err.status || 500,
      message: err.message,
    });
  });
}

module.exports = route;
