import React from "react";
import Contacts from "./contacts/contacts";
import ContactForm from "./contacts/contact-form";
import FilteredContacts from "./contacts/filter-contacts";
const Home = () => {
  return (
    <div className="grid-2 container">
      <div>
        <ContactForm />
      </div>
      <div>
        <FilteredContacts />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
