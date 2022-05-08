const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  manufacturer: {
    type: Schema.Types.ObjectId,
    ref: "Manufacturer",
    required: true,
  },
  description: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true },
  number_in_stock: { type: Number, required: true },
});

// Virtual for item url
ItemSchema.virtual("url").get(function () {
  return "/inventory/items/" + this._id;
});

module.exports = mongoose.model("Item", ItemSchema);
