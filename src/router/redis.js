const express = require("express");
const router = express.Router();
const client = require("../databases/redis");

const {
  setPromise,
  getPromise,
} = require("../app/controllers/RedisController");

router.post("/user", setPromise);
router.get("/user/:userId", getPromise);

module.exports = router;
