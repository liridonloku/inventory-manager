const express = require("express");
const router = express.Router();

const item_controller = require("../controllers/itemController");

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

module.exports = router;
