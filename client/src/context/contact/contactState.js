import React, { useReducer } from "react";

import { v4 as uuid } from "uuid";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER,
} from "./types";

import ContactContext from "./contactContext";

import ContactReducer from "./contactReducer";

const ContactState = ({ children }) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Ajaezo Kingsley",
        email: "ajaezokingsley@gmail.com",
        type: "personal",
        phone: "08107354066",
      },
      {
        id: 2,
        name: "Ezenwa Kingsley",
        email: "kingsley@gmail.com",
        type: "professional",
        phone: "070367537778",
      },
      {
        id: 3,
        name: "Ajaezo Paul",
        email: "ezokingsley@gmail.com",
        type: "personal",
        phone: "07066881662",
      },
    ],
    current: null,
    filtered: null,
  };
  // Initialise State and Reducer
  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Add Contact
  const addContact = (contact) => {
    contact.id = uuid();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // Delete Contact
  const deleteContact = (id) => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id,
    });
  };

  // Set Current state on the form fields
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  //  Clear Current State on the form Fields
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update Contact
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  //Filter Contacts
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACT, payload: text });
  };
  //  Clear Filtered Contact State
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactState;
