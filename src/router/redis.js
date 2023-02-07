const express = require("express");
const router = express.Router();

const {
  setPromise,
  getPromise,
} = require("../app/controllers/RedisController");

router.post("/user", setPromise);
router.get("/user", getPromise);

module.exports = router;
