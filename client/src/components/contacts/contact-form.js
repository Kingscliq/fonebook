import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, current, updateContact, clearCurrent } = contactContext;

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({ name: "", email: "", phone: "", type: "personal" });
    }
  }, [current, contactContext]);
  const { name, email, phone, type } = contact;
  // destructure items from global state
  //   Handle State Change
  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  const clearAll = () => {
    clearCurrent();
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Call Add Contact Method
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    setContact({ name: "", email: "", phone: "", type: "personal" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{current ? "Edit Contact" : "Add Contact"}</h2>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          className="form-control"
          placeholder="Mobile Number"
          name="phone"
          value={phone}
          onChange={handleChange}
        />
      </div>
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        onChange={handleChange}
        checked={type === "personal"}
      />
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        onChange={handleChange}
        checked={type === "professional"}
      />
      Professional
      <div>
        <input
          type="submit"
          className="btn btn-primary btn-block"
          value={current ? " Update Contact" : "Add"}
        />
      </div>
      {current && (
        <div>
          {" "}
          <button className="btn btn-default btn-block" onClick={clearAll}>
            {" "}
            Clear
          </button>{" "}
        </div>
      )}
    </form>
  );
};

export default ContactForm;
