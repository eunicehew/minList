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

function renameCreatorField() {
  Todo.update({}, { $rename: { action: "text" } }, false, true, function (
    err,
    data
  ) {
    if (!err) {
      console.log("YAY");
    }
  });

  // Todo.update(
  //   {},
  //   { $rename: { progress: "category" } },
  //   { multi: true },
  //   function (err, data) {
  //     if (!err) {
  //       console.log("YAY");
  //       //success
  //     }
  //   }
  // )
}

renameCreatorField();

router.get("/adhocUpdateTodos", (req, res, next) => {
  //update model attribute names
  // Todo.update(
  //   {},
  //   { $rename: { action: "text" } },
  //   { multi: true }
  // ).then((data) => res.json(data));

  Todo.find({}).then((data) => {
    //   data.forEach((element) => {
    //     let temp = element;
    //     temp.category = temp.progress;
    //     temp.text = temp.action;
    //     console.log(temp);
    //     Todo.findOneAndUpdate({ _id: element.id }, temp, {
    //       upsert: true,
    //     }).then((todo) => {
    //       return todo.save();
    //     });
    //   });
    res.json(data);
  });

  // add loose todos to user "tester"
  //  Todo.find({})
  //   .then((data) => {
  //     let ids = [];
  //     data.forEach((element) => {
  //       ids.push(element._id);
  //     });
  //     // console.log(ids);
  //     res.json(ids);
  //     async function finduser(username) {
  //       const user = await User.findOneAndUpdate(username, { todos: ids });
  //       return {
  //         ...user.toJSON(),
  //       };
  //     }
  //     finduser({ username: "tester" }).then((u) => console.log(u));
  //       res.json(data);
  //    })
  //   .catch(next);
  // });
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
