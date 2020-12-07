import axios from "axios";
import { handleResponse, authHeader } from "./ServiceHelpers";

export const itemService = {
  getItems,
  getParentList,
  create,
  getById,
  update,
  deleteItem,
  moveItem,
};


const requestOptions = {
  headers: { ...authHeader(), "Content-Type": "application/json" },
};

function getItems(listId) {
  const requestOptions = {
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  return axios
    .get(`/items/getItems`, { params: { listId: listId } }, requestOptions)
    .then(handleResponse)
    .catch((err) => console.log(err));
}

function getParentList(itemId) {
  const requestOptions = {
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  return axios
    .get(`/items/getParentList`, { params: { itemId: itemId } }, requestOptions)
    .then(handleResponse)
    .catch((err) => console.log(err));
}

function getById(itemId) {
  const requestOptions = {
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  return axios
    .get(`/items/${itemId}`, requestOptions)
    .then(handleResponse)
    .catch((err) => console.log(err));
}

function create(body) {
  return axios
    .post(`/items/create`, body, requestOptions)
    .then(handleResponse)
    .catch((err) => console.log(err));
}

function deleteItem(body) {
  return axios
    .delete(
      `/items/deleteItem/${body.itemId}`,
      { data: { listId: body.listId } },
      requestOptions
    )
    .then(handleResponse)
    .catch((err) => console.log(err));
}

function update(body) {
  return axios
    .put(`/items/${body.id}`, body, requestOptions)
    .then(handleResponse)
    .catch((err) => console.log(err));
}

function moveItem(body) {
  return axios
    .post(`/items/moveItem`, body, requestOptions)
    .then(handleResponse)
    .catch((err) => console.log(err));
}
