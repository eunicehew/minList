//Actions
const TOGGLE_THEME = "components/TOGGLE_THEME";
const TOGGLE_MENU = "components/TOGGLE_MENU";
const CLEAR_UI = "components/CLEAR_UI";

const initialState = { theme: 'light', menuOpen: false };

//Reducer
export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_THEME:
      return Object.assign({}, state, {
        theme: action.theme,
      });
    case TOGGLE_MENU:
      return Object.assign({}, state, {
        menuOpen: !state.menuOpen,
      });
    case CLEAR_UI:
      return Object.assign({}, state, {
        menuOpen: false,
      });
    default:
      return state;
  }
}

//Action Creators
export function toggleMenu() {
  return (dispatch) => {
    dispatch({ type: TOGGLE_MENU });
  };
}

export function toggleTheme(theme) {
  return (dispatch) => {
    dispatch({ type: TOGGLE_THEME, theme });
  };
}
