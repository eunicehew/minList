import {errorAlert} from "../redux/Alert"

export function authHeader() {
  // return authorization header with jwt token
  let user = localStorage.getItem("user");
  let token = localStorage.getItem("token");

  if (user && token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}

export function handleResponse(response) {
  if (response.status !== 200) {
    if (response.status === 401) {
      localStorage.clear()
    }
    errorAlert("Bad response: " + response.status )
  }
  return response.data;
}