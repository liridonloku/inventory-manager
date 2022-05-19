const Item = require("../models/item");
const Manufacturer = require("../models/manufacturer");
const Category = require("../models/category");
const async = require("async");
const { body, validationResult } = require("express-validator");

// Index route
exports.index = function (req, res) {
  async.parallel(
    {
      item_count: function (callback) {
        Item.countDocuments({}, callback);
      },
      item_in_stock_count: function (callback) {
        Item.countDocuments({ number_in_stock: { $gt: 0 } }, callback);
      },
      manufacturer_count: function (callback) {
        Manufacturer.countDocuments({}, callback);
      },
      category_count: function (callback) {
        Category.countDocuments({}, callback);
      },
    },
    function (err, results) {
      res.render("inventory", {
        title: "Inventory overview",
        error: err,
        data: results,
      });
    }
  );
};

// Items list
exports.items = function (req, res, next) {
  Item.find({})
    .sort({ name: 1 })
    .populate("manufacturer")
    .exec(function (err, items) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("items", { title: "All items", items: items });
    });
};

// Single item
exports.item_detail = function (req, res, next) {
  Item.findById(req.params.id)
    .populate(["manufacturer", "category"])
    .exec(function (err, item) {
      if (err) {
        return next(err);
      }
      res.render("item_detail", { title: "Item details", item: item });
    });
};

// Item create form on GET
exports.item_create_get = function (req, res, next) {
  // Get manufacturers for the form
  // Get categories for the form
  async.parallel(
    {
      manufacturers: function (callback) {
        Manufacturer.find({}).sort({ name: 1 }).exec(callback);
      },
      categories: function (callback) {
        Category.find({}).sort({ name: 1 }).exec(callback);
      },
    },
    function (error, results) {
      if (error) return next(error);

      // Render form
      res.render("item_form", {
        title: "New item",
        type: "Create",
        categories: results.categories,
        manufacturers: results.manufacturers,
      });
    }
  );
};

// Item create form POST
exports.item_create_post = [
  // Validate and sanitize
  body("name", "Name cannot be empty").trim().isLength({ min: 1 }).escape(),
  body("manufacturer", "Manufacturer cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "Category cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Description cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price cannot be empty").trim().isLength({ min: 1 }).escape(),
  body("number_in_stock", "Number in stock cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Handle request
  function (req, res, next) {
    const errors = validationResult(req);
    const item = new Item({
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
    });

    // Error
    if (!errors.isEmpty()) {
      // Re-render form
      async.parallel(
        {
          manufacturers: function (callback) {
            Manufacturer.find({}).sort({ name: 1 }).exec(callback);
          },
          categories: function (callback) {
            Category.find({}).sort({ name: 1 }).exec(callback);
          },
        },
        function (error, results) {
          if (error) return next(error);

          // Render form
          res.render("item_form", {
            title: "New item",
            item: item,
            type: "Create",
            categories: results.categories,
            manufacturers: results.manufacturers,
            errors: errors.array(),
          });
        }
      );
    }
    // Success
    else {
      // Save document and redirect
      item.save(function (err) {
        if (err) return next(err);
        res.redirect(item.url);
      });
    }
  },
];

// Item update form on GET
exports.item_update_get = function (req, res, next) {
  async.parallel(
    {
      item: function (callback) {
        Item.findById(req.params.id).exec(callback);
      },
      manufacturers: function (callback) {
        Manufacturer.find({}).sort({ name: 1 }).exec(callback);
      },
      categories: function (callback) {
        Category.find({}).sort({ name: 1 }).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      res.render("item_form", {
        title: `Update Item: ${results.item.name}`,
        item: results.item,
        type: "Update",
        manufacturers: results.manufacturers,
        categories: results.categories,
      });
    }
  );
};

// Item update form POST
exports.item_update_post = [
  // Validate and sanitize
  body("name", "Name cannot be empty").trim().isLength({ min: 1 }).escape(),
  body("manufacturer", "Manufacturer cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "Category cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Description cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price cannot be empty").trim().isLength({ min: 1 }).escape(),
  body("number_in_stock", "Number in stock cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Handle request
  function (req, res, next) {
    const errors = validationResult(req);
    const item = new Item({
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
      _id: req.params.id,
    });

    // Error
    if (!errors.isEmpty()) {
      async.parallel(
        {
          oldItem: function (callback) {
            Item.findById(req.params.id).exec(callback);
          },
          manufacturers: function (callback) {
            Manufacturer.find({}).sort({ name: 1 }).exec(callback);
          },
          categories: function (callback) {
            Category.find({}).sort({ name: 1 }).exec(callback);
          },
        },
        function (error, results) {
          if (error) return next(error);

          res.render("item_form", {
            title: `Update item: ${results.oldItem.name}`,
            item: item,
            type: "Update",
            categories: results.categories,
            manufacturers: results.manufacturers,
            errors: errors.array(),
          });
        }
      );
    }
    // Success
    else {
      // Update item and redirect
      Item.findByIdAndUpdate(req.params.id, item, {}, function (err, item) {
        if (err) return next(err);
        res.redirect(item.url);
      });
    }
  },
];

// Item delete form on GET
exports.item_delete_get = function (req, res, next) {
  Item.findById(req.params.id).exec(function (err, result) {
    if (err) return next(err);

    res.render("item_delete", {
      title: "Delete item",
      item: result,
    });
  });
};

// Item delete form POST
exports.item_delete_post = function (req, res, next) {
  Item.findByIdAndRemove(req.body.itemid, function (err) {
    if (err) return next(err);

    res.redirect("/inventory/items");
  });
};
