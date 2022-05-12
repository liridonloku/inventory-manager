const Item = require("../models/item");
const Manufacturer = require("../models/manufacturer");
const Category = require("../models/category");
const async = require("async");

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
  Item.find({}, "name manufacturer")
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
  res.send("Item details: Not implemented.");
};

// Item create form on GET
exports.item_create_get = function (req, res, next) {
  res.send("GET Create item: Not implemented.");
};

// Item create form POST
exports.item_create_post = function (req, res, next) {
  res.send("POST Create item: Not implemented.");
};

// Item update form on GET
exports.item_update_get = function (req, res, next) {
  res.send("GET Update item: Not implemented.");
};

// Item update form POST
exports.item_update_post = function (req, res, next) {
  res.send("POST Update item: Not implemented.");
};

// Item delete form on GET
exports.item_delete_get = function (req, res, next) {
  res.send("GET Delete item: Not implemented.");
};

// Item delete form POST
exports.item_delete_post = function (req, res, next) {
  res.send("POST Delete item: Not implemented.");
};
