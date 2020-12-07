import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextSharpIcon from "@material-ui/icons/NavigateNextSharp";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const ListTodo = ({
  header,
  todos,
  deleteTodo,
  updateProgress,
  onMouseOver,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  onDragLeave,
}) => {
  return (
    <Card
      onDragOver={(event) => onDragOver(event)}
      onDrop={(event) => onDrop(event, header)}
      onDragLeave={(event) => onDragLeave(event)}
      style={{ width: "30vw" }}
    >
      <h4 style={{ margin: "10px 0px" }}>{header}</h4>
      <List>
        {todos && todos.length > 0 ? (
          todos
            .filter((todo) => todo.progress === header)
            .map((todo) => {
              return (
                <CardContent key={todo._id}>
                  <ListItem
                    draggable
                    onMouseOver={(event) => onMouseOver(event)}
                    onDragStart={(event) => onDragStart(event, todo._id)}
                    onDragEnd={(event) => onDragEnd(event)}
                  >
                    <ListItemText primary={todo.action} />
                    <Divider orientation="vertical" flexItem />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => deleteTodo(todo._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      {header !== "Completed" ? (
                        <IconButton
                          edge="end"
                          aria-label="next"
                          onClick={() => updateProgress(todo)}
                        >
                          <NavigateNextSharpIcon />
                        </IconButton>
                      ) : null}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </CardContent>
              );
            })
        ) : (
          <li>No todo(s) left</li>
        )}
      </List>
    </Card>
  );
};

export default ListTodo;
