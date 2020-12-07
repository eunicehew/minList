import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class Input extends Component {
  state = {
    action: "",
  };

  addTodo = (e) => {
    e.preventDefault();
    if (this.state.action.length > 0) {
      this.props.addTodo({ action: this.state.action });
      this.setState({ action: "" });
    }
  };

  handleChange = (e) => {
    this.setState({
      action: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.action}
        />
        <Button variant="outlined" size="large" onClick={this.addTodo}>
          Add Todo
        </Button>
      </div>
    );
  }
}

export default Input;
