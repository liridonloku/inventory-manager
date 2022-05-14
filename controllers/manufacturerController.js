const Manufacturer = require("../models/manufacturer");

// Index route
exports.index = function (req, res) {
  res.send("Manufacturer index: Not implemented");
};

// Manufacturers list
exports.manufacturers = function (req, res, next) {
  Manufacturer.find({}).exec(function (err, manufacturers) {
    if (err) return next(err);
    res.render("manufacturers", {
      title: "Manufacturers",
      manufacturers: manufacturers,
    });
  });
};

// Single manufacturer
exports.manufacturer_detail = function (req, res, next) {
  res.send("Manufacturer details: Not implemented");
};

// Manufacturer create form on GET
exports.manufacturer_create_get = function (req, res, next) {
  res.send("GET Create manufacturer: Not implemented.");
};

// Manufacturer create form POST
exports.manufacturer_create_post = function (req, res, next) {
  res.send("POST Create manufacturer: Not implemented.");
};

// Manufacturer update form on GET
exports.manufacturer_update_get = function (req, res, next) {
  res.send("GET Update manufacturer: Not implemented.");
};

// Manufacturer update form POST
exports.manufacturer_update_post = function (req, res, next) {
  res.send("POST Update manufacturer: Not implemented.");
};

// Manufacturer delete form on GET
exports.manufacturer_delete_get = function (req, res, next) {
  res.send("GET Delete manufacturer: Not implemented.");
};

// Manufacturer delete form POST
exports.manufacturer_delete_post = function (req, res, next) {
  res.send("POST Delete manufacturer: Not implemented.");
};
