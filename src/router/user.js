const express = require("express");
const router = express.Router();

const { paginate } = require("../app/controllers/UserController");

router.get("/get", paginate);

module.exports = router;
