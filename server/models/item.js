const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema for item
const ItemSchema = new Schema({
  name: {
    type: String,
    required: [true, "The item is required"],
  },
  subItems: [this],
});

//create model for page
const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
