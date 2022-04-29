const express = require("express");
const albumController = require("../controllers/album");

const router = express.Router();

router.get("/", albumController.read);
router.get("/:albumId", albumController.readById);

module.exports = router;
