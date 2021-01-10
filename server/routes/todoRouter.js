const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");
const User = require("../models/user");

router.get("/:uid/getTodos", (req, res, next) => {
  User.findOne({ username: req.params.uid })
    .populate("todos")
    .then((data) => {
      res.json(data.todos);
    })
    .catch(next);
});

router.post("/:uid/createTodo", (req, res, next) => {
  if (req.body.action) {
    Todo.create(req.body)
      .then((todo) =>
        User.findOneAndUpdate(
          { username: req.params.uid },
          { $push: { todos: { _id: todo._id } } },
          { new: true }
        )
      )
      .then((data) => {
        // console.log(data);
        res.json(data);
      })
      .catch(next);
  } else {
    res.json({
      error: "The input field is empty",
    });
  }
});


router.put("/updateTodo/:id", (req, res, next) => {
  Todo.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then((data) => res.json(data))
    .catch(next);
});

router.delete("/:uid/deleteTodo/:id", (req, res, next) => {
  Todo.findOneAndDelete({ _id: req.params.id })
    .then((todo) => {
      User.findOneAndUpdate(
        { username: req.params.uid },
        { $pull: { todos: { _id: todo._id } } }
      );
    })
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;
