const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema for page
const PageSchema = new Schema({
  name: {
    type: String,
    required: [true, "The page name is required"],
  },
  sheets: [this],
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  // itemActions: [{ type: String }],
});

module.exports = mongoose.model("Page", PageSchema);

