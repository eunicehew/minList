const express = require("express");
const router = express.Router();
const itemController = require("../controller/itemController");

// routes
router.post("/create", create);
router.get("/getItems", getItems);
router.get("/getParentList", getParentList);
router.get("/:listId", getById);
router.put("/:id", update);
router.post("/moveItem", moveItem);
router.delete("/deleteItem/:id", deleteItem);

module.exports = router;

function create(req, res, next) {
  itemController
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function getItems(req, res, next) {
  itemController
    .getItems(req.query.listId)
    .then((items) => res.json(items))
    .catch((err) => next(err));
}

function getParentList(req, res, next) {
  itemController
    .getParentList(req.query.itemId)
    .then((list) => res.json(list))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  itemController
    .getById(req.query.itemId)
    .then((sheet) => (sheet ? res.json(sheet) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function update(req, res, next) {
  itemController
    .update(req.params.id, req.body.name)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function moveItem(req, res, next) {
  itemController
    .moveItem(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function deleteItem(req, res, next) {
  itemController
    .deleteItem(req.body.listId, req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
