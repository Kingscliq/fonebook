import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "./types";

const AuthState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: null,
    error: null,
    user: null,
  };
  // Initialise State and Reducer
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // load User

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "https://ezo-contact-api.herokuapp.com/api/users"
      );
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: REGISTER_FAILED, payload: error.response.msg });
    }
  };
  // Login User

  // Logout
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        user: state.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
