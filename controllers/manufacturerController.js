const Manufacturer = require("../models/manufacturer");
const Item = require("../models/item");
const async = require("async");
const { body, validationResult } = require("express-validator");

// Index route
exports.index = function (req, res) {
  res.send("Manufacturer index: Not implemented");
};

// Manufacturers list
exports.manufacturers = function (req, res, next) {
  Manufacturer.find({})
    .sort({ name: 1 })
    .exec(function (err, manufacturers) {
      if (err) return next(err);
      res.render("manufacturers", {
        title: "Manufacturers",
        manufacturers: manufacturers,
      });
    });
};

// Single manufacturer
exports.manufacturer_detail = function (req, res, next) {
  async.parallel(
    {
      manufacturer: function (callback) {
        Manufacturer.findById(req.params.id).exec(callback);
      },
      items: function (callback) {
        Item.find({ manufacturer: req.params.id })
          .populate(["manufacturer", "category"])
          .sort({ category: 1 })
          .exec(callback);
      },
    },
    function (err, results) {
      res.render("manufacturer_detail", {
        title: "Manufacturer Details",
        error: err,
        manufacturer: results.manufacturer,
        items: results.items,
      });
    }
  );
};

// Manufacturer create form on GET
exports.manufacturer_create_get = function (req, res, next) {
  res.render("manufacturer_form", { title: "Create Manufacturer" });
};

// Manufacturer create form POST
exports.manufacturer_create_post = [
  // Validate
  body("name", "Name cannot be empty").trim().isLength({ min: 1 }).escape(),

  // Handle request
  function (req, res, next) {
    const errors = validationResult(req);
    const manufacturer = new Manufacturer({ name: req.body.name });

    if (!errors.isEmpty()) {
      // Render again with error message
      res.render("manufacturer_form", {
        title: "Create Manufacturer",
        errors: errors.array(),
        manufacturer: manufacturer,
      });
      return;
    } else {
      // No errors, save document and redirect
      manufacturer.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect(manufacturer.url);
      });
    }
  },
];

// Manufacturer update form on GET
exports.manufacturer_update_get = function (req, res, next) {
  Manufacturer.findById(req.params.id).exec(function (error, result) {
    if (error) return next(error);
    res.render("manufacturer_update", {
      title: "Update manufacturer",
      manufacturer: result,
    });
  });
};

// Manufacturer update form POST
exports.manufacturer_update_post = [
  // Validate
  body("name", "Name cannot be empty").trim().isLength({ min: 1 }).escape(),
  function (req, res, next) {
    const errors = validationResult(req);
    const manufacturer = new Manufacturer({
      name: req.body.name,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      res.render("manufacturer_update", {
        title: "Update manufacturer",
        // TODO: Fix manufacturer on empty string submission
        manufacturer: manufacturer,
        errors: errors.array(),
      });
    } else {
      Manufacturer.findByIdAndUpdate(
        req.params.id,
        manufacturer,
        {},
        function (err, manufacturer) {
          if (err) return next(err);
          res.redirect(manufacturer.url);
        }
      );
    }
  },
];

// Manufacturer delete form on GET
exports.manufacturer_delete_get = function (req, res, next) {
  res.send("GET Delete manufacturer: Not implemented.");
};

// Manufacturer delete form POST
exports.manufacturer_delete_post = function (req, res, next) {
  res.send("POST Delete manufacturer: Not implemented.");
};
