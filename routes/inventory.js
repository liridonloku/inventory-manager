const express = require("express");
const router = express.Router();

const item_controller = require("../controllers/itemController");
const manufacturer_controller = require("../controllers/manufacturerController");

// ITEM ROUTES //

// Get inventory home page
router.get("/", item_controller.index);

// GET request for creating an item
router.get("/items/create", item_controller.item_create_get);

// POST request for creating an item
router.post("/items/create", item_controller.item_create_post);

// GET request to delete item
router.get("/items/:id/delete", item_controller.item_delete_get);

// POST request to delete item
router.post("/items/:id/delete", item_controller.item_delete_post);

// GET request to update item
router.get("/items/:id/update", item_controller.item_update_get);

// POST request to update item
router.post("/items/:id/update", item_controller.item_update_post);

// GET request for one item
router.get("/items/:id", item_controller.item_detail);

// GET request for all items
router.get("/items", item_controller.items);

// MANUFACTURER ROUTES //

// GET request for creating a manufacturer
router.get(
  "/manufacturers/create",
  manufacturer_controller.manufacturer_create_get
);

// POST request for creating a manufacturer
router.post(
  "/manufacturers/create",
  manufacturer_controller.manufacturer_create_post
);

// GET request to delete manufacturer
router.get(
  "/manufacturers/:id/delete",
  manufacturer_controller.manufacturer_delete_get
);

// POST request to delete manufacturer
router.post(
  "/manufacturers/:id/delete",
  manufacturer_controller.manufacturer_delete_post
);

// GET request to update manufacturer
router.get(
  "/manufacturers/:id/update",
  manufacturer_controller.manufacturer_update_get
);

// POST request to update manufacturer
router.post(
  "/manufacturers/:id/update",
  manufacturer_controller.manufacturer_update_post
);

// GET request for one manufacturer
router.get("/manufacturers/:id", manufacturer_controller.manufacturer_detail);

// GET manufacturers list
router.get("/manufacturers", manufacturer_controller.manufacturers);

module.exports = router;
