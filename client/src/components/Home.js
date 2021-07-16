import React, { useContext, useEffect } from "react";
import Contacts from "./contacts/contacts";
import ContactForm from "./contacts/contact-form";
import FilteredContacts from "./contacts/filter-contacts";
import AuthContext from "../context/auth/AuthContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(async () => {
    await authContext.loadUser();
    console.log(localStorage.token)
    // eslint-disabled-next-line
  }, []);
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
