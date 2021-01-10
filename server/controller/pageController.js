const Page = require("../models/page");
const User = require("../models/user");
const mongoose = require("mongoose");
const itemController = require("./itemController");

require("dotenv").config();

module.exports = {
  getPages,
  getSheets,
  createDefault,
  createPage,
  createSheet,
  getById,
  update,
  deletePage,
  deleteSheet,
  deleteList,
};

async function getPages(username) {
  return await User.findOne({ username }).populate("pages");
}

//sheets or lists
async function getSheets(pageId) {
  return await Page.findOne({ _id: pageId }).populate("sheets");
}

async function getById(id) {
  return await Page.findById(id);
}

async function createDefault(username) {
  let defaultPages = ["Todo", "Shopping List", "Recipes"];
  defaultPages.forEach((pageName) =>
    createPage({ username: username, name: pageName })
  );
}

async function createPage(body) {
  const page = new Page({ name: body.name });
  await page.save();
  createSheet({ name: "Sheet 1", pageId: page._id });
  return User.findOneAndUpdate(
    { username: body.username },
    { $push: { pages: { _id: page._id } } },
    { new: true }
  );
}

//also for list
async function createSheet(body) {
  const page = new Page({ name: body.name });
  await page.save();
  return Page.findOneAndUpdate(
    { _id: body.pageId },
    { $push: { sheets: page._id } },
    { new: true }
  );
}

async function update(id, name) {
  return await Page.findByIdAndUpdate(id, { name: name });
}

//delete related sheets/lists/items
async function deletePage(username, _id) {
  return await Page.findById(_id)
    .then((page) => {
      if (page.sheets.length > 0) {
        getSheets(_id).then((sheets) => {
          sheets.sheets.forEach((sheet) => deleteSheet(_id, sheet._id));
        });
      }
    })
    .then(() => Page.findByIdAndDelete(_id))
    .then(() => removeFromUser(username, _id));
}

async function deleteSheet(pageId, _id) {
  return await Page.findById(_id)
    .then((sheet) => {
      if (sheet.sheets.length > 0) {
        //if lists
        getSheets(_id).then((sheets) => {
          sheets.sheets.forEach((list) => deleteList(_id, list._id));
        });
      }
    })
    .then(() => Page.findByIdAndDelete(_id))
    .then(() => removeFromSheets(pageId, _id));
}

async function deleteList(sheetId, _id) {
  return await Page.findById(_id)
    .then((list) => {
      if (list.items.length > 0) {
        itemController.getItems(_id).then((items) => {
        items.items.forEach((item) => itemController.deleteItem(_id, item));
      })}
    })
    .then(() => Page.findByIdAndDelete(_id))
    .then(() => removeFromSheets(sheetId, _id));
}

async function removeFromSheets(idOne, idTwo) {
  return await Page.findByIdAndUpdate(idOne, {
    $pull: { sheets: { $in: mongoose.mongo.ObjectID(idTwo) } },
  });
}

async function removeFromUser(username, _id) {
  console.log(username);
  console.log(_id);
  return await User.findOneAndUpdate(
    { username },
    { $pull: { pages: { $in: mongoose.mongo.ObjectID(_id) } } }
  );
}
