const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema for todo
const TodoSchema = new Schema({
  text: {
    type: String,
    required: [true, "The todo text field is required"],
  },
  category: {
    type: String,
    default: "Pending",
    required: [true, "The todo progress is required"],
  },
});

//create model for todo
const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
