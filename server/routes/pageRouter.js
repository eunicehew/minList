const express = require("express");
const router = express.Router();
const pageController = require("../controller/pageController");

// routes
router.post("/createPage", createPage);
router.post("/createSheet", createSheet);
router.get("/getPages", getPages);
router.get("/getSheets", getSheets);
router.get("/", getById);
router.put("/:id", update);
router.delete("/deletesheet/:id", deleteSheet);
router.delete("/deletePage/:id", deletePage);
router.delete("/deleteList/:id", deleteList);

module.exports = router;

function getPages(req, res, next) {
  pageController
    .getPages(req.query.username)
    .then((pages) => res.json(pages.pages))
    .catch((err) => next(err));
}

function getSheets(req, res, next) {
  pageController
    .getSheets(req.query.pageId)
    .then((sheets) => res.json(sheets.sheets))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  pageController
    .getById(req.query.sheetId)
    .then((sheet) => (sheet ? res.json(sheet) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function createPage(req, res, next) {
  pageController
    .createPage(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

//also for list
function createSheet(req, res, next) {
  pageController
    .createSheet(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function update(req, res, next) {
  pageController
    .update(req.params.id, req.body.name)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function deletePage(req, res, next) {
  pageController
    .deletePage(req.body.username, req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function deleteSheet(req, res, next) {
  pageController
    .deleteSheet(req.body.pageId, req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function deleteList(req, res, next) {
  pageController
    .deleteList(req.body.sheetId, req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
