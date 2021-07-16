import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  SET_LOADING,
} from "./types";

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:

      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        token: localStorage.getItem("token"),
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        // token: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
        success: "Registration SuccessFul",
      };
    case REGISTER_FAILED:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        token: null,
        error: action.payload,
        msg: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
  }
};
