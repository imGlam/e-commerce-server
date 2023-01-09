const express = require("express");
const router = express.Router();

const clothController = require("../app/Controllers/ClothController");

router.get("/upload", clothController.upload);
router.get("/:id/edit", clothController.edit);
router.put("/:id", clothController.update);
router.delete("/:id/force", clothController.force);
router.delete("/:id", clothController.delete);
router.patch("/:id/restore", clothController.restore);
router.get("/trash", clothController.trash);
router.post("/handle-form-actions", clothController.handleForm);
router.get("/", clothController.show);

module.exports = router;
