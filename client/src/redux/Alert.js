//Actions
const SUCCESS_ALERT = "components/common/SUCCESS_ALERT";
const ERROR_ALERT = "components/common/ERROR_ALERT";
const WARNING_ALERT = "components/commmon/WARNING_ALERT";
const INFO_ALERT = "components/commmon/INFO_ALERT";
const CLEAR_ALERT = "components/common/CLEAR_ALERT";

export default function alertReducer(state = {}, action) {
  switch (action.type) {
    case SUCCESS_ALERT:
      return {
        type: "success",
        message: action.message,
      };
    case ERROR_ALERT:
      return {
        type: "error",
        message: action.message,
      };
    case WARNING_ALERT:
      return {
        type: "warning",
        message: action.message,
      };
    case INFO_ALERT:
      return {
        type: "info",
        message: action.message,
      };
    case CLEAR_ALERT:
      return {};
    default:
      return state;
  }
}

//Action Creatorss
export function successAlert(message) {
  return { type: SUCCESS_ALERT, message };
}
export function errorAlert(message) {
  return { type: ERROR_ALERT, message };
}
export function warningAlert(message) {
  return { type: WARNING_ALERT, message };
}
export function infoAlert(message) {
  return { type: INFO_ALERT, message };
}
export function clearAlert() {
  return { type: CLEAR_ALERT };
}
