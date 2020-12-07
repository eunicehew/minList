const Item = require("../models/item");
const Page = require("../models/page");
const mongoose = require("mongoose");
require("dotenv").config();

module.exports = {
  getItems,
  getParentList,
  create,
  getById,
  update,
  deleteItem,
  moveItem,
};

async function getItems(listId) {
  return await Page.findOne({ _id: listId }).populate("items");
}

async function getParentList(itemId) {
  return await Page.findOne({ items: itemId });
}

async function create(body) {
  const item = new Item({ name: body.name });
  await item.save();
  return Page.findOneAndUpdate(
    { _id: body.listId },
    { $push: { items: item._id } },
    { new: true }
  );
}

async function getById(id) {
  return await Item.findById(id);
}

async function update(id, name) {
  return await Item.findByIdAndUpdate(id, { name: name });
}

async function deleteItem(listId, _id) {
  await Item.findOneAndDelete({ _id }).then((item) => {
    return Page.findByIdAndUpdate(listId, {
      $pull: { items: { _id: item._id } },
    });
  });
}

async function moveItem(body) {
  await Page.findByIdAndUpdate(body.parentListId, {
    $pull: { items: { $in: mongoose.mongo.ObjectID(body.itemId) } },
  });
  await Page.findByIdAndUpdate(body.listId, {
    $push: {
      items: {
        $each: [body.itemId],
        $position: body.index,
      },
    },
  });
}
