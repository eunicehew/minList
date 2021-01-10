import axios from "axios";
import { handleResponse, authHeader } from "./ServiceHelpers";

export const userService = {
  login,
  register,
  logout,
  getById,
  update,
  delete: _delete,
};

const requestOptions = {
  headers: { ...authHeader(), "Content-Type": "application/json" },
};

function login(username, password) {
  return axios
    .post("/users/authenticate", { username, password })
    .then(handleResponse)
    .then((data) => {
      localStorage.setItem("user", data.username);
      localStorage.setItem("token", data.token);
      return data;
    });
}

function register(username, password) {
  return axios
    .post(`/users/register`, { username, password })
    .then(handleResponse);
}

function logout() {
  localStorage.clear()
}

function getById(id) {
  return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}

function update(user) {
  return fetch(`/users/${user.id}`, requestOptions).then(handleResponse);
}

function _delete(id) {
  return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}
