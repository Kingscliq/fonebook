import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
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
  CLEAR_SUCCESS,
} from "./types";

const AuthState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: null,
    error: null,
    user: null,
    success: null,
  };
  // Initialise State and Reducer
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/auth");
      console.log(res.data);
      dispatch({ USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({ type: SET_LOADING });
    try {
      const res = await axios.post("/users", formData, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    } catch (error) {
      console.log(error.response.data.msg);
      if (error.response === undefined) {
        return dispatch({
          type: REGISTER_FAILED,
          payload: "There is an error in your Network Connection!",
        });
      }
      dispatch({
        type: REGISTER_FAILED,
        payload: error.response.data.msg,
      });
    }

    loadUser();
  };
  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({ type: SET_LOADING });
    try {
      const res = await axios.post("/auth", formData, config);
      dispatch({type:LOGIN_SUCCESS, payload: res.data })
    } catch (err) {
      if (err.response === undefined) {
        return dispatch({
          type: LOGIN_FAIL,
          payload: "There is an error in your Network Connection!",
        });
      }
      if (err.response.status == 401){
        dispatch({type: LOGIN_FAIL, payload: "Unauthorized No access Token"})
      }
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }

    loadUser()
  };
  // Logout

  // Clear Errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        user: state.user,
        success: state.success,
        clearErrors,
        register,
        loadUser,
        login
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
