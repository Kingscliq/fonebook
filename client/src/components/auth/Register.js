import React, { useContext, useState } from "react";
import AlertContext from "../../context/alerts/AlertContext";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const alertContext = useContext(AlertContext);
  const { alerts, setAlert } = alertContext;

  const { name, email, password, cpassword } = user;

  //   handle input state change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "" || cpassword === "") {
      setAlert("Please Enter All fields", "alert-danger");
    } else if (password !== cpassword) {
      setAlert("Passwords don't Match!", "alert-danger");
    } else {
      console.log("user Registered");
    }
  };
  return (
    <div className="form-container">
      <h1 className="text-primary">Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            value={cpassword}
            name="cpassword"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
