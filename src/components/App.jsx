import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import ContactCreate from './ContactCreate';
import ContactList from './ContactList';
import Section from './Section';
import Filter from './ContactList/Filter';
import Header from './Header';

import contactsJson from './contacts.json';


export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [contactsJson];
  });
  const [filter, setFilter] = useState('');

  
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]); 

  
  const addContact = newContact => {
    // console.log(newContact);
    checkContact(newContact)
        ? Notiflix.Notify.warning(`${newContact.name} is already in your phonebook `)
        : setContacts([newContact, ...contacts]);
  };

  const checkContact = newContact => {
    return contacts.some(({ name }) => 
      name.toLowerCase() === newContact.name.toLowerCase()
    );
  }  
      

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId),
    ); 
  }

  const changeFilter = evt => {
    setFilter(evt.currentTarget.value);
  }

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    )
  }
      
  const filteredContacts = getFilteredContacts();
  return (
    <>
      <Header title="Phonebook"/>
      <ContactCreate onSubmit={addContact} />
      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter} />
            
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={deleteContact}
        />
      </Section>
    </>
  );
};

