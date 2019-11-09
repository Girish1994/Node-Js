const express = require("express");
const router = express.Router();
const ProductsController = require("../controllers/products");

router.get("/", ProductsController.listProduct);

router.post("/", ProductsController.addProduct);

router.get("/:productId", ProductsController.getProduct);

router.patch("/:productId", ProductsController.updateProduct);

router.delete("/:productId", ProductsController.deleteProduct);

module.exports = router;
