import { FaAddressBook } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const NavBar = () => {
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
      </ul>
    </div>
  );
};

export default NavBar;
