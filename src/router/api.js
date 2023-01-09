const express = require("express");
const router = express.Router();

const apiController = require("../app/Controllers/ApiController");

router.post("/upload", apiController.upload);
router.get("/find", apiController.find);

module.exports = router;
