import React, { useContext } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./contact-item";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>No Contacts in your fonebook, Add Contact...</h4>;
  }
  return (
    <>
      <TransitionGroup className="todo-list">
        {filtered !== null
          ? filtered.map((contact) => {
              return (
                <CSSTransition classNames="item">
                  <ContactItem contact={contact} key={contact.id} />
                </CSSTransition>
              );
            })
          : contacts.map((contact) => {
              return (
                <CSSTransition classNames="item" key={contact.id} timeout={500}>
                  <ContactItem contact={contact} key={contact.id} />
                </CSSTransition>
              );
            })}
      </TransitionGroup>
    </>
  );
};

export default Contacts;
