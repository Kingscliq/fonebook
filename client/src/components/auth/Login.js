import React, { useContext, useState, useEffect } from "react";
import loader from '../../assets/'
import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alerts/AlertContext";


const Login = (props) => {
  const authContext = useContext(AuthContext)
  const alertContext = useContext(AlertContext)

const {login, error, loading, clearErrors, success, isAuthenticated } = authContext
const {setAlert} = alertContext

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  //   handle input state change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  useEffect(() => {
    if (error) {
      setAlert(error, "alert-danger");
      clearErrors();
    }
    if (success) {
      setAlert(success, "alert-success");
    }
    if (isAuthenticated) {
      props.history.push("/");
    }
  }, [error, isAuthenticated, props.history]);

  // Handle Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    login(user)
  };
  return (
    <div className="form-container">
      <h1 className="text-primary">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
        <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loading ? (
              <img src={loader} height="50" width="50" alt="loading" />
            ) : (
              <p>Login</p>
            )}
          </div>
        </button>
      </form>
    </div>
  );
};

export default Login;
