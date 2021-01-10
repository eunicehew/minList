import axios from "axios";
import { handleResponse, authHeader } from "./ServiceHelpers";

export const pageService = {
  getPages,
  getSheets,
  createPage,
  createSheet,
  getById,
  update,
  deletePage,
  deleteSheet,
  deleteList,
};

const requestOptions = {
  headers: { ...authHeader(), "Content-Type": "application/json" },
};

function getPages() {
  let username = localStorage.getItem("user");
  let token = localStorage.getItem("token");

  const requestOptions = {
    headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
    params: { username: username } 
  
  }
  return axios
    .get(`/pages/getPages`, requestOptions)
    .then(handleResponse)
    .catch((err) => console.log(err));
}

function getSheets(pageId) {
  const requestOptions = {
    headers: { ...authHeader(), "Content-Type": "application/json" },
    params: { pageId: pageId }   
  };
  return axios
    .get(`/pages/getSheets`, requestOptions)
    .then(handleResponse)
    .catch((err) => console.log(err));
}

function getById(sheetId) {
  const requestOptions = {
    headers: { ...authHeader(), "Content-Type": "application/json" },
    params: { sheetId: sheetId } 
  };
  return axios
    .get(`/pages/`, requestOptions)
    .then(handleResponse)
    .catch((err) => console.log(err));
}

function createPage(body) {
  const username = localStorage.getItem("user");
  body["username"] = username;
  console.log(body);
  return axios
    .post(`/pages/createPage`, body, requestOptions)
    .then(handleResponse)
    .catch((err) => console.log(err));
}

function createSheet(body) {
  return axios
    .post(`/pages/createSheet`, body, requestOptions)
    .then(handleResponse)
    .catch((err) => console.log(err));
}

function update(body) {
  return axios
    .put(`/pages/${body.id}`, body, requestOptions)
    .then(handleResponse)
    .catch((err) => console.log(err));
}

function deletePage(body) {
  return axios
    .delete(
      `/pages/deletePage/${body.pageId}`,
      { data: { username: body.username } },
      requestOptions
    )
    .then(handleResponse)
    .catch((err) => console.log(err));
}

function deleteSheet(body) {
  return axios
    .delete(
      `/pages/deleteSheet/${body.sheetId}`,
      { data: { pageId: body.pageId } },
      requestOptions
    )
    .then(handleResponse)
    .catch((err) => console.log(err));
}

function deleteList(body) {
  return axios
    .delete(
      `/pages/deleteList/${body.listId}`,
      { data: { sheetId: body.pageId } },
      requestOptions
    )
    .then(handleResponse)
    .catch((err) => console.log(err));
}
