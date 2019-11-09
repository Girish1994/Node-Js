const mongoose = require("mongoose");

const Category = require("../models/category");
const Product = require("../models/product");

exports.listCategory = (req, res, next) => {
  Category.find()
    .select("product quantity _id")
    .populate("product", "name")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        category: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.addCategory = (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }
      const category = new Category({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      });
      return category.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "category stored",
        createdCategory: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.getCategory = (req, res, next) => {
  Category.findById(req.params.categoryId)
    .populate("product")
    .exec()
    .then(category => {
      if (!category) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.status(200).json({
        category: category
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.deleteCategory = (req, res, next) => {
  Category.remove({ _id: req.params.categoryId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Category deleted"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
