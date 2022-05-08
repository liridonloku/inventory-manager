const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ManufacturerSchema = new Schema({
  name: { type: String, required: true },
});

// Virtual for manufacturer url
ManufacturerSchema.virtual("url").get(function () {
  return "/inventory/manufacturers/" + this._id;
});

module.exports = mongoose.model("Manufacturer", ManufacturerSchema);
