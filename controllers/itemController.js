const Item = require("../models/item");
const Manufacturer = require("../models/manufacturer");
const Category = require("../models/category");

// Index route
exports.index = function (req, res) {
  res.send("Items index: Not implemented.");
};

// Items list
exports.items = function (req, res, next) {
  res.send("Items list: Not implemented.");
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
