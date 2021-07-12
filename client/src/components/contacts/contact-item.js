import React from "react";
import { FaEnvelopeOpen, FaMobile } from "react-icons/fa";
import ContactContext from "../../context/contact/contactContext";

const ContactItem = ({ contact }) => {
  const contactContext = React.useContext(ContactContext);
  const { deleteContact, setCurrent } = contactContext;
  const { id, name, email, phone, type } = contact;
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}
        <span
          style={{ float: "right" }}
          className={`badge ${
            type === "professional" ? "badge-success" : "badge-danger"
          } `}
        >
          {`${type.charAt(0).toUpperCase()}${type.slice(1)}`}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <FaEnvelopeOpen /> {email}
          </li>
        )}
        {phone && (
          <li>
            <FaMobile /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button className="btn btn-dark" onClick={() => setCurrent(contact)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => deleteContact(id)}>
          Delete
        </button>
      </p>
    </div>
  );
};

export default ContactItem;
