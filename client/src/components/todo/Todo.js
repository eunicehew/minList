import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "./Input";
import ListTodo from "./ListTodo";
import { getTodos, addTodo, deleteTodo, updateTodo } from "../../ducks/Todo";
import Grid from "@material-ui/core/Grid";

const progress = ["Pending", "In progress", "Completed"];

class Todo extends Component {
  componentDidMount() {
    console.log(localStorage.getItem("user"));
    this.props.getTodos();
  }

  updateProgress = (todo) => {
    let progressIndex = progress.indexOf(todo.progress);
    if (progressIndex !== 2) {
      let updatedTodo = {
        ...todo,
        progress: progress[progressIndex + 1],
      };
      this.props.updateTodo(updatedTodo);
    }
  };

  onMouseOver = (event) => {
    event.currentTarget.style.cursor = "grab";
  };
  onDragStart = (event, todo) => {
    event.currentTarget.style.border = "dashed";
    event.dataTransfer.setData("todo", todo);
    // event.currentTarget.style.cursor = "grabbing";
  };
  onDragOver = (event) => {
    event.preventDefault();
    event.currentTarget.style.background = "lightgray";
    // event.currentTarget.style.cursor = "grabbing";
  };

  onDragLeave = (event) => {
    event.currentTarget.style.background = "";
  };
  onDrop = (event, progressState) => {
    event.preventDefault();
    event.currentTarget.style.background = "";
    // event.currentTarget.style.cursor = "default";
    let todoId = event.dataTransfer.getData("todo");
    let todoItem = this.props.todos.find((i) => i._id === todoId);
    let progressIndex = progress.indexOf(todoItem.progress);
    let newProgressIndex = progress.indexOf(progressState);
    if (progressIndex !== newProgressIndex) {
      let updatedTodo = {
        ...todoItem,
        progress: progress[newProgressIndex],
      };
      this.props.updateTodo(updatedTodo);
    }
  };
  onDragEnd = (event) => {
    event.currentTarget.style.border = "";
    event.currentTarget.style.background = "";
    // event.currentTarget.style.cursor = "default";
  };

  render() {
    let { todos } = this.props;
    return (
      <div>
        <div style={{ padding: "10px" }}>
          <h3>Todo List</h3>
          <Input addTodo={this.props.addTodo} />
        </div>
        <Grid
          container
          spacing={1}
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
          style={{ padding: "10px" }}
        >
          {progress.map((header) => {
            return (
              <Grid item key={progress.indexOf(header)}>
                <ListTodo
                  header={header}
                  todos={todos}
                  deleteTodo={this.props.deleteTodo}
                  updateProgress={this.updateProgress}
                  onMouseOver={this.onMouseOver}
                  onDrop={this.onDrop}
                  onDragOver={this.onDragOver}
                  onDragStart={this.onDragStart}
                  onDragEnd={this.onDragEnd}
                  onDragLeave={this.onDragLeave}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.todoState);
  return {
    gettingTodos: state.todoState.gettingTodos,
    todos: state.todoState.todos,
    error: state.todoState.error,
  };
};

const mapDispatchToProps = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
