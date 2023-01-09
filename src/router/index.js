const apiRouter = require("./api");
const siteRouter = require("./site");
const clothRouter = require("./cloth");

function route(app) {
  app.use("/api", apiRouter);
  app.use("/clothes", clothRouter);
  app.use("/", siteRouter);
}

module.exports = route;
