import React, { useRef, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const FilteredContacts = () => {
  const contactContext = useContext(ContactContext);
  const { filterContacts, clearFilter, filtered } = contactContext;
  const text = useRef("");
  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });
  const handleChange = (e) => {
    if (text.current.value !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        type="text"
        ref={text}
        placeholder="Filter Contact..."
        onChange={handleChange}
      />
    </form>
  );
};

export default FilteredContacts;
