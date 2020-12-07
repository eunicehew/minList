const mongoose = require("mongoose");
// const { schema } = require("./user");
const Schema = mongoose.Schema;
// mongoose.set("debug", true);

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

// schema.pre("findOneAndDelete", async function () {
//   //while there are sheets, delete
//   //if there are items, delete

//   book.model('User').update(
//     { books: book._id },
//     { $pull: { books: book._id } },
//     { multi: true },
//     next);

//   const page = this;
//     page.model("Page")

//   const sheets = await Page.findOne({ _id: pageId }).populate("sheets");
//   sheets.forEach((sheet) => {});
//   Page.update({ _id: 1 }, { $pullAll: { scores: [0, 5] } });

//   const lists = await Page.findOne({ _id: pageId }).populate("sheets");
// });
