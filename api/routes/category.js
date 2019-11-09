const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/category");

// Handle incoming GET requests to /orders
router.get("/", CategoryController.listCategory);

router.post("/", CategoryController.addCategory);

router.get("/:categoryId", CategoryController.getCategory);

router.delete("/:categoryId", CategoryController.deleteCategory);

module.exports = router;
