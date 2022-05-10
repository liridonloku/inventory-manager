const Category = require("../models/category");

// Index route
exports.index = function (req, res) {
  res.send("Category index: Not implemented");
};

// Category list
exports.categories = function (req, res) {
  res.send("Categories list: Not implemented");
};

// Single category
exports.category_detail = function (req, res) {
  res.send("Category detail: Not implemented");
};

// Category create form on GET
exports.category_create_get = function (req, res, next) {
  res.send("GET Create category: Not implemented.");
};

// Category create form POST
exports.category_create_post = function (req, res, next) {
  res.send("POST Create category: Not implemented.");
};

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
