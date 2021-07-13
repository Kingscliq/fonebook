import { FaAddressBook } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";
import { useContext } from "react";

const NavBar = () => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated } = authContext;
  return (
    <div className="navbar bg-primary">
      <h1 className="d-flex">
        <FaAddressBook />
        FoneBook{" "}
      </h1>
      <ul>
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        {!isAuthenticated ? (
          <>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/logout">Logout</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
