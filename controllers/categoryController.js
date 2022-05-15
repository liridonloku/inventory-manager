const Category = require("../models/category");
const Item = require("../models/item");
const async = require("async");
const { body, validationResult } = require("express-validator");

// Index route
exports.index = function (req, res) {
  res.send("Category index: Not implemented");
};

// Category list
exports.categories = function (req, res) {
  Category.find({}).exec(function (err, results) {
    res.render("categories", {
      title: "Categories",
      categories: results,
    });
  });
};

// Single category
exports.category_detail = function (req, res, next) {
  async.parallel(
    {
      category: function (callback) {
        Category.findById(req.params.id).exec(callback);
      },
      items: function (callback) {
        Item.find({ category: req.params.id })
          .populate("manufacturer")
          .exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      res.render("category_detail", {
        title: "Category details",
        category: results.category,
        items: results.items,
      });
    }
  );
};

// Category create form on GET
exports.category_create_get = function (req, res, next) {
  res.render("category_form", {
    title: "Create new category",
  });
};

// Category create form POST
exports.category_create_post = [
  // Validate and sanitize input
  body("name", "Name cannot be empty").trim().isLength({ min: 1 }).escape(),

  // Handle request
  function (req, res, next) {
    const errors = validationResult(req);
    const category = new Category({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create new category",
        errors: errors.array(),
        category: category,
      });
    } else {
      // No errors, save document
      category.save(function (err) {
        if (err) return next(err);
        res.redirect(category.url);
      });
    }
  },
];

// Category update form on GET
exports.category_update_get = function (req, res, next) {
  res.send("GET Update category: Not implemented.");
};

// Category update form POST
exports.category_update_post = function (req, res, next) {
  res.send("POST Update category: Not implemented.");
};

// Category delete form on GET
exports.category_delete_get = function (req, res, next) {
  res.send("GET Delete category: Not implemented.");
};

// Category delete form POST
exports.category_delete_post = function (req, res, next) {
  res.send("POST Delete category: Not implemented.");
};
