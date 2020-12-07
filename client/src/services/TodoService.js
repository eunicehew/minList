import axios from "axios";
import { handleResponse, authHeader } from "./ServiceHelpers";

export const todoService = {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
};

const requestOptions = {
  headers: { ...authHeader(), "Content-Type": "application/json" },
};

function getTodos() {
  const requestOptions = {
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  const username = localStorage.getItem("user");
  return axios
    .get(`/todos/${username}/getTodos`, requestOptions)
    .then(handleResponse)
    .catch((err) => console.log(err));
}

function addTodo(todo) {
  const username = localStorage.getItem("user");
  return axios
    .post(`/todos/${username}/createTodo`, todo, requestOptions)
    .then(handleResponse)
    .catch((err) => console.log(err));
}

function deleteTodo(id) {
  const username = localStorage.getItem("user");
  return axios
    .delete(`/todos/${username}/deleteTodo/${id}`, requestOptions)
    .then(handleResponse)
    .catch((err) => console.log(err));
}

function updateTodo(body) {
  return axios
    .put(`/todos/updateTodo/${body._id}`, body, requestOptions)
    .then(handleResponse)
    .catch((err) => console.log(err));
}
