const express = require("express");
const router = express.Router();

const clothController = require("../app/Controllers/ClothController");

router.get("/upload", clothController.upload);
router.get("/:id/edit", clothController.edit);
router.delete("/:id/force", clothController.force);
router.get("/trash", clothController.trash);
router.post("/handle-form-actions", clothController.handleForm);
router.get("/", clothController.show);

module.exports = router;
